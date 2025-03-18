import { useEffect, useState } from 'react'
import { projectClient } from '@/apis/gitlab/gitlab.client.ts'
import { DocsType } from '@/apis/gitlab/types/docs.type.ts'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { Sidebar, SidebarContent } from '@/components/ui/sidebar.tsx'
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

export default function Docs() {
  const projects = projectClient.getProjects()
  const [selectedItem, setSelectedItem] = useState<TreeNavGroupItemType | null>(
    null
  )
  const [selectedProject, setSelectedProject] = useState<DocsType | null>(null)

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

  return (
    <>
      <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        {/* Resizable Panel Group */}
        <PanelGroup direction='horizontal' className='h-full w-full'>
          {/* 왼쪽 사이드바 패널 */}
          <Panel defaultSize={13} minSize={5} maxSize={40}>
            <Sidebar
              side='left'
              collapsible='none'
              className='h-full w-full border-r bg-gray-100' // 다크모드 시 개선 필요
            >
              <SidebarContent className='h-full overflow-y-auto'>
                <SubNavGroup
                  items={projects}
                  setSelectedItem={setSelectedItem}
                  selectedItem={selectedItem}
                />
              </SidebarContent>
            </Sidebar>
          </Panel>

          {/* 리사이즈 핸들 */}
          <PanelResizeHandle className='w-1 bg-gray-300 hover:bg-gray-400' />

          {/* 오른쪽 컨텐츠 패널 */}
          <Panel className={'ml-1'}>
            {selectedProject ? (
              <div className='flex h-full flex-col items-center justify-center overflow-y-auto rounded-md border bg-primary-foreground shadow-sm'>
                {selectedProject.title}
              </div>
            ) : (
              <div className='flex h-full flex-col items-center justify-center overflow-y-auto rounded-md border bg-primary-foreground shadow-sm'>
                no selected project
              </div>
            )}
          </Panel>
        </PanelGroup>
      </Main>
    </>
  )
}
