import React from 'react'
import { ChevronRight, File, Folder } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
} from '@/components/ui/sidebar'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
} from '@/components/ui/sidebar'

export interface SubNavgroupItemType {
  id: number
  title: string
  type: string
  docsUrl: string | null
  subItems: Array<SubNavgroupItemType>
}

const Tree = React.memo(function Tree({
  item,
  setSelectedItem,
  selectedItem,
  isRoot = false, // 최상위 부모인지 확인하는 플래그
}: {
  item: SubNavgroupItemType
  setSelectedItem: (item: SubNavgroupItemType) => void
  selectedItem: SubNavgroupItemType | null
  isRoot?: boolean // 기본값은 false
}) {
  const { id, title, type, subItems = [] } = item // 구조 분해로 title, type, subItems 추출
  const isLeaf = subItems.length === 0 // 하위 아이템이 없는 경우 확인

  // 하위 아이템이 없는 경우
  if (isLeaf) {
    return (
      <SidebarMenuButton
        onClick={() => {
          if (type === 'project') {
            setSelectedItem(item) // 선택된 항목 업데이트
          }
        }}
        className={`data-[active=true]:bg-transparent ${
          selectedItem?.id === id && selectedItem?.type === 'project'
            ? 'bg-blue-100 text-blue-600'
            : ''
        }`} // 선택된 항목에 하이라이트 추가
      >
        <File />
        {title}
      </SidebarMenuButton>
    )
  }

  // 하위 아이템이 있는 경우 (폴더 렌더링)
  return (
    <SidebarMenuItem>
      <Collapsible
        className='group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90'
        defaultOpen={isRoot} // 최상위 부모만 기본적으로 열림
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className='transition-transform' />
            <Folder />
            {title}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className='px-2.0 pl-2.5'>
            {subItems.map((subItem) => (
              <Tree
                key={subItem.id}
                item={subItem}
                setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}
                isRoot={false} // 하위 항목은 최상위가 아님
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
})

export function SubNavGroup({
  items,
  setSelectedItem,
  selectedItem,
}: {
  items: Array<SubNavgroupItemType>
  setSelectedItem: (item: SubNavgroupItemType) => void
  selectedItem: SubNavgroupItemType | null
}) {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <Tree
                key={item.id}
                item={item}
                setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}
                isRoot={true} // 최상위 부모임을 명시
              />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}
