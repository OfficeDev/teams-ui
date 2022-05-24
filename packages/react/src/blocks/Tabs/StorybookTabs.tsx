import { AccentScheme, TeamsUiProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'
import { TabsProps } from './Tabs'

export const Tabs = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  ...props
}: TabsProps & {
  themeName: ThemeName
  accentScheme: AccentScheme
  iconSpriteUrl: string
}) => (
  <TeamsUiProvider {...{ themeName, accentScheme, iconSpriteUrl }}>
    <Main
      title={[{ text: ' ' }]}
      blocks={[
        { card: { title: '', titleVisuallyHidden: true, body: [props] } },
      ]}
    />
  </TeamsUiProvider>
)
