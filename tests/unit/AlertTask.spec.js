import { shallowMount } from '@vue/test-utils'
import AlertTask from '@/components/AlertTask.vue'
describe('AlertTask.vue', () => {

  it('Snapshot test', () => {
    const wrapper = shallowMount(AlertTask)
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('when pass props message, she must be renderized', () => {
    const wrapper = shallowMount(AlertTask, {
      propsData: { message: 'test' }
    })
    expect(wrapper.find('v-alert').text()).toBe('test')
  })
})
