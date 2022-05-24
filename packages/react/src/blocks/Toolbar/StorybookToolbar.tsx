import set from 'lodash/set'

import {
  AccentScheme,
  ActionHandler,
  MenuAction,
  TeamsUiProvider,
  ThemeName,
} from '../../lib'
import { Main } from '../../surfaces'
import { ToolbarProps } from './Toolbar'

export const Toolbar = ({
  themeName,
  accentScheme,
  onAction,
  buttonSize,
  iconSpriteUrl,
  ...props
}: {
  toolbar: Omit<ToolbarProps['toolbar'], 'buttonSize'>
  themeName: ThemeName
  accentScheme: AccentScheme
  onAction: ActionHandler<MenuAction>
  buttonSize: 'small' | 'medium' | 'large'
  iconSpriteUrl: string
}) => (
  <TeamsUiProvider {...{ themeName, accentScheme, onAction, iconSpriteUrl }}>
    <Main
      title={[{ text: ' ' }]}
      blocks={[{ ...set(props, 'toolbar.buttonSize', buttonSize) }]}
    />
  </TeamsUiProvider>
)
