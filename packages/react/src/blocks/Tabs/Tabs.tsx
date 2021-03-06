import uniqueId from 'lodash/uniqueId'
import { ReactElement, useState } from 'react'

import { mergeClasses as cx, makeStyles } from '@fluentui/react-components'
// todo: fix this import when it stabilizes
import { Tab, TabList } from '@fluentui/react-components/unstable'
import {
  TabsItemProps as NaturalTabsItemProps,
  TabsProps as NaturalTabsProps,
} from '@teamsui/schemas'

import { ButtonProps } from '../../inputs'
import {
  EscapeElement,
  Sequence,
  invalidTabPanelItem,
  rem,
  renderIfEscape,
  sx,
} from '../../lib'
import {
  DescriptionListPropsOrElement,
  renderIfDescriptionList,
} from '../DescriptionList/DescriptionList'
import { FigurePropsOrElement, renderIfFigure } from '../Figure/Figure'
import { HeadingPropsOrElement, renderIfHeading } from '../Heading/Heading'
import {
  ParagraphPropsOrElement,
  renderIfParagraph,
} from '../Paragraph/Paragraph'
import {
  ShortInputsPropsOrElement,
  renderIfShortInputs,
} from '../ShortInputs/ShortInputs'
import { TablePropsOrElement, renderIfTable } from '../Table/Table'

export interface TabProps
  extends Omit<
    ButtonProps,
    | 'type'
    | 'actionId'
    | 'variant'
    | 'iconVariant'
    | 'onAction'
    | 'contextualVariant'
  > {}

export type TabPanelItemEntity =
  | HeadingPropsOrElement
  | ParagraphPropsOrElement
  | FigurePropsOrElement
  | ShortInputsPropsOrElement
  | DescriptionListPropsOrElement
  | TablePropsOrElement
  | EscapeElement

export type TabPanelItemSequence = TabPanelItemEntity[]

const TabPanelItem = (o: TabPanelItemEntity) =>
  renderIfHeading(o) ||
  renderIfParagraph(o) ||
  renderIfFigure(o) ||
  renderIfShortInputs(o) ||
  renderIfDescriptionList(o) ||
  renderIfTable(o) ||
  renderIfEscape(o) ||
  invalidTabPanelItem(o)

export interface TabsItemProps
  extends Omit<NaturalTabsItemProps, 'tab' | 'panel'> {
  tab: TabProps
  panel: TabPanelItemSequence
}

export interface TabsProps extends Omit<NaturalTabsProps, 'tabs'> {
  tabs: TabsItemProps[]
  contextualVariant?: 'card' | 'block'
}

const useTabsStyles = makeStyles({
  tabScrollCtx: {
    overflowX: 'hidden',
    overflowY: 'hidden',
  },
  tabListCardContext: {},
  tabListCenter: {
    justifyContent: 'center',
  },
  tabList: {
    marginBlockEnd: rem(8),
  },
  tabs: {
    flexGrow: 1,
  },
  tab: {
    flexShrink: 1,
  },
})

function tabId(itemId: string) {
  return `${itemId}__tab`
}
function panelId(itemId: string) {
  return `${itemId}__panel`
}

export const Tabs = ({
  tabs,
  label,
  tabVariant = 'transparent',
  contextualVariant = 'block',
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0)
  const itemIds = tabs.map(() => uniqueId('tabItem'))
  const tabsStyles = useTabsStyles()
  return (
    <div aria-label={label} className={tabsStyles.tabs}>
      <TabList
        appearance={tabVariant}
        selectedValue={itemIds[activeTab]}
        size="small"
        onTabSelect={(_e, { value }) => {
          setActiveTab(itemIds.indexOf(value as string))
        }}
        className={cx(
          tabsStyles.tabList,
          contextualVariant === 'card' && tabsStyles.tabListCardContext
        )}
      >
        {tabs.map((tabItem, t) => (
          <Tab
            key={itemIds[t]}
            value={itemIds[t]}
            id={tabId(itemIds[t])}
            className={tabsStyles.tab}
          >
            {tabItem.tab.label}
          </Tab>
        ))}
      </TabList>
      {tabs.map((tabItem, t) => (
        <div
          key={itemIds[t]}
          id={panelId(itemIds[t])}
          tabIndex={activeTab !== t ? -1 : 0}
          role="tabpanel"
          aria-labelledby={tabId(itemIds[t])}
          {...(activeTab !== t && { hidden: true })}
        >
          {Sequence<TabPanelItemEntity>(tabItem.panel, TabPanelItem, {
            contextualVariant: 'tabPanel',
          })}
        </div>
      ))}
    </div>
  )
}

export type TabsElement = ReactElement<TabsProps, typeof Tabs>
export type TabsPropsOrElement = TabsProps | TabsElement

function isTabsProps(o: any): o is TabsProps {
  return 'tabs' in o
}

function isTabsElement(o: any): o is TabsElement {
  return o?.type === Tabs
}

export function renderIfTabs(o: any) {
  return isTabsProps(o) ? <Tabs {...o} /> : isTabsElement(o) ? o : null
}
