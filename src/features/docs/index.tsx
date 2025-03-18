import { useEffect, useState } from 'react'
import { docsClient } from '@/apis/gitlab/gitlab.client.ts'
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
import { DocsUtils } from '@/features/docs/utils/docs.utils.ts'

export default function Docs() {
  const docs = docsClient.getDocs()
  const [selectedItem, setSelectedItem] = useState<TreeNavGroupItemType | null>(
    null
  )
  const [selectedDoc, setSelectedDoc] = useState<DocsType | null>(null)

  // item 이 선택될 때 문서 상태 변경 및 url 업데이트
  useEffect(() => {
    if (selectedItem) {
      setSelectedDoc(DocsUtils.getDocById(selectedItem.id, docs))
      window.history.pushState({}, '', `/docs?docId=${selectedItem.id}`)
    }
  }, [selectedItem])

  // 컴포넌트가 최초 마운트 되는 경우 docId 가 있으면 해당 문서로 라우팅
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const docId = searchParams.get('docId')
    if (docId) {
      const selectedItem = TreeNavGroupUtils.getItemById(parseInt(docId), docs)
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
                  items={docs}
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
          </Panel>
        </PanelGroup>
      </Main>
    </>
  )
}
