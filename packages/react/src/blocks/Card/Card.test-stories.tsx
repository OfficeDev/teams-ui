import { Parameters } from '@storybook/addons'

import { Escape } from '../../lib'
import { CardProps } from '../../props'
import { Paragraph } from '../Paragraph/Paragraph'
import { Card } from './Card'

export default {
  title: 'Tests/Card',
  component: Card,
}

const CardTemplate = (props: CardProps) => <Card {...props} />

export const CardJsonTest: typeof CardTemplate & {
  args?: CardProps
  parameters?: Parameters
} = CardTemplate.bind({})

CardJsonTest.args = {
  card: {
    title: '',
    body: [{ paragraph: 'eafa9885-7c39-4255-8289-06cb0f5f509f' }],
  },
}
CardJsonTest.parameters = { chromatic: { disableSnapshot: true } }

export const CardJsxTest: typeof CardTemplate & {
  args?: CardProps
  parameters?: Parameters
} = CardTemplate.bind({})

CardJsxTest.args = {
  card: {
    title: '',
    body: [
      <Paragraph key="t1" paragraph="7dc865ac-d474-408f-a522-9189ce1ccbe5" />,
    ],
  },
}
CardJsxTest.parameters = { chromatic: { disableSnapshot: true } }

export const CardEscapeTest: typeof CardTemplate & {
  args?: CardProps
  parameters?: Parameters
} = CardTemplate.bind({})

CardEscapeTest.args = {
  card: {
    title: '',
    body: [
      <Escape key="t1" contentMeetsAccessibilityAndDesignStandards>
        <span>dea8bcd5-e9d0-488e-9974-eae698606b93</span>
      </Escape>,
    ],
  },
}
CardEscapeTest.parameters = { chromatic: { disableSnapshot: true } }
