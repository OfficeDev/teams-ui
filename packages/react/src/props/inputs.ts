import {
  InlineSequenceOrString as NaturalInlineSequenceOrString,
  InputProps as NaturalInputProps,
  InputInitialValueProps as NaturalInputWithInitialStringValue,
  LabeledValueProps as NaturalLabeledValueProps,
  TextInputProps as NaturalTextInputProps,
} from '@teamsui/schemas'

import { InlineSequenceOrString } from '../inlines'

export type WithInputElements<
  T extends { label: NaturalInlineSequenceOrString }
> = Omit<T, 'label'> & {
  label: InlineSequenceOrString
}

export interface InputProps extends WithInputElements<NaturalInputProps> {}

export interface InputInitialValueProps
  extends InputProps,
    NaturalInputWithInitialStringValue {}

export interface TextInputProps
  extends WithInputElements<NaturalTextInputProps> {}

export interface LabeledValueProps
  extends WithInputElements<NaturalLabeledValueProps> {}

export type ShortInputContextualVariant =
  | 'block-inputs'
  | 'card-inputs'
  | 'narrow-inputs'
  | 'toolbar-item'
  | 'toolbar-item--needs-update'
  | 'toolbar-item--hidden'

export interface ShortInputContextualProps {
  contextualVariant?: ShortInputContextualVariant
  selected?: boolean
  controls?: string
}
