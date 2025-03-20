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

export interface TreeNavGroupItemType {
  id: number
  title: string
  subItems: Array<TreeNavGroupItemType>
}

// Tree 컴포넌트 (재귀적으로 트리 렌더링)
const Tree = React.memo(function Tree({
  item,
  setSelectedItem,
  selectedItem,
  isRoot = false, // 최상위 부모인지 확인하는 플래그
}: {
  item: TreeNavGroupItemType
  setSelectedItem: (item: TreeNavGroupItemType) => void
  selectedItem: TreeNavGroupItemType | null
  isRoot?: boolean
}) {
  const { id, title, subItems } = item
  const isLeaf = subItems.length === 0 // 하위 아이템이 없는 경우 확인

  // 하위 아이템이 없는 경우 (Leaf)
  if (isLeaf) {
    return (
      <SidebarMenuButton
        onClick={() => {
          setSelectedItem(item) // 선택된 항목 업데이트
        }}
        className={`data-[active=true]:bg-transparent ${
          selectedItem?.id === id ? 'bg-blue-100 text-blue-600' : ''
        }`}
      >
        <File />
        {title}
      </SidebarMenuButton>
    )
  }

  // 하위 아이템이 있는 경우 (Folder 렌더링)
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

// SubNavGroup 컴포넌트 (최상위 트리 렌더링)
export function SubNavGroup({
  items,
  setSelectedItem,
  selectedItem,
}: {
  items: Array<TreeNavGroupItemType>
  setSelectedItem: (item: TreeNavGroupItemType) => void
  selectedItem: TreeNavGroupItemType | null
}) {
  return (
    <SidebarGroup>
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
  )
}
