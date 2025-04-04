import { IconApps, IconDashboard, IconKey, IconProps } from '@tabler/icons-react'
import { FC, ReactElement } from 'react'
import { Params } from 'react-router-dom'

export type Menu = {
  id: string
  title: string
  type: 'group' | 'collapse' | 'item'
  disabled?: boolean
  caption?: string
  url?: string
  hide?: boolean
  icon?: FC<IconProps>
  chip?: {
    label: string
    color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
    variant?: 'filled' | 'outlined'
    size?: 'small' | 'medium'
    avatar?: ReactElement
  }
  children?: Menu[]
}

export const getMenu: (params: Readonly<Params<string>>) => Menu[] = (params) => {
  const projectID = params.project_id
  const isProjectIDNotExist = projectID == undefined

  return [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'group',
      children: [
        {
          id: 'default',
          title: 'Dashboard',
          type: 'item',
          url: '/',
          icon: IconDashboard,
        },
        {
          id: 'application',
          title: 'Aplikasi',
          type: 'item',
          hide: isProjectIDNotExist,
          url: `/${params.project_id}/application`,
          icon: IconApps,
        },
      ],
    },
    {
      id: 'pages',
      title: 'Pages',
      caption: 'Pages Caption',
      type: 'group',
      children: [
        {
          id: 'authentication',
          title: 'Authentication',
          type: 'collapse',
          icon: IconKey,
          children: [
            {
              id: 'login',
              title: 'Login',
              type: 'item',
              url: '/login',
            },
            {
              id: 'register',
              title: 'Register',
              type: 'item',
              url: '/register',
            },
          ],
        },
      ],
    },
  ]
}
