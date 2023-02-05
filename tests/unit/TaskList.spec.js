import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import TasksList from '@/components/TasksList.vue'
import replaceAllInserter from 'string.prototype.replaceall';

replaceAllInserter.shim();

const localVue = createLocalVue()

localVue.use(Vuex)

const formatDateMock = jest.fn()
const handleClickOnFilterMock = jest.fn()
const emitTaskEditMock = jest.fn()
const deleteTaskMock = jest.fn()
const toggleChangeMock = jest.fn()
describe('TasksList.vue', () => {
  let getters
  let store

  beforeEach(() => {
    getters = {
      getAll: () => [1,2,3],
      doneAll: () => [1, 2, 3],
      undoneAll: () => [1, 2, 3]
    }
    store = new Vuex.Store({
        getters
    })
  })
  it('Snapshot test', () => {
    const wrapper = shallowMount(TasksList, { store, localVue })
    wrapper.setMethods({formatDate: formatDateMock})
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('When click on  All, must call handleClickOnFilter function', () => {
    const wrapper = shallowMount(TasksList, { store, localVue })
    wrapper.setMethods({handleClickOnFilter: handleClickOnFilterMock})
    wrapper.setMethods({formatDate: formatDateMock})
    wrapper.find('v-tab').trigger('click')
    expect(handleClickOnFilterMock).toHaveBeenCalled()
  })
  it('When click on  Done Tasks, must call handleClickOnFilter function', () => {
    const wrapper = shallowMount(TasksList, { store, localVue })
    wrapper.setMethods({handleClickOnFilter: handleClickOnFilterMock})
    wrapper.setMethods({formatDate: formatDateMock})
    wrapper.findAll('v-tab').at(1).trigger('click')
    expect(handleClickOnFilterMock).toHaveBeenCalled()
  })
  it('When click on  Undone Tasks, must call handleClickOnFilter function', () => {
    const wrapper = shallowMount(TasksList, { store, localVue })
    wrapper.setMethods({handleClickOnFilter: handleClickOnFilterMock})
    wrapper.setMethods({formatDate: formatDateMock})
    wrapper.findAll('v-tab').at(2).trigger('click')

    expect(handleClickOnFilterMock).toHaveBeenCalled()
  })
  it('When click on editButton, must call emitTaskEdit function', () => {
    const wrapper = shallowMount(TasksList, { store, localVue })
    wrapper.setMethods({emitTaskEdit: emitTaskEditMock})
    wrapper.setMethods({formatDate: formatDateMock})
    wrapper.findAll('v-btn').at(1).trigger('click')
    expect(emitTaskEditMock).toHaveBeenCalled()
  })
  it('When click on deleteButton, must call deleteTask function', () => {
    const wrapper = shallowMount(TasksList, { store, localVue })
    wrapper.setMethods({deleteTask: deleteTaskMock})
    wrapper.setMethods({formatDate: formatDateMock})
    wrapper.findAll('v-btn').at(2).trigger('click')
    expect(deleteTaskMock).toHaveBeenCalled()
  })
  it('When click on deleteButton, must call deleteTask function', () => {
    const wrapper = shallowMount(TasksList, { store, localVue })
    wrapper.setMethods({deleteTask: deleteTaskMock})
    wrapper.setMethods({formatDate: formatDateMock})
    wrapper.findAll('v-btn').at(1).trigger('click')
    expect(deleteTaskMock).toHaveBeenCalled()
  })
  it('When click on checkbox, must call toggleChange function', () => {
    const wrapper = shallowMount(TasksList, { store, localVue })
    wrapper.setMethods({toggleChange: toggleChangeMock})
    wrapper.setMethods({formatDate: formatDateMock})
    wrapper.find('v-btn').trigger('click')
    expect(toggleChangeMock).toHaveBeenCalled()
  })
})
