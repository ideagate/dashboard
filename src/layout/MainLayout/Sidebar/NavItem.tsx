import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { FC, forwardRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Menu } from '#/store/menu'

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem: FC<{ item: Menu; level: number }> = ({ item, level }) => {
  const theme = useTheme()
  const { pathname } = useLocation()
  // const matchesSM = useMediaQuery(theme.breakpoints.down('lg'))

  const itemIcon = item?.icon ? (
    <item.icon stroke={1.5} size="1.3rem" />
  ) : (
    <FiberManualRecordIcon
      sx={{
        // width: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        // height: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        width: 6,
        height: 6,
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  )

  const itemTarget = '_self'

  const listItemProps = {
    component: forwardRef<HTMLAnchorElement>((props, ref) => (
      <Link ref={ref} {...props} to={item.url ?? ''} target={itemTarget} />
    )),
  }
  // if (item?.external) {
  //   listItemProps = { component: 'a', href: item.url, target: itemTarget }
  // }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const itemHandler = (_id: string) => {
    // dispatch({ type: MENU_OPEN, id })
    // // if (matchesSM) dispatch({ type: SET_MENU, opened: false })
  }

  // active menu item on page load
  useEffect(() => {
    // const currentIndex = document.location.pathname
    //   .toString()
    //   .split('/')
    //   .findIndex((id) => id === item.id)
    // if (currentIndex > -1) {
    //   dispatch({ type: MENU_OPEN, id: item.id })
    // }
  }, [pathname])

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: theme.opts.borderRadius,
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`,
      }}
      // selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography
            // variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'}
            color="inherit"
          >
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  )
}

export default NavItem
