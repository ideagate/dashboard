import { lazy } from 'react'

export const MainLayout = lazy(() => import('./layout/MainLayout'))
export const DataSourcePage = lazy(() => import('./pages/datasource'))
export const LoginPage = lazy(() => import('./pages/login'))
export const Root = lazy(() => import('./pages/root'))

export const ApplicationDetailPage = lazy(() => import('#/pages/application/Detail'))
export const ApplicationEntrypointDetailPage = lazy(() => import('#/pages/application/EntrypointDetail'))
export const ApplicationListPage = lazy(() => import('#/pages/application/List'))
