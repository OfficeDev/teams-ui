import { mergeClasses as cx, makeStyles } from '@fluentui/react-components'
import { MainProps as NaturalMainProps } from '@teamsui/schemas'

import { Section, SectionContentProps } from '../../blocks'
import { rem, useCommonStyles } from '../../lib'

export interface MainProps
  extends Pick<NaturalMainProps, 'variant'>,
    SectionContentProps {}

const useMainSectionStyles = makeStyles({
  root: {
    overflowX: 'hidden',
    overflowY: 'hidden',
    backgroundColor: 'var(--surface-background)',
    color: 'var(--surface-foreground)',
    paddingBlockEnd: rem(44),
    paddingInlineStart: '1rem',
    paddingInlineEnd: '1rem',
  },
  'root--flush': {
    paddingInlineStart: 0,
    paddingInlineEnd: 0,
  },
})

export const Main = (props: MainProps) => {
  const mainStyles = useMainSectionStyles()
  const commonStyles = useCommonStyles()
  return (
    <Section
      {...props}
      as="main"
      level={1}
      className={cx(
        commonStyles.baseSurface,
        mainStyles.root,
        props.variant === 'flush' && mainStyles['root--flush']
      )}
    />
  )
}
