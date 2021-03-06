import { Icon, IconProps } from './Icon'
import { Parameters } from '@storybook/addons'

export default {
  title: 'Tests/Icon',
  component: Icon,
}

const IconTemplate = (props: IconProps) => <Icon {...props} />

export const IconTest: typeof IconTemplate & {
  args?: IconProps
  parameters?: Parameters
} = IconTemplate.bind({})

IconTest.args = {
  icon: '0aa2159c-9d11-4709-b7a9-ae477bd462dc',
  size: '48', // todo: why does this become `undefined` if it is a number?
  variant: 'filled',
}
IconTest.parameters = { chromatic: { disableSnapshot: true } }
