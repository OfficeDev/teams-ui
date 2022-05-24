import { ReactElement, ReactSVGElement, cloneElement } from 'react'

import { makeStyles } from '@fluentui/react-components'
import { MediaProps, ThemeName } from '@teamsui/schemas'

import { useTeamsUiContext } from '../../lib'

type ImageValue = string | Omit<ReactSVGElement, 'ref'>

export type ThemedImageProps = MediaProps & { [key in ThemeName]: ImageValue }

const useThemedImageStyles = makeStyles({
  img: { maxWidth: '100%', height: 'auto' },
})

export function ThemedImage(props: ThemedImageProps) {
  const { themeName } = useTeamsUiContext()
  const value = props[themeName] as ImageValue
  const themedImageStyles = useThemedImageStyles()
  return typeof value == 'string' ? (
    <img
      {...(props.label ? { alt: props.label } : { role: 'none' })}
      src={value}
      className={themedImageStyles.img}
    />
  ) : (
    cloneElement(
      value,
      props.label ? { 'aria-label': props.label } : { role: 'none' }
    )
  )
}

export type ThemedImageElement = ReactElement<
  ThemedImageProps,
  typeof ThemedImage
>
export type ThemedImagePropsOrElement = ThemedImageProps | ThemedImageElement

function isThemedImageProps(o: any): o is ThemedImageProps {
  return 'light' in o && 'dark' in o && 'highContrast' in o
}

function isThemedImageElement(o: any): o is ThemedImageElement {
  return o?.type === ThemedImage
}

export function renderIfThemedImage(o: any) {
  return isThemedImageProps(o) ? (
    <ThemedImage {...o} />
  ) : isThemedImageElement(o) ? (
    o
  ) : null
}
