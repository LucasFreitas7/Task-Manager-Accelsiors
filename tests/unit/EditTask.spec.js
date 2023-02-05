import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import EditTask from '@/components/EditTask.vue'
const localVue = createLocalVue()

localVue.use(Vuex)

const editTaskMock = jest.fn()
describe('EditTask.vue', () => {
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
    const wrapper = shallowMount(EditTask, { store, localVue })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('When click on  Task Update, must call taskEdit function', () => {
    const wrapper = shallowMount(EditTask, { store, localVue })
    wrapper.setMethods({taskEdit: editTaskMock})
    wrapper.findAll('v-btn').at(2).trigger('click')
    expect(editTaskMock).toHaveBeenCalled()
  })
})