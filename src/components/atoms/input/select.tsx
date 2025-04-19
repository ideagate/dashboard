import { Typography, useTheme } from '@mui/material'
import { FC } from 'react'
import SelectBase, { Props } from 'react-select'

import { BaseInputProps } from './props'

type PropsFiltered = Omit<Props, 'onChange' | 'error' | 'defaultValue'>
type SelectProps = PropsFiltered & BaseInputProps

export const Select: FC<SelectProps> = (props) => {
  const { initialValue, error, disabled, onChange, ...rest } = props

  const theme = useTheme()

  return (
    <div>
      <SelectBase
        styles={{
          control: (baseStyle, control) => ({
            ...baseStyle,
            fontFamily: theme.opts.fontFamily,
            fontSize: '0.875rem',
            padding: '1px 0',
            borderRadius: theme.opts.borderRadius,
            backgroundColor: control.isDisabled ? '#efefef4d' : '#f7fafc',
            ':hover': {
              cursor: control.isDisabled ? 'not-allowed' : 'pointer',
            },
          }),
        }}
        isDisabled={disabled}
        defaultValue={initialValue}
        onChange={(value) => onChange?.(value as unknown as string)}
        {...rest}
      />

      {error && (
        <Typography variant="subtitle2" color={theme.opts.colors.errorMain} mx="14px" mt="4px">
          {error}
        </Typography>
      )}
    </div>
  )
}
