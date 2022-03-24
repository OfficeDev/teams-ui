import { ReactElement } from 'react'
import get from 'lodash/get'
import { makeStyles } from '@fluentui/react-components'
import { IconVariant, IconSize, IconProps } from '@fluent-blocks/schemas'
import basicIcons from '@fluent-blocks/basic-icons'

import { useFluentBlocksContext } from '../../lib'

function spriteHref(
  icon: string,
  size: IconSize,
  variant: IconVariant,
  basicSpriteUrl: string
): string {
  const style = variant === 'outline' ? 'regular' : variant
  const assetId = `${icon}_${size}_${style}`
  const basicIconConfig = get(basicIcons, ['include', icon], null)
  if (
    basicIconConfig &&
    get(basicIconConfig, 'sizes', get(basicIcons, 'sizes', [])).includes(
      size
    ) &&
    get(basicIconConfig, 'styles', get(basicIcons, 'styles', [])).includes(
      style
    )
  ) {
    // use basic sprite
    return `${basicSpriteUrl}#${assetId}`
  } else {
    // fallback
    return `/sprites/${assetId}.sprite.svg#${assetId}`
  }
}

const iconToTextRatio = 1.16

const useIconStyles = makeStyles({
  root: {
    height: `${iconToTextRatio}em`,
    width: `${iconToTextRatio}em`,
    verticalAlign: 'text-bottom',
    fill: 'currentcolor',
  },
})

export const Icon = (props: IconProps) => {
  const { icon, variant = 'outline', size = 16 } = props
  const iconStyles = useIconStyles()
  const { basicSpriteUrl } = useFluentBlocksContext()
  return (
    <svg className={iconStyles.root} data-chromatic="ignore">
      <use href={spriteHref(icon, size, variant, basicSpriteUrl)} />
    </svg>
  )
}

export type IconElement = ReactElement<IconProps, typeof Icon>

function isIconProps(o: any): o is IconProps {
  return 'icon' in o
}

function isIconElement(o: any): o is IconElement {
  return o?.type === Icon
}

export function renderIfIcon(o: any) {
  return isIconProps(o) ? <Icon {...o} /> : isIconElement(o) ? o : null
}