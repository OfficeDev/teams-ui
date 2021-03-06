import { ReactElement } from 'react'

import { mergeClasses as cx, makeStyles } from '@fluentui/react-components'
import {
  DescriptionListItemProps,
  DescriptionListProps as NaturalDescriptionListProps,
} from '@teamsui/schemas'

import { InlineContent, InlineSequenceOrString } from '../../inlines'
import { key, sx, useCommonStyles, useTextBlockStyles } from '../../lib'

export interface DescriptionListProps
  extends Omit<NaturalDescriptionListProps, 'descriptionList'> {
  descriptionList: (DescriptionListItemProps & {
    title: InlineSequenceOrString
    description: InlineSequenceOrString
  })[]
}

const useDescriptionListStyles = makeStyles({
  listItem: {
    display: 'flex',
    ...sx.flexFlow('column', 'nowrap'),
    marginBlockEnd: '1.5rem',
    '&:last-child': { marginBlockEnd: 0 },
  },
  itemTitle: {
    order: 1,
    fontSize: '.75rem',
    lineHeight: 4 / 3,
  },
  itemDescription: {
    order: 0,
    fontSize: '1.5rem',
    lineHeight: 4 / 3,
    marginLeft: 0,
  },
})

export const DescriptionList = ({ descriptionList }: DescriptionListProps) => {
  const commonStyles = useCommonStyles()
  const textBlockStyles = useTextBlockStyles()
  const descriptionListStyles = useDescriptionListStyles()
  return (
    <dl
      className={cx(
        commonStyles.mainContentWidth,
        commonStyles.centerBlock,
        textBlockStyles.root
      )}
    >
      {descriptionList.map((item) => (
        <div key={key(item)} className={descriptionListStyles.listItem}>
          <dt className={descriptionListStyles.itemTitle}>
            <InlineContent inlines={item.title} />
          </dt>
          <dd className={descriptionListStyles.itemDescription}>
            <InlineContent inlines={item.description} />
          </dd>
        </div>
      ))}
    </dl>
  )
}

export type DescriptionListElement = ReactElement<
  DescriptionListProps,
  typeof DescriptionList
>
export type DescriptionListPropsOrElement =
  | DescriptionListProps
  | DescriptionListElement

function isDescriptionListProps(o: any): o is DescriptionListProps {
  return 'descriptionList' in o
}

function isDescriptionListElement(o: any): o is DescriptionListElement {
  return o?.type === DescriptionList
}

export function renderIfDescriptionList(o: any) {
  return isDescriptionListProps(o) ? (
    <DescriptionList {...o} />
  ) : isDescriptionListElement(o) ? (
    o
  ) : null
}
