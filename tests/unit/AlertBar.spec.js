import { shallowMount } from '@vue/test-utils'
import AlertBar from '@/components/AlertBar.vue'
import EditTask from '@/components/EditTask.vue'
describe('AlertBar.vue', () => {

  it('Snapshot test', () => {
    const wrapper = shallowMount(AlertBar)
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('when pass props Id, she must be passed to the componnent editTask', () => {
    const wrapper = shallowMount(AlertBar, {
      propsData: { id: 1 }
    })
    const edit = wrapper.findComponent(EditTask) // => finds Bar by component instance
    expect(edit.props().taskId).toBe(1)
  })
})
