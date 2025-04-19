import '@mui/material/styles'
import '@mui/material/styles/createTypography'

import { ThemeOptionsVars } from './themes/types.ts'

declare module '@mui/material/styles' {
  interface Theme {
    opts: ThemeOptionsVars
  }

  interface ThemeOptions {
    opts: ThemeOptionsVars
  }

  interface PaletteOptions {
    orange?: PaletteColorOptions
    dark?: PaletteColorOptions
  }

  interface TypeText {
    dark: string
    hint: string
  }
}

declare module '@mui/material/styles/createTypography' {
  interface Typography {
    customInput: object
    mainContent: object
    menuCaption: object
    subMenuCaption: object
    commonAvatar: object
    smallAvatar: object
    mediumAvatar: object
    largeAvatar: object
  }

  interface TypographyOptions {
    customInput: object
    mainContent: object
    menuCaption: object
    subMenuCaption: object
    commonAvatar: object
    smallAvatar: object
    mediumAvatar: object
    largeAvatar: object
  }
}
