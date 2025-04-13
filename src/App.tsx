import './index.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/700.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'

import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import { Box, CircularProgress } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'

import theme from '#/themes'

import { router } from './router'

const queryClient = new QueryClient()

const Loader = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
)

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <QueryClientProvider client={queryClient}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme()}>
            <CssBaseline />
            <ReactQueryDevtools />
            <RouterProvider router={router} />
          </ThemeProvider>
        </StyledEngineProvider>
      </QueryClientProvider>
    </Suspense>
  )
}

export default App
