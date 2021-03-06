import { createElement } from 'react'

import { HeadingLevel } from '@teamsui/schemas'

import { InlineSequenceOrString } from '../../inlines'
import { Sequence, key } from '../../lib'
import { BigMessage, BigMessageProps } from '../BigMessage/BigMessage'
import { Block, BlockEntity, BlockSequence } from '../Block/Block'
import { Heading } from '../Heading/Heading'
import { Paragraph } from '../Paragraph/Paragraph'

interface ShallowSectionContentProps {
  title: InlineSequenceOrString
  abstract?: InlineSequenceOrString
  message?: Omit<BigMessageProps['message'], 'title' | 'variant' | 'abstract'>
  blocks?: BlockSequence
}

// ππ’π₯π¬π©π‘ π±π₯π¦π° π°π²ππ©π¦πͺπ’ π­πΆπ―ππͺπ¦π‘
export interface SectionContentProps extends ShallowSectionContentProps {
  sections?: (ShallowSectionContentProps & {
    sections?: (ShallowSectionContentProps & {
      sections?: (ShallowSectionContentProps & {
        sections?: (ShallowSectionContentProps & {
          sections?: ShallowSectionContentProps[]
        })[]
      })[]
    })[]
  })[]
}

export interface SectionContextualProps {
  className?: string
  level?: HeadingLevel
  as?: string
}

export interface SectionProps
  extends SectionContentProps,
    SectionContextualProps {}

export const Section = (props: SectionProps) => {
  const {
    title,
    abstract,
    sections,
    blocks,
    className,
    message,
    as = 'section',
    level = 2,
  } = props
  return createElement(
    as,
    { className },
    <>
      {(message && (
        <BigMessage
          {...{
            message: {
              ...message,
              variant: 'big',
              title,
              abstract,
              viewportHeight: false,
            },
            level,
          }}
        />
      )) || (
        <>
          <Heading paragraph={title} level={level} />
          {abstract && <Paragraph paragraph={abstract} />}
        </>
      )}
      {Sequence<BlockEntity>(blocks, Block)}
      {(sections || []).map((section, _s) => (
        <Section
          {...section}
          key={key(section)}
          level={(level + 1) as HeadingLevel}
        />
      ))}
    </>
  )
}
