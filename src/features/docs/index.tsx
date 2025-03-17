import { useEffect, useState } from 'react'
import { Sidebar, SidebarContent } from '@/components/ui/sidebar.tsx'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import {
  TreeNavGroupItemType,
  SubNavGroup,
} from '@/components/tree-nav-group.tsx'
import { groups } from './data/gitlab-groups.json'

// Docs 페이지 컴포넌트
export default function Docs() {
  const [selectedGroup, setSelectedGroup] =
    useState<TreeNavGroupItemType | null>(null)

  // URL 업데이트 효과
  useEffect(() => {
    if (selectedGroup) {
      const newUrl = `/docs?groupId=${selectedGroup.id}`
      window.history.pushState({}, '', newUrl)
    }
  }, [selectedGroup])

  // URL에서 상태 초기화 효과
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const groupId = searchParams.get('groupId')
    if (groupId) {
      const foundGroup = findGroupById(groups, parseInt(groupId))
      if (foundGroup) setSelectedGroup(foundGroup)
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
        <section className='flex h-full gap-2'>
          {/* 왼쪽 사이드바 */}
          <Sidebar
            side='left'
            collapsible='none'
            className='w-72 border-r bg-gray-100'
          >
            <SidebarContent>
              <SubNavGroup
                items={groups}
                setSelectedItem={setSelectedGroup}
                selectedItem={selectedGroup}
              />
            </SidebarContent>
          </Sidebar>

          {/* 오른쪽 콘텐츠 */}
          {selectedGroup?.docsUrl ? (
            <div className='flex flex-1 flex-col overflow-y-auto'>
              <iframe
                src={selectedGroup.docsUrl}
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

// Helper 함수: 트리 구조에서 ID에 해당하는 항목을 재귀적으로 찾기
function findGroupById(
  groups: Array<TreeNavGroupItemType>,
  id: number
): TreeNavGroupItemType | null {
  for (const group of groups) {
    if (group.id === id) return group // 현재 항목의 ID가 일치하면 반환
    if (group.subItems.length > 0) {
      const found = findGroupById(group.subItems, id) // 하위 항목에서 검색 수행
      if (found) return found // 하위 항목에서 찾으면 반환
    }
  }
  return null // 일치하는 항목이 없으면 null 반환
}
