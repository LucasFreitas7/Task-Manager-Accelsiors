import { shallowMount } from '@vue/test-utils'
import TaskManager from '@/components/TaskManager.vue'
import NewTask  from '@/components/NewTask.vue'
import TaskList from '@/components/TasksList.vue'
import AlertBar from '@/components/AlertBar.vue'
describe('TaskManager.vue', () => {

  it('Snapshot test', () => {
    const wrapper = shallowMount(TaskManager)
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('Component NewTask must be exist', () => {
    const wrapper = shallowMount(TaskManager)
    const newTask = wrapper.findComponent(NewTask)
    expect(newTask.exists()).toBe(true)
  })
  it('Component TaskList must be exist', () => {
    const wrapper = shallowMount(TaskManager)
    const taskList = wrapper.findComponent(TaskList)
    expect(taskList.exists()).toBe(true)
  })
  it('Component AlertBar must be exist', () => {
    const wrapper = shallowMount(TaskManager)
    const alertBar = wrapper.findComponent(AlertBar)
    expect(alertBar.exists()).toBe(true)
  })
})
