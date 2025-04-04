import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

import { Menu } from '#/store/menu'

import NavCollapse from './NavCollapse'
import NavItem from './NavItem'

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup: FC<{ item: Menu }> = ({ item }) => {
  const theme = useTheme()

  // menu list collapse & items
  const items = item.children
    ?.filter((item) => !item.hide)
    .map((menu) => {
      switch (menu.type) {
        case 'collapse':
          return <NavCollapse key={menu.id} menu={menu} level={1} />
        case 'item':
          return <NavItem key={menu.id} item={menu} level={1} />
        default:
          return (
            <Typography key={menu.id} variant="h6" color="error" align="center">
              Menu Items Error
            </Typography>
          )
      }
    })

  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
              {item.title}
              {item.caption && (
                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>

      {/* group divider */}
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  )
}

export default NavGroup
