import { ReactElement } from 'react'
import { mergeClasses as cx } from '@fluentui/react-components'
import { ParagraphProps as NaturalParagraphProps } from '@fluent-blocks/schemas'

import { InlineContent, InlineSequenceOrString } from '../../inlines'
import { useCommonStyles, useTextBlockStyles } from '../../lib'

export interface ParagraphProps
  extends Omit<NaturalParagraphProps, 'paragraph'> {
  paragraph: InlineSequenceOrString
  contextualVariant?: 'card' | 'block'
}

export const Paragraph = (props: ParagraphProps) => {
  const { paragraph, contextualVariant = 'block' } = props
  const textStyles = useTextBlockStyles()
  const commonStyles = useCommonStyles()
  return (
    <p
      className={cx(
        textStyles.root,
        commonStyles.centerBlock,
        commonStyles.mainContentWidth,
        contextualVariant === 'card' && textStyles.cardSpacing
      )}
    >
      <InlineContent inlines={paragraph} />
    </p>
  )
}

export type ParagraphElement = ReactElement<ParagraphProps, typeof Paragraph>
export type ParagraphPropsOrElement = ParagraphProps | ParagraphElement

function isParagraphProps(o: any): o is ParagraphProps {
  return 'paragraph' in o
}

function isParagraphElement(o: any): o is ParagraphElement {
  return o?.type === Paragraph
}

export function renderIfParagraph(o: any) {
  return isParagraphProps(o) ? (
    <Paragraph {...o} />
  ) : isParagraphElement(o) ? (
    o
  ) : null
}