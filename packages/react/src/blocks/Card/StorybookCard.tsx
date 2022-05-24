import range from 'lodash/range'

import { AccentScheme, TeamsUiProvider, ThemeName } from '../../lib'
import { CardProps } from '../../props/card-properties'
import { Main } from '../../surfaces'

export const BlockCard = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  ...props
}: CardProps & {
  themeName: ThemeName
  accentScheme: AccentScheme
  iconSpriteUrl: string
}) => (
  <TeamsUiProvider {...{ themeName, accentScheme, iconSpriteUrl }}>
    <Main blocks={[props]} title={[{ text: ' ' }]} />
  </TeamsUiProvider>
)

export const LayoutCard = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  ...props
}: CardProps & {
  themeName: ThemeName
  accentScheme: AccentScheme
  iconSpriteUrl: string
}) => (
  <TeamsUiProvider {...{ themeName, accentScheme, iconSpriteUrl }}>
    <Main
      blocks={[
        {
          layout: {
            variant: 'grid',
            items: range(3).map((i) => ({ item: { ...props } })),
          },
        },
      ]}
      title={[{ text: ' ' }]}
    />
  </TeamsUiProvider>
)
