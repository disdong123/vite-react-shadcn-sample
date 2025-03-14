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
  openAll: boolean; // 추가
}

export function CollapsibleItem({
                                  item,
                                  renderItems,
                                  selectedItem,
                                  setSelectedItem,
                                  openAll,
                                }: CollapsibleItemProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(openAll);
  }, [openAll]);

  const isGroup = item.type === 'group';

  if (isGroup) {
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className={cn(
              '-mx-1 flex w-full items-center justify-between rounded-md px-2 py-3 text-left text-sm'
            )}
          >
            <div className="flex items-center gap-2 w-full">
              <span className="font-medium">{item.title}</span>
              <ChevronRight
                className={cn(
                  'h-4 w-4 ml-auto transition-transform duration-200',
                  open && 'rotate-90'
                )}
              />
            </div>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="ml-4">
            {renderItems(item.items || [])}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <button
      type="button"
      className={cn(
        '-mx-1 flex w-full rounded-md px-2 py-3 text-left text-sm',
        selectedItem?.title === item.title && 'sm:bg-muted'
      )}
      onClick={() => {
        if (item.docsUrl !== null) {
          setSelectedItem(item);
        }
      }}
      disabled={item.docsUrl === null}
    >
      <div className="flex gap-2 w-full">
        <span className="font-medium">{item.title}</span>
      </div>
    </button>
  );
}

export default function Docs() {
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [openAll, setOpenAll] = useState<boolean>(false); // 추가

  const filteredItems = items.filter(({ title }) =>
    title.toLowerCase().includes(search.trim().toLowerCase())
  );

  const renderItems = (items: Item[]) => {
    return items.map((item) => (
      <Fragment key={item.title}>
        <CollapsibleItem
          item={item}
          renderItems={renderItems}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          openAll={openAll} // 추가
        />
      </Fragment>
    ));
  };

  return (
    <>
      {/* ===== Top Heading ===== */}
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
                <div className="flex gap-2">
                  <h1 className="text-2xl font-bold">All projects</h1>
                </div>

                {/* 전체 펼치기/닫기 버튼 추가 */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setOpenAll(true)}
                    className="rounded bg-primary px-3 py-1 text-sm text-white"
                  >
                    Expand All
                  </button>
                  <button
                    onClick={() => setOpenAll(false)}
                    className="rounded bg-secondary px-3 py-1 text-sm text-white"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              <label className="flex h-12 w-full items-center space-x-0 rounded-md border border-input pl-2 focus-within:outline-none focus-within:ring-1 focus-within:ring-ring">
                <IconSearch size={15} className="mr-2 stroke-slate-500" />
                <span className="sr-only">Search</span>
                <input
                  type="text"
                  className="w-full flex-1 bg-inherit text-sm focus-visible:outline-none"
                  placeholder="Search chat..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
            </div>

            <ScrollArea className="-mx-3 h-full p-3">{renderItems(filteredItems)}</ScrollArea>;
          </div>

          {/* Right Side */}
          {selectedItem ? (
            <RedocStandalone
              specUrl={selectedItem.docsUrl}
              options={{
                nativeScrollbars: true,
                theme: { colors: { primary: { main: '#dd5522' } } },
              }}
            />
          ) : (
            <div
              className={cn(
                'absolute inset-0 left-full z-50 hidden w-full flex-1 flex-col justify-center rounded-md border bg-primary-foreground shadow-sm transition-all duration-200 sm:static sm:z-auto sm:flex'
              )}
            >
              <div className="flex flex-col items-center space-y-6">
                <div className="space-y-2 text-center">
                  <h1 className="text-xl font-semibold">API Docs use redoc</h1>
                  <p className="text-sm text-gray-400">API Docs use redoc</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </Main>
    </>
  );
}
