import { AccentScheme, ThemeName } from '@teamsui/schemas'

import { SectionContentProps } from '../../blocks'
import { TeamsUiProvider, Translations, defaultTranslations } from '../../lib'
import { WithActionHandler } from '../../props'
import { Main } from '../../surfaces'

export interface ViewProps extends WithActionHandler<any> {
  main: SectionContentProps
  themeName?: ThemeName
  accentScheme?: AccentScheme
  translations?: Translations
  iconSpriteUrl?: string
}

/** An experience provided to the user via their device’s canvas. */
export const View = ({
  main,
  themeName = 'light',
  accentScheme = 'web',
  translations = defaultTranslations,
  iconSpriteUrl,
  onAction,
}: ViewProps) => (
  <TeamsUiProvider
    {...{
      themeName,
      accentScheme,
      translations,
      onAction,
      iconSpriteUrl,
    }}
  >
    <Main {...main} />
  </TeamsUiProvider>
)
