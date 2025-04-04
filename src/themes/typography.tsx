import { TypographyOptions } from '@mui/material/styles/createTypography'

import { ThemeOptionsVars } from '#/themes/types.ts'

export default function themeTypography(vars: ThemeOptionsVars): TypographyOptions {
  return {
    fontFamily: vars.fontFamily,
    h6: {
      fontWeight: 500,
      color: vars.heading,
      fontSize: '0.75rem',
    },
    h5: {
      fontSize: '0.875rem',
      color: vars.heading,
      fontWeight: 500,
    },
    h4: {
      fontSize: '1rem',
      color: vars.heading,
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.25rem',
      color: vars.heading,
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.5rem',
      color: vars.heading,
      fontWeight: 700,
    },
    h1: {
      fontSize: '2.125rem',
      color: vars.heading,
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: vars.textDark,
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 400,
      color: vars.darkTextSecondary,
    },
    caption: {
      fontSize: '0.75rem',
      color: vars.darkTextSecondary,
      fontWeight: 400,
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.334em',
    },
    body2: {
      letterSpacing: '0em',
      fontWeight: 400,
      lineHeight: '1.5em',
      color: vars.darkTextPrimary,
    },
    button: {
      textTransform: 'capitalize',
    },
    customInput: {
      marginTop: 1,
      marginBottom: 1,
      '& > label': {
        top: 23,
        left: 0,
        color: vars.colors.grey500,
        '&[data-shrink="false"]': {
          top: 5,
        },
      },
      '& > div > input': {
        padding: '30.5px 14px 11.5px !important',
      },
      '& legend': {
        display: 'none',
      },
      '& fieldset': {
        top: 0,
      },
    },
    mainContent: {
      backgroundColor: vars.background,
      width: '100%',
      minHeight: 'calc(100vh - 88px)',
      flexGrow: 1,
      padding: '20px',
      marginTop: '88px',
      marginRight: '20px',
      borderRadius: vars.borderRadius,
    },
    menuCaption: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: vars.heading,
      padding: '6px',
      textTransform: 'capitalize',
      marginTop: '10px',
    },
    subMenuCaption: {
      fontSize: '0.6875rem',
      fontWeight: 500,
      color: vars.darkTextSecondary,
      textTransform: 'capitalize',
    },
    commonAvatar: {
      cursor: 'pointer',
      borderRadius: '8px',
    },
    smallAvatar: {
      width: '22px',
      height: '22px',
      fontSize: '1rem',
    },
    mediumAvatar: {
      width: '34px',
      height: '34px',
      fontSize: '1.2rem',
    },
    largeAvatar: {
      width: '44px',
      height: '44px',
      fontSize: '1.5rem',
    },
  }
}
