import { useCallback, useEffect, useState } from 'react'
import { Sidebar, SidebarContent } from '@/components/ui/sidebar.tsx'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import {
  SubNavgroupItemType,
  SubNavGroup,
} from '@/components/tree-nav-group.tsx'
import { items } from './data/items.json'

export default function Docs() {
  const [selectedItem, setSelectedItem] = useState<SubNavgroupItemType | null>(
    null
  )

  const handleSetSelected = useCallback(
    (item: SubNavgroupItemType) => {
      // 이전 상태와 비교하여 동일한 값이면 업데이트 방지
      if (selectedItem?.id !== item.id) {
        setSelectedItem(item)
      }
    },
    [selectedItem] // 종속성 배열에 selectedItem 추가
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
        <section className='flex h-full gap-6'>
          {/* Left Side */}
          <Sidebar
            side='left'
            collapsible='none'
            className='relative w-72 border-r bg-gray-100'
          >
            <SidebarContent>
              <SubNavGroup
                items={items}
                setSelectedItem={handleSetSelected}
                selectedItem={selectedItem}
              />
            </SidebarContent>
          </Sidebar>

          {/* Right Side */}
          {/*https://raw.githubusercontent.com/disdong123/vite-react-shadcn-sample/blob/main/html/redoc-static.html*/}
          {selectedItem?.docsUrl ? (
            // RedocStandalone with scrollable container
            <div className='flex flex-1 flex-col overflow-y-auto'>
              <iframe
                src={selectedItem.docsUrl} // Redocly CLI로 생성된 HTML 파일 경로
                className='h-full w-full border-none'
                title='API Documentation'
              ></iframe>
            </div>
          ) : (
            // Placeholder content with scrollable container
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
