import { AccentScheme, TeamsUiProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'
import { IllustrationProps } from './Illustration'

export const Illustration = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  ...props
}: IllustrationProps & {
  themeName: ThemeName
  accentScheme: AccentScheme
  iconSpriteUrl: string
}) => (
  <TeamsUiProvider {...{ themeName, accentScheme, iconSpriteUrl }}>
    <Main
      blocks={[{ media: props, variant: 'narrow' }]}
      title={[{ text: ' ' }]}
    />
  </TeamsUiProvider>
)
