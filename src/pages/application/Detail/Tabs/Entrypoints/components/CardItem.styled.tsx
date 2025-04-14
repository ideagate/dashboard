import { Box, useTheme } from '@mui/material'
import { FC, ReactNode } from 'react'

const CardItem: FC<{ children?: ReactNode }> = ({ children }) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        my: 1,
        border: 'solid 1px',
        borderColor: 'divider',
        borderRadius: theme.opts.borderRadius,
        px: 2,
        py: 1,
        display: 'grid',
        gap: 0.5,
      }}
    >
      {children}
    </Box>
  )
}

export default CardItem
