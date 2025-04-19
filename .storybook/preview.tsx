import '../src/styles/tailwind.css'

import { ThemeProvider } from '@mui/material'
import type { Preview } from '@storybook/react'
import React from 'react'

import theme from '../src/themes'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme()}>
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default preview
