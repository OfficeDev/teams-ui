import { ButtonActionPayload } from '../../inputs'
import {
  AccentScheme,
  TeamsUiProvider,
  ThemeName,
  WithActionHandler,
} from '../../lib'
import { Main } from '../../surfaces'
import { BigMessageProps } from './BigMessage'

export const BigMessage = ({
  themeName,
  accentScheme,
  onAction,
  iconSpriteUrl,
  ...props
}: BigMessageProps['message'] & {
  themeName: ThemeName
  accentScheme: AccentScheme
  iconSpriteUrl: string
} & WithActionHandler<ButtonActionPayload>) => (
  <TeamsUiProvider {...{ themeName, accentScheme, onAction, iconSpriteUrl }}>
    <Main
      blocks={[
        { message: { ...props, variant: 'big', viewportHeight: false } },
      ]}
      title={[{ text: ' ' }]}
    />
  </TeamsUiProvider>
)
