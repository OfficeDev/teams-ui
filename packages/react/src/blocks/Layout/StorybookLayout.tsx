import { InlineSequenceOrString } from '../../inlines'
import { AccentScheme, TeamsUiProvider, ThemeName } from '../../lib'
import { LayoutProps } from '../../props'
import { Main } from '../../surfaces'

export const Layout = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  ...props
}: LayoutProps & {
  themeName: ThemeName
  accentScheme: AccentScheme
  iconSpriteUrl: string
}) => (
  <TeamsUiProvider {...{ themeName, accentScheme, iconSpriteUrl }}>
    <Main
      blocks={[{ ...props }]}
      title={null as unknown as InlineSequenceOrString}
    />
  </TeamsUiProvider>
)
