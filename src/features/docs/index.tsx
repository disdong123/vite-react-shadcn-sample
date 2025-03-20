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
} from '@/components/tree-nav-group.tsx'
import { TreeNavGroupUtils } from '@/components/utils/tree-nav-group.utils.ts'
import { DocsUtils } from '@/features/docs/utils/docs.utils.ts'

export default function Docs() {
  const docs = docsClient.getDocs()
  const [selectedItem, setSelectedItem] = useState<TreeNavGroupItemType | null>(
    null
  )
  const [selectedDoc, setSelectedDoc] = useState<DocsType | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false) // 사이드바 축소 상태 관리

  // item 이 선택될 때 문서 상태 변경 및 url 업데이트
  useEffect(() => {
    if (selectedItem) {
      setSelectedDoc(DocsUtils.getDocById(selectedItem.id, docs))
      window.history.pushState({}, '', `/docs?id=${selectedItem.id}`)
    }
  }, [selectedItem])

  // 컴포넌트가 최초 마운트 되는 경우 id 가 있으면 해당 문서로 라우팅
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const docId = searchParams.get('id')
    if (docId) {
      const selectedItem = TreeNavGroupUtils.getItemById(parseInt(docId), docs)
      if (selectedItem) {
        setSelectedItem(selectedItem)
      }
    }
  }, [])

  // 사이드바 토글 핸들러
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <div className='flex h-full w-full'>
          {/* 왼쪽 사이드바 */}
          <Sidebar
            side='left'
            collapsible='none'
            className={`h-full border-r bg-gray-100 transition-all duration-300 ${
              isCollapsed ? 'w-12' : 'w-64'
            }`}
          >
            {/* Sidebar Header */}
            <SidebarHeader className=''>
              {/* 토글 버튼 */}
              <div className='ml-2 mt-2 flex justify-between'>
                {/* Projects 텍스트 */}
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

            {/* Sidebar Content */}
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

          {/* 오른쪽 컨텐츠 */}
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
    </>
  )
}
