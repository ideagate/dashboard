import { createTheme, ThemeOptions } from '@mui/material/styles'

import colors from '#/assets/scss/_themes-vars.module.scss'
import { ThemeOptionsVars } from '#/themes/types.ts'

import componentStyleOverrides from './compStyleOverride'
import themePalette from './palette'
import themeTypography from './typography'

export const theme = () => {
  const color = colors

  const themeOptionsVars: ThemeOptionsVars = {
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: `8px`,
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,
  }

  const themeOptions: ThemeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOptionsVars),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px',
        },
      },
    },
    typography: themeTypography(themeOptionsVars),
    opts: themeOptionsVars,
  }

  const themes = createTheme(themeOptions)
  themes.components = componentStyleOverrides(themeOptionsVars)

  return themes
}

export default theme
