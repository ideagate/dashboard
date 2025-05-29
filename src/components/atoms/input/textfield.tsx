import { TextField as TextFieldMui, TextFieldProps as TextFieldPropsMui } from '@mui/material'
import { FC } from 'react'

import { BaseInputProps } from './props'

type TextFieldPropsFiltered = Omit<TextFieldPropsMui, 'onChange' | 'error'>
type TextFieldProps = TextFieldPropsFiltered & BaseInputProps

export const TextField: FC<TextFieldProps> = (props) => {
  const { error, onChange, ...rest } = props

  return (
    <TextFieldMui
      size="small"
      onChange={(e) => onChange?.(e.target.value)}
      error={error != null && error.trim() !== ''}
      helperText={error}
      defaultValue={props.initialValue}
      {...rest}
    />
  )
}
