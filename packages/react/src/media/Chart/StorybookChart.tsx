import { AccentScheme, TeamsUiProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'
import { ChartProps } from './Chart'

export const Chart = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  ...props
}: ChartProps & {
  themeName: ThemeName
  accentScheme: AccentScheme
  iconSpriteUrl: string
}) => (
  <TeamsUiProvider {...{ themeName, accentScheme, iconSpriteUrl }}>
    <Main blocks={[{ media: props, variant: 'textWidth' }]} title={[' ']} />
  </TeamsUiProvider>
)
