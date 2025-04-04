import {
  Button as ButtonMui,
  ButtonProps as ButtonPropsMui,
  Paper as PaperMui,
  TextField as TextFieldMui,
  TextFieldProps,
  Typography,
} from '@mui/material'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { FC, ReactNode } from 'react'

import { MainCard } from '#/components/atoms/card'

export const Paper: FC<{ children: ReactNode }> = ({ children }) => (
  <PaperMui
    sx={{
      backgroundColor: 'rgb(33,41,70)',
      width: '450px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}
  >
    {children}
  </PaperMui>
)

export const TextWelcome = () => <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>Selamat Datang</Typography>

export const TextBody: FC<{ children: ReactNode }> = ({ children }) => (
  <Typography sx={{ color: '#8492d4' }}>{children}</Typography>
)

export const TextField: FC<TextFieldProps> = (props) => <TextFieldMui {...props} fullWidth />

interface ButtonProps extends ButtonPropsMui {
  children: ReactNode
  isLoading: boolean
}

export const Button: FC<ButtonProps> = ({ children, isLoading, ...rest }) => (
  <ButtonMui {...rest} fullWidth variant="contained" disableElevation disabled={isLoading}>
    {children}
  </ButtonMui>
)

export const AuthWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  minHeight: '100vh',
}))

export const AuthCardWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <MainCard
    sx={{
      maxWidth: { xs: 400, lg: 475 },
      margin: { xs: 2.5, md: 3 },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%',
      },
    }}
    content={false}
  >
    <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
  </MainCard>
)
