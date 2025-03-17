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

function Tree({ item, setSelectedItem }: { item: ItemType; setSelectedItem: (item: ItemType) => void }) {
  const { title, items = [] } = item; // 구조 분해로 title과 items 추출
  const isLeaf = items.length === 0; // 하위 아이템이 없는 경우 확인

  // 하위 아이템이 없는 경우
  if (isLeaf) {
    return (
      <SidebarMenuButton
        onClick={() => setSelectedItem(item)} // 클릭 시 선택된 항목 업데이트
        className="data-[active=true]:bg-transparent"
      >
        <File />
        {title}
      </SidebarMenuButton>
    );
  }

  // 하위 아이템이 있는 경우 (폴더 렌더링)
  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        // defaultOpen={title === "components" || title === "ui"} // 기본 열림 조건
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className="transition-transform" />
            <Folder />
            {title}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((subItem, index) => (
              <Tree key={index} item={subItem} setSelectedItem={setSelectedItem} /> // 고유한 key 사용
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}


export function SubNavGroup({ items, setSelectedItem }: { items: Array<ItemType>; setSelectedItem: (item: ItemType) => void }) {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <Tree key={item.title} item={item} setSelectedItem={setSelectedItem} /> // 고유한 key 사용
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
