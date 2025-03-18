import { useEffect, useState } from 'react'
import { docsClient } from '@/apis/gitlab/gitlab.client.ts'
import { Sidebar, SidebarContent } from '@/components/ui/sidebar.tsx'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import {
  TreeNavGroupItemType,
  SubNavGroup,
} from '@/components/tree-nav-group.tsx'
import { DocsUtil } from './utils/docs.util'

export default function Docs() {
  const docs = docsClient.getDocs()
  const [selectedDoc, setSelectedDoc] = useState<TreeNavGroupItemType | null>(
    null
  )

  // 문서가 선택될 때 url 업데이트
  useEffect(() => {
    if (selectedDoc) {
      const newUrl = `/docs?docId=${selectedDoc.id}`
      window.history.pushState({}, '', newUrl)
    }
  }, [selectedDoc])

  // 컴포넌트가 최초 마운트 되는 경우 docId 가 있으면 해당 문서로 라우팅
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const docId = searchParams.get('docId')
    if (docId) {
      const foundDoc = DocsUtil.findDocById(docs, parseInt(docId))
      if (foundDoc) setSelectedDoc(foundDoc)
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
        <section className='flex h-full gap-1'>
          {/* 왼쪽 사이드바 */}
          <Sidebar
            side='left'
            collapsible='none'
            className='w-72 border-r bg-gray-100'
          >
            <SidebarContent>
              <SubNavGroup
                items={docs}
                setSelectedItem={setSelectedDoc}
                selectedItem={selectedDoc}
              />
            </SidebarContent>
          </Sidebar>

          {/* 오른쪽 컨텐츠 */}
          {selectedDoc?.docsUrl ? (
            <div className='flex flex-1 flex-col overflow-y-auto'>
              <iframe
                src={selectedDoc.docsUrl}
                className='h-full w-full border-none'
                title='API Documentation'
              ></iframe>
            </div>
          ) : (
            <div className='flex flex-1 flex-col items-center justify-center overflow-y-auto rounded-md border bg-primary-foreground shadow-sm'>
              <h1 className='text-xl font-semibold'>API Docs use redoc</h1>
              <p className='text-sm text-gray-400'>API Docs use redoc</p>
            </div>
          )}
        </section>
      </Main>
    </>
  )
}
