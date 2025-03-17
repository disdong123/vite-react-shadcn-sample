import { useCallback, useEffect, useState } from 'react'
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

export default function Docs() {
  const gitlabGroups: TreeNavGroupItemType[] = groups
  const [selectedGroup, setSelectedGroup] =
    useState<TreeNavGroupItemType | null>(null)

  // 선택된 항목이 변경될 때 URL 업데이트
  useEffect(() => {
    if (selectedGroup) {
      const newUrl = `/docs?groupId=${selectedGroup.id}` // URL에 groupId ID를 추가
      window.history.pushState({}, '', newUrl) // 페이지 리로드 없이 URL 변경
    }
  }, [selectedGroup])

  // 페이지 로드 시 URL에서 groupId ID를 읽어와 상태 초기화
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const groupIdId = searchParams.get('groupId') // URL에서 groupId ID를 추출

    if (groupIdId) {
      const foundItem = findGroupById(gitlabGroups, parseInt(groupIdId)) // Helper 함수로 ID에 해당하는 항목 찾기
      if (foundItem) {
        setSelectedGroup(foundItem)
      }
    }
  }, [])

  // 아이템 선택 핸들러
  const handleSetSelected = useCallback(
    (group: TreeNavGroupItemType) => {
      if (selectedGroup?.id !== group.id) {
        setSelectedGroup(group)
      }
    },
    [selectedGroup]
  )

  return (
    <>
      <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <section className='flex h-full gap-3'>
          {/* 왼쪽 사이드바 */}
          <Sidebar
            side='left'
            collapsible='none'
            className='relative w-72 border-r bg-gray-100'
          >
            <SidebarContent>
              <SubNavGroup
                items={gitlabGroups}
                setSelectedItem={handleSetSelected}
                selectedItem={selectedGroup}
              />
            </SidebarContent>
          </Sidebar>

          {/* 오른쪽 콘텐츠 */}
          {selectedGroup?.docsUrl ? (
            // 선택된 문서를 iframe 으로 표시
            <div className='flex flex-1 flex-col overflow-y-auto'>
              <iframe
                src={selectedGroup.docsUrl} // 선택된 문서의 URL을 iframe에 삽입
                className='h-full w-full border-none'
                title='API Documentation'
              ></iframe>
            </div>
          ) : (
            // 선택된 문서가 없을 때 플레이스홀더 표시
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
