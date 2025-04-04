import { Button as ButtonMui } from '@mui/material'
import { FC, ReactNode } from 'react'

interface ButtonProps {
  children?: ReactNode
  variant?: 'text' | 'contained' | 'outlined'
}

const Button: FC<ButtonProps> = (props) => {
  return <ButtonMui variant={props.variant}>{props.children}</ButtonMui>
}

export default Button
