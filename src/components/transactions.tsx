'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarImage } from './ui/avatar'
import Link from 'next/link'
import TransactionsEdit from './subui/transactions-edit'

// const data: Customer[] = [
//   {
//     uid: 'm5gr84i9',
//     profile: 'https://github.com/shadcn.png',
//     name: 'Ken',
//     subscription: 'true',
//     email: 'ken99@yahoo.com',
//     date: 'YYYY-MM-DD-hh:mm:ss',
//     address: '123 Main St, Anytown, USA',
//     status: 'รอเข้าไปรับ',
//   },
//   {
//     uid: '3u1reuv4',
//     profile: 'https://github.com/shadcn.png',
//     name: 'Abe',
//     subscription: 'true',
//     email: 'Abe45@gmail.com',
//     date: '2004-MM-DD-hh:mm:ss',
//     address: '123 Main St, Anytown, USA',
//     status: 'เข้ารับเรียบร้อย',
//   },
//   {
//     uid: 'derv1ws0',
//     profile: 'https://github.com/shadcn.png',
//     name: 'Monserrat',
//     subscription: 'true',
//     email: 'Monserrat44@gmail.com',
//     date: 'YYYY-MM-DD-hh:mm:ss',
//     address: '123 Main St, Anytown, USA',
//     status: 'รอเข้าไปรับ',
//   },
//   {
//     uid: '5kma53ae',
//     profile: 'https://github.com/shadcn.png',
//     name: 'Silas',
//     subscription: 'true',
//     email: 'Silas22@gmail.com',
//     date: '2022-12-DD-hh:mm:ss',
//     address: '123 Main St, Anytown, USA',
//     status: 'เข้ารับเรียบร้อย',
//   },
//   {
//     uid: 'bhqecj4p',
//     profile: 'https://github.com/shadcn.png',
//     name: 'Carmella',
//     subscription: 'true',
//     email: 'carmella@hotmail.com',
//     date: '2022-11-DD-hh:mm:ss',
//     address: '123 Main St, Anytown, USA',
//     status: 'เสร็จสิ้น',
//   },
//   {
//     uid: 'h9q0n6r4',
//     profile: 'https://github.com/shadcn.png',
//     name: 'Joseph',
//     subscription: 'true',
//     email: 'joseph@gmailcom',
//     date: 'YYYY-MM-DD-hh:mm:ss',
//     address: '123 Main St, Anytown, USA',
//     status: 'เสร็จสิ้น',
//   },
// ]

type Customer = {
  uid: string
  profile: string
  name: string
  subscription: 'true' | 'false'
  date: string
  address: string
  status: 'pending' | 'received' | 'preparing' | 'shipping' | 'delivered'
}

const statusOptions = [
  'pending',
  'receive',
  'preparing',
  'shipping',
  'deliverd',
]
export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'profile',
    header: 'Profile',
    cell: ({ row }) => {
      const profile = row.getValue('profile')

      return (
        <div>
          <Avatar>
            <AvatarImage
              src={profile?.toString()}
              alt='line profile'
            />
          </Avatar>
        </div>
      )
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => <div>{row.getValue('address')}</div>,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          orderDate
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('date')}</div>,
  },
  {
    accessorKey: 'subscription',
    header: 'subscription',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('subscription')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'status',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('status')}</div>
    ),
  },
  {
    accessorKey: 'uid',
    enableHiding: true,
    header: '',
    cell: ({ row }) => {
      return (
        <div className='text-right'>
          <TransactionsEdit row={row} />
        </div>
      )
    },
  },
]

export function DataTableDemo({ data }: { data: Customer[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter name...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              className='ml-auto'>
              Columns <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
