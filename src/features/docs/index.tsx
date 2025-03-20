// Docs.tsx (Parent Component)
import { useEffect, useState } from 'react'
import { docsClient } from '@/apis/gitlab/gitlab.client.ts'
import { DocsType } from '@/apis/gitlab/types/docs.type.ts'
import { PanelLeft } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/ui/sidebar.tsx'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import {
  TreeNavGroupItemType,
  SubNavGroup,
  CollapseStateProvider,
} from '@/components/tree-nav-group'
import { TreeNavGroupUtils } from '@/components/utils/tree-nav-group.utils.ts'
import { DocsUtils } from '@/features/docs/utils/docs.utils.ts'

export default function Docs() {
  const docs = docsClient.getDocs()
  const [selectedItem, setSelectedItem] = useState<TreeNavGroupItemType | null>(
    null
  )
  const [selectedDoc, setSelectedDoc] = useState<DocsType | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    if (selectedItem) {
      setSelectedDoc(DocsUtils.getDocById(selectedItem.id, docs))
      window.history.pushState({}, '', `/docs?id=${selectedItem.id}`)
    }
  }, [selectedItem])

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const docId = searchParams.get('id')
    if (docId) {
      const foundItem = TreeNavGroupUtils.getItemById(parseInt(docId), docs)
      if (foundItem) {
        setSelectedItem(foundItem)
      }
    }
  }, [])

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    // Wrap your sidebar and sub-tree in the provider so that all collapse states persist.
    <CollapseStateProvider>
      <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <div className='flex h-full w-full'>
          {/* Sidebar */}
          <Sidebar
            side='left'
            collapsible='none'
            className={`h-full border-r bg-gray-100 transition-all duration-300 ${isCollapsed ? 'w-12' : 'w-88'}`}
          >
            <SidebarHeader>
              <div className='ml-2 mt-2 flex justify-between'>
                {!isCollapsed && (
                  <span className='text-sm font-medium text-gray-600'>
                    Docs
                  </span>
                )}
                <button
                  onClick={toggleSidebar}
                  className='flex h-4 w-4 items-center justify-center rounded hover:bg-gray-300'
                  aria-label='Toggle Sidebar'
                >
                  <PanelLeft size={16} />
                </button>
              </div>
            </SidebarHeader>
            {!isCollapsed && (
              <SidebarContent className='h-full overflow-y-auto'>
                <SubNavGroup
                  items={docs}
                  setSelectedItem={setSelectedItem}
                  selectedItem={selectedItem}
                />
              </SidebarContent>
            )}
          </Sidebar>

          {/* Main Content */}
          <div
            className={`ml-1 flex-1 ${isCollapsed ? 'w-[calc(100%-4rem)]' : 'w-[calc(100%-16rem)]'}`}
          >
            {selectedDoc?.docsUrl ? (
              <div className='flex h-full flex-col overflow-y-auto'>
                <iframe
                  src={selectedDoc.docsUrl}
                  className='h-full w-full border-none'
                  title='API Documentation'
                ></iframe>
              </div>
            ) : (
              <div className='flex h-full flex-col items-center justify-center overflow-y-auto rounded-md border bg-primary-foreground shadow-sm'>
                <h1 className='text-xl font-semibold'>API Docs use redoc</h1>
                <p className='text-sm text-gray-400'>API Docs use redoc</p>
              </div>
            )}
          </div>
        </div>
      </Main>
    </CollapseStateProvider>
  )
}
