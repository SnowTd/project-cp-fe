'use client'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '../ui/button'
import { CirclePlus } from 'lucide-react'

import { useState } from 'react'

export default function TransactionsEdit({ row }: any) {
  const [item, setItem] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [isAdding, setIsAdding] = useState(false) // state สำหรับแสดง input

  // ฟังก์ชันเพิ่ม task เข้าไปใน Todo List
  const addTask = () => {
    if (input.trim()) {
      setItem([...item, input])
      setInput('') // ล้างค่า input หลังจากเพิ่ม task
      setIsAdding(false) // ซ่อน input หลังจากเพิ่ม task
    }
  }

  // ฟังก์ชันลบ task
  const deleteTask = (index: number) => {
    setItem(item.filter((_, i) => i !== index))
  }

  return (
    <div>
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <div className='mx-auto w-full max-w-sm'>
            <DrawerHeader>
              <DrawerTitle>รายละเอียด</DrawerTitle>
              <DrawerDescription>จัดการ order โดยละเอียด</DrawerDescription>
              <DrawerDescription>
                <p>Name: {row.getValue('name')}</p>
                <p>Address: {row.getValue('address')} </p>
                <p>
                  ประเภทสมาชิก:{' '}
                  {row.getValue('subscription') ? 'สมาชิกรายเดือน' : 'สมาชิก'}
                </p>
                {row.getValue('subscription') ? (
                  <p>ยอดรายเดือนคงเหลือ: </p>
                ) : (
                  ''
                )}
                {/* Render Todo List */}
                <ul>
                  {item.map((task, index) => (
                    <li
                      key={index}
                      className='flex justify-between p-2'>
                      <span>{task}</span>
                      <Button
                        variant='outline'
                        size='icon'
                        className='h-6 w-6'
                        onClick={() => deleteTask(index)}>
                        ❌
                      </Button>
                    </li>
                  ))}
                </ul>
              </DrawerDescription>
            </DrawerHeader>
            <div className='p-4 pb-0'>
              <div className='flex flex-col space-y-2 items-center'>
                {!isAdding && (
                  <Button
                    variant='outline'
                    size='icon'
                    className='h-8 w-8 shrink-0 rounded-full'
                    onClick={() => setIsAdding(true)}>
                    <CirclePlus />
                  </Button>
                )}

                {isAdding && (
                  <div className='flex items-center space-x-2'>
                    <input
                      type='text'
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className='border rounded p-2'
                      placeholder='จำนวน...'
                    />
                    <Button
                      variant='outline'
                      size='icon'
                      className='h-8 w-8 shrink-0 rounded-full'
                      onClick={addTask}>
                      ✔️
                    </Button>
                    <Button
                      variant='outline'
                      size='icon'
                      className='h-8 w-8 shrink-0 rounded-full'
                      onClick={() => setIsAdding(false)}>
                      ❌
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
