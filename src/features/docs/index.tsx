import { useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { IconSearch } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { type Item } from './data/chat-types';
import { items } from './data/items.json';


export default function Chats() {
  const [search, setSearch] = useState('')
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  // Filtered data based on the search query
  const filteredItems = items.filter(({ title }) =>
    title.toLowerCase().includes(search.trim().toLowerCase())
  )

  const renderItems = (items: ItemType[]) => {
    return items.map((item) => {
      if (item.type === "project") return null;

      return (
        <Fragment key={item.title}>
          <button
            type="button"
            className={cn(
              `-mx-1 flex w-full rounded-md px-2 py-2 text-left text-sm hover:bg-secondary/75`,
              selectedItem?.title === item.title && "sm:bg-muted"
            )}
            onClick={() => {
              setSelectedItem(item);
            }}
          >
            <div className="flex gap-2">
              <div>
              <span className="col-start-2 row-span-2 font-medium">
                {item.title}
              </span>
                <span className="col-start-2 row-span-2 row-start-2 line-clamp-2 text-ellipsis text-muted-foreground">
                {item.title}
              </span>
              </div>
            </div>
          </button>
          <Separator className="my-1" />
          {item.items && item.items.length > 0 && (
            <div className="ml-4">{renderItems(item.items)}</div>
          )}
        </Fragment>
      );
    });
  };


  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <section className='flex h-full gap-6'>
          {/* Left Side */}
          <div className='flex w-full flex-col gap-2 sm:w-56 lg:w-72 2xl:w-80'>
            <div className='sticky top-0 z-10 -mx-4 bg-background px-4 pb-3 shadow-md sm:static sm:z-auto sm:mx-0 sm:p-0 sm:shadow-none'>
              <div className='flex items-center justify-between py-2'>
                <div className='flex gap-2'>
                  <h1 className='text-2xl font-bold'>Groups</h1>
                </div>
              </div>

              <label className='flex h-12 w-full items-center space-x-0 rounded-md border border-input pl-2 focus-within:outline-none focus-within:ring-1 focus-within:ring-ring'>
                <IconSearch size={15} className='mr-2 stroke-slate-500' />
                <span className='sr-only'>Search</span>
                <input
                  type='text'
                  className='w-full flex-1 bg-inherit text-sm focus-visible:outline-none'
                  placeholder='Search chat...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
            </div>

            <ScrollArea className="-mx-3 h-full p-3">{renderItems(filteredItems)}</ScrollArea>;

          </div>

          {/* Right Side */}
          {selectedItem ? (
            <Table>
              <TableCaption>A list of projects</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">project name</TableHead>
                  <TableHead className="text-right">service type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  selectedItem.items.map((item: Item) => {
                    return (
                      <TableRow>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell className="text-right">server</TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          ) : (
            <div
              className={cn(
                'absolute inset-0 left-full z-50 hidden w-full flex-1 flex-col justify-center rounded-md border bg-primary-foreground shadow-sm transition-all duration-200 sm:static sm:z-auto sm:flex',
              )}
            >
              <div className="flex flex-col items-center space-y-6">
                <div className="space-y-2 text-center">
                  <h1 className="text-xl font-semibold">API Docs use redoc</h1>
                  <p className="text-sm text-gray-400">
                    API Docs use redoc
                  </p>
                </div>
              </div>
            </div>

          )}
        </section>
      </Main>
    </>
  )
}
