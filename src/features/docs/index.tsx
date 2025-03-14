import { useEffect, useState } from 'react'
import { Fragment } from 'react/jsx-runtime';
import { IconSearch } from '@tabler/icons-react';
import { RedocStandalone } from 'redoc';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible.tsx'
import { ScrollArea } from '@/components/ui/scroll-area';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { type Item } from './data/item-types.ts';
import { items } from './data/items.json';
import { ChevronRight } from 'lucide-react'

interface CollapsibleItemProps {
  item: Item;
  renderItems: (items: Item[]) => React.ReactNode;
  selectedItem: Item | null;
  setSelectedItem: (item: Item) => void;
  isOpen: boolean;
  toggleItem: (title: string) => void;
}

export function CollapsibleItem({
  item,
  renderItems,
  selectedItem,
  setSelectedItem,
  isOpen,
  toggleItem,
}: CollapsibleItemProps) {
  const isGroup = item.type === 'group';

  if (isGroup) {
    return (
      <Collapsible open={isOpen} onOpenChange={() => toggleItem(item.title)}>
        <CollapsibleTrigger asChild>
          <button type="button" className="-mx-1 flex w-full items-center rounded-md px-2 py-3 text-left text-sm">
            <span>{item.title}</span>
            <ChevronRight
              className={cn('ml-auto h-4 w-4 transition-transform', isOpen && 'rotate-90')}
            />
          </button>
        </CollapsibleTrigger>

        {isOpen && (
          <CollapsibleContent>
            <div className="ml-4">{renderItems(item.items || [])}</div>
          </CollapsibleContent>
        )}
      </Collapsible>
    );
  }

  return (
    <button
      type="button"
      disabled={!item.docsUrl}
      onClick={() => item.docsUrl && setSelectedItem(item)}
      className={cn(
        '-mx-1 flex w-full rounded-md px-2 py-3 text-left text-sm',
        selectedItem?.title === item.title && 'bg-muted'
      )}
    >
      {item.title}
    </button>
  );
}

export default function Docs() {
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  // 전체 펼치기
  const expandAll = () => {
    const allTitles = new Set<string>();
    const collectTitles = (items: Item[]) => {
      items.forEach((item) => {
        if (item.type === 'group') {
          allTitles.add(item.title);
          collectTitles(item.items || []);
        }
      });
    };
    collectTitles(items);
    setOpenItems(allTitles);
  };

  // 전체 닫기
  const collapseAll = () => setOpenItems(new Set());

  // 개별 항목 열기/닫기 토글
  const toggleItem = (title: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(title)) newSet.delete(title);
      else newSet.add(title);
      return newSet;
    });
  };

  // 검색 필터링
  const filteredItems = items.filter(({ title }) =>
    title.toLowerCase().includes(search.trim().toLowerCase())
  );

  // 렌더링 함수
  const renderItems = (items: Item[]) =>
    items.map((item) => (
      <CollapsibleItem
        key={item.title}
        item={item}
        renderItems={renderItems}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        isOpen={openItems.has(item.title)}
        toggleItem={toggleItem}
      />
    ));

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
          <div className="flex w-full flex-col gap-2 sm:w-56 lg:w-72 2xl:w-80">
            <div className="sticky top-0 z-10 -mx-4 bg-background px-4 pb-3 shadow-md sm:static sm:z-auto sm:mx-0 sm:p-0 sm:shadow-none">
              <div className="flex items-center justify-between py-2">
                <h1 className="text-xl font-bold">All projects</h1>
                <div className="flex gap-2">
                  {/* Expand All Button */}
                  <button
                    onClick={expandAll}
                    className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                  >
                    Expand All
                  </button>

                  {/* Collapse All Button */}
                  <button
                    onClick={collapseAll}
                    className="rounded bg-gray-500 px-3 py-1 text-sm text-white hover:bg-gray-600"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              <label className="flex h-12 w-full items-center rounded-md border border-input pl-2">
                <IconSearch size={15} className="mr-2 stroke-slate-500" />
                <input
                  type="text"
                  placeholder="Search chat..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                />
              </label>
            </div>

            <ScrollArea className="-mx-3 h-full p-3">{renderItems(filteredItems)}</ScrollArea>
          </div>

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

