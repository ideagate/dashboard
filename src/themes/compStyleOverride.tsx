import { Theme } from '@mui/material/styles'

import { ThemeOptionsVars } from '#/themes/types.ts'

export default function componentStyleOverrides(vars: ThemeOptionsVars): Theme['components'] {
  const bgColor = vars.colors?.grey50
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: '4px',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: vars.borderRadius,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: vars.colors?.darkTextTitle,
          padding: '24px',
        },
        title: {
          fontSize: '1.125rem',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: vars.darkTextPrimary,
          paddingTop: '10px',
          paddingBottom: '10px',
          '&.Mui-selected': {
            color: vars.menuSelected,
            backgroundColor: vars.menuSelectedBack,
            '&:hover': {
              backgroundColor: vars.menuSelectedBack,
            },
            '& .MuiListItemIcon-root': {
              color: vars.menuSelected,
            },
          },
          '&:hover': {
            backgroundColor: vars.menuSelectedBack,
            color: vars.menuSelected,
            '& .MuiListItemIcon-root': {
              color: vars.menuSelected,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: vars.darkTextPrimary,
          minWidth: '36px',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: vars.textDark,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: vars.textDark,
          '&::placeholder': {
            color: vars.darkTextSecondary,
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: bgColor,
          borderRadius: vars.borderRadius,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: vars.colors?.grey300,
          },
          '&:hover $notchedOutline': {
            borderColor: vars.colors?.primaryLight,
          },
          '&.MuiInputBase-multiline': {
            padding: 1,
          },
        },
        input: {
          fontWeight: 500,
          background: bgColor,
          padding: '15.5px 14px',
          borderRadius: vars.borderRadius,
          '&.MuiInputBase-inputSizeSmall': {
            padding: '10px 14px',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          borderRadius: vars.borderRadius,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: vars.colors?.grey300,
          },
        },
        mark: {
          backgroundColor: vars.paper,
          width: '4px',
        },
        valueLabel: {
          color: vars?.colors?.primaryLight,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: vars.divider,
          opacity: 1,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: vars.colors?.primaryDark,
          background: vars.colors?.primary200,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-deletable .MuiChip-deleteIcon': {
            color: 'inherit',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: vars.paper,
          background: vars.colors?.grey700,
        },
      },
    },
  }
}
