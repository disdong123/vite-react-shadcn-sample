import { IconLayoutDashboard, IconPackages } from '@tabler/icons-react'
import { Command } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Kbank developer portal',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Overviews',
          url: '/overviews',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Docs',
          url: '/docs',
          icon: IconPackages,
        },
      ],
    },
  ],
}
