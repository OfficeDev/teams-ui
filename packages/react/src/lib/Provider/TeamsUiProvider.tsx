import { PropsWithChildren } from 'react'

import { FluentProvider } from '@fluentui/react-components'

import { getTheme } from '../theme'
import {
  FluentPatternsBlocksData,
  TeamsUiContext,
  defaultContext,
} from './TeamsUiContext'

export const TeamsUiProvider = ({
  children,
  ...props
}: PropsWithChildren<Partial<Omit<FluentPatternsBlocksData, 'theme'>>>) => {
  const theme = getTheme(props.themeName, props.accentScheme)
  const context: FluentPatternsBlocksData = {
    ...defaultContext,
    ...props,
    theme,
  }
  return (
    <FluentProvider
      {...{
        theme,
        targetDocument: typeof document === 'undefined' ? void 0 : document,
        dir: context.translations.dir,
      }}
    >
      <TeamsUiContext.Provider value={context}>
        {children}
      </TeamsUiContext.Provider>
    </FluentProvider>
  )
}
