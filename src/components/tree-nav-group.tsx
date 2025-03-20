// Tree.tsx (used in SubNavGroup)
import React from 'react'
import { createContext, useState, useContext } from 'react'
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
  SidebarGroupContent,
  SidebarMenu,
} from '@/components/ui/sidebar'

interface CollapseStates {
  [key: number]: boolean
}

interface CollapseStateContextProps {
  collapseStates: CollapseStates
  setCollapseState: (id: number, isOpen: boolean) => void
}

// Create a context to hold the collapse state mapping.
const CollapseStateContext = createContext<
  CollapseStateContextProps | undefined
>(undefined)

export const CollapseStateProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [collapseStates, setCollapseStates] = useState<CollapseStates>({})

  const setCollapseState = (id: number, isOpen: boolean) => {
    setCollapseStates((prev) => ({ ...prev, [id]: isOpen }))
  }

  return (
    <CollapseStateContext.Provider value={{ collapseStates, setCollapseState }}>
      {children}
    </CollapseStateContext.Provider>
  )
}

export const useCollapseState = () => {
  const context = useContext(CollapseStateContext)
  if (!context) {
    throw new Error(
      'useCollapseState must be used within a CollapseStateProvider'
    )
  }
  return context
}

export interface TreeNavGroupItemType {
  id: number
  title: string
  subItems: Array<TreeNavGroupItemType>
}

// Helper function to check recursively if an item or any descendant matches the URL param.
const hasMatchingDescendant = (
  item: TreeNavGroupItemType,
  targetId: number | null
): boolean => {
  if (targetId === null) return false
  if (item.id === targetId) return true
  return item.subItems.some((subItem) =>
    hasMatchingDescendant(subItem, targetId)
  )
}

interface TreeProps {
  item: TreeNavGroupItemType
  setSelectedItem: (item: TreeNavGroupItemType) => void
  selectedItem: TreeNavGroupItemType | null
  isRoot?: boolean
}

const Tree = React.memo(function Tree({
  item,
  setSelectedItem,
  selectedItem,
  isRoot = false,
}: TreeProps) {
  const { id, title, subItems } = item
  const isLeaf = subItems.length === 0

  // Get the target id from the URL.
  const searchParams = new URLSearchParams(window.location.search)
  const paramIdStr = searchParams.get('id')
  const targetId = paramIdStr ? parseInt(paramIdStr) : null

  // Get collapse state from context.
  const { collapseStates, setCollapseState } = useCollapseState()

  // Determine the initial open state:
  // If the collapse state is already stored, use that; otherwise, if the item is root
  // or if any descendant (at any level) matches the target id, default open.
  const initialOpen = isRoot || hasMatchingDescendant(item, targetId)
  const isOpen =
    collapseStates[id] !== undefined ? collapseStates[id] : initialOpen

  if (isLeaf) {
    return (
      <SidebarMenuButton
        onClick={() => setSelectedItem(item)}
        className={selectedItem?.id === id ? 'bg-blue-100 text-blue-600' : ''}
      >
        <File /> {title}
      </SidebarMenuButton>
    )
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className='group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90'
        open={isOpen}
        onOpenChange={(open) => setCollapseState(id, open)}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className='transition-transform' />
            <Folder /> {title}
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
                isRoot={false}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
})

interface SubNavGroupProps {
  items: Array<TreeNavGroupItemType>
  setSelectedItem: (item: TreeNavGroupItemType) => void
  selectedItem: TreeNavGroupItemType | null
}

export function SubNavGroup({
  items,
  setSelectedItem,
  selectedItem,
}: SubNavGroupProps) {
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
              isRoot={true}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
