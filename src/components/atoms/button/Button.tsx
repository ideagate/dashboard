import { Button as ButtonMui, ButtonProps as ButttonPropsMui } from '@mui/material'
import { FC, ReactNode } from 'react'

interface ButtonProps extends ButttonPropsMui {
  children?: ReactNode
  isLoading?: boolean
}

const Button: FC<ButtonProps> = (props) => {
  const { variant, children, ...rest } = props

  return (
    <ButtonMui {...rest} variant={variant}>
      {children}
    </ButtonMui>
  )
}

export default Button
