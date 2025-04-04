import { createBrowserRouter } from 'react-router-dom'

import ApplicationDetailPage from '#/pages/application/Detail'
import ApplicationEntrypointDetailPage from '#/pages/application/EntrypointDetail'
import ApplicationListPage from '#/pages/application/List'

import MainLayout from './layout/MainLayout'
import DataSourcePage from './pages/datasource'
import LoginPage from './pages/login'
import Root from './pages/root'

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
