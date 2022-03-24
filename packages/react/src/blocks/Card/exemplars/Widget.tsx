import { ReactElement } from 'react'
import {
  HeadingLevel,
  WidgetProps as NaturalWidgetProps,
} from '@fluent-blocks/schemas'

import { InlineSequenceOrString } from '../../../inlines'
import { ButtonProps } from '../../../inputs'

import { Card } from '../Card'
import { CardProps } from '../card-properties'

export interface WidgetProps extends Omit<NaturalWidgetProps, 'widget'> {
  widget: Omit<
    NaturalWidgetProps['widget'],
    'title' | 'abstract' | 'footerAction'
  > & {
    title?: InlineSequenceOrString
    abstract?: InlineSequenceOrString
    footerAction?: Omit<ButtonProps, 'type' | 'variant' | 'iconOnly'>
  }
  contextualVariant?: CardProps['contextualVariant']
}

const widgetFooterActionProps = {
  type: 'action' as 'action',
  variant: 'transparent' as 'transparent',
}

export const widgetCard = ({
  widget: { title, abstract, label, tabs, footerAction },
  contextualVariant,
}: WidgetProps): CardProps => ({
  card: [
    ...(title ? [{ paragraph: title, level: 3 as HeadingLevel }] : []),
    ...(abstract ? [{ paragraph: abstract }] : []),
    ...(tabs ? (tabs.length > 1 ? [{ tabs, label }] : tabs[0].panel) : []),
    ...(footerAction
      ? [{ inputs: [{ ...footerAction, ...widgetFooterActionProps }] }]
      : []),
  ],
  contextualVariant,
})

export const Widget = (props: WidgetProps) => <Card {...widgetCard(props)} />

export type WidgetElement = ReactElement<WidgetProps, typeof Widget>
export type WidgetPropsOrElement = WidgetProps | WidgetElement

function isWidgetProps(o: any): o is WidgetProps {
  return 'widget' in o
}

function isWidgetElement(o: any): o is WidgetElement {
  return o?.type === Widget
}

export function renderIfWidget(o: any) {
  return isWidgetProps(o) ? <Widget {...o} /> : isWidgetElement(o) ? o : null
}