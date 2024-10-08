'use client'
import Link from 'next/link'
import { Home, PowerIcon } from 'lucide-react'
import NavLinks from './nav-link'
import LiffPage from './liff'
export default function SideNav() {
  return (
    <div className='flex h-full flex-col px-3 py-4 md:px-2 border-r border-gray-200'>
      <Link
        className='mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-20'
        href='/'>
        <div className='w-32 text-white md:w-40 flex'>
          <Home />
          <p className='font-bold text-xl ml-2 items-center justify-center flex'>
            readShirt
          </p>
        </div>
      </Link>
      <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
        <NavLinks />
        <div className='hidden h-auto w-full grow rounded-md bg-gray-50 md:block'></div>
        <div className='flex justify-center items-center'>
          <LiffPage />
        </div>
      </div>
    </div>
  )
}
