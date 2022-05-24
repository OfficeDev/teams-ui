import { TableActionPayload } from '@teamsui/schemas'

import {
  AccentScheme,
  ActionHandler,
  ThemeName,
  WithActionHandler,
} from '../../lib'
import { View } from '../../views'
import { ListProps } from './List'

export const List = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  onAction,
  ...props
}: ListProps['list'] & {
  themeName: ThemeName
  accentScheme: AccentScheme
  iconSpriteUrl: string
  onAction: ActionHandler<TableActionPayload>
} & WithActionHandler<TableActionPayload>) => (
  <View
    {...{ themeName, accentScheme, iconSpriteUrl, onAction }}
    main={{ title: ' ', blocks: [{ list: props }] }}
  />
)
