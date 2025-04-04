import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useTheme } from '@mui/material/styles'
import { IconAdjustmentsHorizontal, IconSearch } from '@tabler/icons-react'
import { forwardRef, ReactNode, useState } from 'react'

interface HeaderAvatarProps {
  children?: ReactNode
}

const HeaderAvatar = forwardRef<HTMLDivElement, HeaderAvatarProps>(({ children, ...others }, ref) => {
  const theme = useTheme()

  return (
    <Avatar
      ref={ref}
      variant="rounded"
      sx={{
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        bgcolor: 'secondary.light',
        color: 'secondary.dark',
        '&:hover': {
          bgcolor: 'secondary.dark',
          color: 'secondary.light',
        },
      }}
      {...others}
    >
      {children}
    </Avatar>
  )
})

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = () => {
  const [value, setValue] = useState('')

  return (
    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
      <OutlinedInput
        id="input-search-header"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        startAdornment={
          <InputAdornment position="start">
            <IconSearch stroke={1.5} size="16px" />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <HeaderAvatar>
              <IconAdjustmentsHorizontal stroke={1.5} size="20px" />
            </HeaderAvatar>
          </InputAdornment>
        }
        aria-describedby="search-helper-text"
        inputProps={{ 'aria-label': 'weight', sx: { bgcolor: 'transparent', pl: 0.5 } }}
        sx={{ width: { md: 250, lg: 434 }, ml: 2, px: 2 }}
      />
    </Box>
  )
}

export default SearchSection
