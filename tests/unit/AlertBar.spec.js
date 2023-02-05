import { shallowMount } from '@vue/test-utils'
import Alertbar from '@/components/Alertbar.vue'
import EditTask from '@/components/EditTask.vue'
describe('Alertbar.vue', () => {

  it('Snapshot test', () => {
    const wrapper = shallowMount(Alertbar)
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('when pass props Id, she must be passed to the componnent editTask', () => {
    const wrapper = shallowMount(Alertbar, {
      propsData: { id: 1 }
    })
    const edit = wrapper.findComponent(EditTask) // => finds Bar by component instance
    expect(edit.props().taskId).toBe(1)
  })
})
