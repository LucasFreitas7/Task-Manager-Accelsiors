import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import NewTask from '@/components/NewTask.vue'
const localVue = createLocalVue()

localVue.use(Vuex)

const newTaskMock = jest.fn()
describe('NewTask.vue', () => {
  let getters
  let store

  beforeEach(() => {
    getters = {
      getAll: () => [1,2,3]
    }
    store = new Vuex.Store({
        getters
    })
  })
  it('Snapshot test', () => {
    const wrapper = shallowMount(NewTask, { store, localVue })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('When click on  newTask, must call NewTask function', () => {
    const wrapper = shallowMount(NewTask, { store, localVue })
    wrapper.setMethods({newTask: newTaskMock})
    wrapper.findAll('v-btn').at(2).trigger('click')
    expect(newTaskMock).toHaveBeenCalled()
  })
})