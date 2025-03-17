import { useCallback, useState } from 'react'
import { RedocStandalone } from 'redoc'
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

  const handleSetSelected = useCallback((item: SubNavgroupItemType) => {
    setSelectedItem(item)
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
        <section className='flex h-full gap-6'>
          {/* Left Side */}
          <Sidebar
            side='left'
            collapsible='none'
            className='relative w-72 border-r bg-gray-100'
          >
            <SidebarContent className='w-100'>
              <SubNavGroup
                items={items}
                setSelectedItem={handleSetSelected}
                selectedItem={selectedItem}
              />
            </SidebarContent>
          </Sidebar>

          {/* Right Side */}
          {selectedItem ? (
            // RedocStandalone with scrollable container
            <div className='flex flex-1 flex-col overflow-y-auto'>
              <RedocStandalone
                specUrl={selectedItem.docsUrl}
                options={{
                  nativeScrollbars: true,
                  theme: { colors: { primary: { main: '#dd5522' } } },
                }}
              />
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
