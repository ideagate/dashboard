import { Box, Chip, Drawer, Stack, useMediaQuery, useTheme } from '@mui/material'
import { FC } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { drawerWidth } from '#/store/constant'

import MenuList from './MenuList'

interface SidebarProps {
  drawerOpen: boolean
  drawerToggle?: () => void
}

const Sidebar: FC<SidebarProps> = ({ drawerOpen, drawerToggle }) => {
  const theme = useTheme()
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'))

  const container = window !== undefined ? () => window.document.body : undefined

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }}>
      <Drawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        open={drawerOpen}
        onClose={drawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: 'none',
            [theme.breakpoints.up('md')]: {
              top: '88px',
            },
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          <MenuList />
          <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <Chip label="v0.0.1" disabled color="secondary" size="small" sx={{ cursor: 'pointer' }} />
          </Stack>
        </PerfectScrollbar>
      </Drawer>
    </Box>
  )
}

export default Sidebar
