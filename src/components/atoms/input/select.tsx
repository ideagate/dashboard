import { Box, Typography, useTheme } from '@mui/material'
import { FC } from 'react'
import SelectBase, { Props } from 'react-select'

import { BaseInputProps } from './props'

export type SelectProps = Omit<Props, 'onChange' | 'error' | 'defaultValue' | 'options'> &
  BaseInputProps & {
    options?: Array<{ label: string; value: string }>
  }

export const Select: FC<SelectProps> = (props) => {
  const { initialValue, error, disabled, onChange, value, options, fullWidth, ...rest } = props

  const theme = useTheme()

  const valueOption = options?.find((option) => option.value === value)
  const initialValueOption = options?.find((option) => option.value === initialValue)

  return (
    <Box width={fullWidth ? '100%' : 'none'}>
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
            borderColor: error ? theme.opts.colors.errorMain : '#ccd5df',
          }),
        }}
        isDisabled={disabled}
        defaultValue={initialValueOption}
        value={valueOption}
        options={options}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(option: any) => onChange?.(option.value)}
        {...rest}
      />

      {error && (
        <Typography variant="subtitle2" color={theme.opts.colors.errorMain} mx="14px" mt="4px">
          {error}
        </Typography>
      )}
    </Box>
  )
}
