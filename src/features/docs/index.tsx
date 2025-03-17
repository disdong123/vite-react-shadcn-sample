import { useEffect, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { IconSearch } from '@tabler/icons-react';
import { ChevronRight } from 'lucide-react';
import { RedocStandalone } from 'redoc';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible.tsx';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarContent } from '@/components/ui/sidebar.tsx';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { type Item } from './data/item-types.ts'
import { items } from './data/items.json';
import { SubNavGroup } from '@/components/tree-nav-group.tsx'


interface CollapsibleItemProps {
  item: Item;
  renderItems: (items: Item[]) => React.ReactNode;
  selectedItem: Item | null;
  setSelectedItem: (item: Item) => void;
  isOpen: boolean;
  toggleItem: (title: string) => void;
}

export default function Docs() {
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  return (
    <>
      <Header>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <section className="flex h-full gap-6">
          {/* Left Side */}
          <SidebarContent>
            <SubNavGroup items={items} setSelectedItem={setSelectedItem} />
          </SidebarContent>

          {/* Right Side */}
          {selectedItem ? (
            // RedocStandalone with scrollable container
            <div className="flex flex-col flex-1 overflow-y-auto">
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
            <div className="flex flex-col items-center justify-center flex-1 rounded-md border bg-primary-foreground shadow-sm overflow-y-auto">
              <h1 className="text-xl font-semibold">API Docs use redoc</h1>
              <p className="text-sm text-gray-400">API Docs use redoc</p>
            </div>
          )}
        </section>
      </Main>
    </>
  );
}
