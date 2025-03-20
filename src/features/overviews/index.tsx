import { useEffect, useState } from 'react'
import { projectClient } from '@/apis/gitlab/gitlab.client.ts'
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
import { OverviewsUtils } from '@/features/overviews/utils/overviews.utils.ts'

export default function Overviews() {
  const projects = projectClient.getProjects()
  const [selectedItem, setSelectedItem] = useState<TreeNavGroupItemType | null>(
    null
  )
  const [selectedProject, setSelectedProject] = useState<DocsType | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false) // 사이드바 축소 상태 관리

  // item 이 선택될 때 문서 상태 변경 및 url 업데이트
  useEffect(() => {
    if (selectedItem) {
      setSelectedProject(
        OverviewsUtils.getProjectById(selectedItem.id, projects)
      )
      window.history.pushState(
        {},
        '',
        `/overviews?projectId=${selectedItem.id}`
      )
    }
  }, [selectedItem])

  // 컴포넌트가 최초 마운트 되는 경우 docId 가 있으면 해당 문서로 라우팅
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const projectId = searchParams.get('projectId')
    if (projectId) {
      const selectedItem = TreeNavGroupUtils.getItemById(
        parseInt(projectId),
        projects
      )
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
                    Projects
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
                  items={projects}
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
            {selectedProject ? (
              <div className='flex h-full flex-col items-center justify-center overflow-y-auto rounded-md border bg-primary-foreground shadow-sm'>
                {selectedProject.title}
              </div>
            ) : (
              <div className='flex h-full flex-col items-center justify-center overflow-y-auto rounded-md border bg-primary-foreground shadow-sm'>
                no selected project
              </div>
            )}
          </div>
        </div>
      </Main>
    </>
  )
}
