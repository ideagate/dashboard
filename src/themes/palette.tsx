import { PaletteOptions } from '@mui/material/styles'

import { ThemeOptionsVars } from '#/themes/types.ts'

export default function themePalette(vars: ThemeOptionsVars): PaletteOptions {
  return {
    common: {
      black: vars.colors.darkPaper,
    },
    primary: {
      light: vars.colors.primaryLight,
      main: vars.colors.primaryMain,
      dark: vars.colors.primaryDark,
      200: vars.colors.primary200,
      800: vars.colors.primary800,
    },
    secondary: {
      light: vars.colors.secondaryLight,
      main: vars.colors.secondaryMain,
      dark: vars.colors.secondaryDark,
      200: vars.colors.secondary200,
      800: vars.colors.secondary800,
    },
    error: {
      light: vars.colors.errorLight,
      main: vars.colors.errorMain,
      dark: vars.colors.errorDark,
    },
    orange: {
      light: vars.colors.orangeLight,
      main: vars.colors.orangeMain,
      dark: vars.colors.orangeDark,
    },
    warning: {
      light: vars.colors.warningLight,
      main: vars.colors.warningMain,
      dark: vars.colors.warningDark,
    },
    success: {
      light: vars.colors.successLight,
      200: vars.colors.success200,
      main: vars.colors.successMain,
      dark: vars.colors.successDark,
    },
    grey: {
      50: vars.colors.grey50,
      100: vars.colors.grey100,
      500: vars.darkTextSecondary,
      600: vars.heading,
      700: vars.darkTextPrimary,
      900: vars.textDark,
    },
    dark: {
      light: vars.colors.darkTextPrimary,
      main: vars.colors.darkLevel1,
      dark: vars.colors.darkLevel2,
      800: vars.colors.darkBackground,
      900: vars.colors.darkPaper,
    },
    text: {
      primary: vars.darkTextPrimary,
      secondary: vars.darkTextSecondary,
      dark: vars.textDark,
      hint: vars.colors.grey100,
    },
    background: {
      paper: vars.paper,
      default: vars.backgroundDefault,
    },
  }
}
