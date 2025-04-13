import { createBrowserRouter } from 'react-router-dom'

import {
  ApplicationDetailPage,
  ApplicationEntrypointDetailPage,
  ApplicationListPage,
  DataSourcePage,
  LoginPage,
  MainLayout,
  Root,
} from './pages'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Root />,
      },
      {
        path: '/:project_id/application',
        element: <ApplicationListPage />,
      },
      {
        path: '/:project_id/application/:app_id',
        element: <ApplicationDetailPage />,
      },
      {
        path: '/:project_id/application/:app_id/entrypoint/:entrypoint_id',
        element: <ApplicationEntrypointDetailPage />,
      },
      {
        path: '/datasource',
        element: <DataSourcePage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
])
