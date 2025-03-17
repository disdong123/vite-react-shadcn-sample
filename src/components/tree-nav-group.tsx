import { ChevronRight, File, Folder } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SidebarMenuItem, SidebarMenuButton, SidebarMenuSub } from '@/components/ui/sidebar';
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu } from '@/components/ui/sidebar';

interface ItemType {
  title: string
  type: string
  docsUrl: string
  items: Array<ItemType>
}

export function Tree({ item, setSelectedItem }: { item: ItemType, setSelectedItem: (item: ItemType) => void }) {
  if (item.items.length === 0) {
    return (
      <SidebarMenuButton onClick={() => setSelectedItem(item)}>
        <Folder />
        {item.title}
      </SidebarMenuButton>
    )
  }

  // 폴더 렌더링 (재귀 호출)
  return (
    <SidebarMenuItem>
      <Collapsible className='group/collapsible'>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className='transition-transform' />
            {item.title}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items.map((item, index) => {
              return <Tree key={index} item={item} setSelectedItem={setSelectedItem} />
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}

export function SubNavGroup({ items, setSelectedItem }: { items: Array<ItemType>, setSelectedItem: (item: ItemType) => void }) {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item, itemIndex) => (
              <Tree key={itemIndex} item={item} setSelectedItem={setSelectedItem} />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}