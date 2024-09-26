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
import axios from 'axios'

import { useEffect, useState } from 'react'
import { ComboboxForm } from './transactions-edit-action'
import FormSub from './formsub'

export default function TransactionsEdit({ row, type }: any) {
  const [item, setItem] = useState<any>([])
  const [input, setInput] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [orderID, setOrderID] = useState<any>()
  const [amount, setAmount] = useState(0)

  // console.log(item)
  useEffect(() => {
    if (type.length > 0) {
      setItem(type)
    }

    if (type.length > 0) {
      setOrderID(type[0].orderID)
      console.log(orderID)
    }

    if (item.length > 0) {
      setOrderID(row.getValue('order'))
    }
    console.log('use')
  }, [item.length])

  async function Check() {
    if (row.getValue('subscription')) {
      const user = row.getValue('uid')
      if (user) {
        const res = await axios
          .get(`https://5f0a-202-28-119-90.ngrok-free.app/sub/${user}`)
          .then((res) => res.data)
      }
    }
  }
  async function Post(data: any) {
    data.map(async (item: any) => {
      if (item.id === undefined) {
        const num = Number(item.amount)
        const res = await axios.post(
          `https://5f0a-202-28-119-90.ngrok-free.app/${orderID}`,
          {
            type: item.type,
            amount: num,
          }
        )
      }
    })
  }

  const addTask = () => {
    if (input.trim()) {
      setItem([...item, input])
      setInput('')
      setIsAdding(false)
    }
  }

  // ฟังก์ชันลบ task
  const deleteTask = async (index: number, id: any) => {
    if (id !== undefined) {
      const res = await axios
        .delete(`https://5f0a-202-28-119-90.ngrok-free.app/type/${orderID}`, {
          data: {
            typeid: id,
          },
        })
        .then((res) => res.data)
      setItem(item.filter((_: any, i: number) => i !== index))
      console.log(res)
    }
    setItem(item.filter((_: any, i: number) => i !== index))
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
                  ประเภทสมาชิก:
                  {row.getValue('subscription') ? 'สมาชิกรายเดือน' : 'สมาชิก'}
                </p>
                {row.getValue('subscription') ? (
                  <>
                    <p>ยอดรายเดือนคงเหลือ: </p>
                    <span> จำนวนใน order : {amount!}</span>
                  </>
                ) : (
                  ''
                )}
                <ul>
                  {item.length > 0 ? (
                    item.map((e: any, index: number) => (
                      <li
                        key={e.id}
                        className='flex justify-between p-2'>
                        <span>
                          {e.type} (Amount: {e.amount})
                        </span>
                        <Button
                          variant='outline'
                          size='icon'
                          className='h-6 w-6'
                          onClick={() => deleteTask(index, e.id)}>
                          ❌
                        </Button>
                      </li>
                    ))
                  ) : (
                    <li>No items found</li>
                  )}
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
                    {row.getValue('subscription') ? (
                      <FormSub setAmount={setAmount} />
                    ) : (
                      <ComboboxForm
                        item={item}
                        setItem={setItem}
                        setInput={setInput}
                        setIsAdding={setIsAdding}
                      />
                    )}
                    {/* <input
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
                    </Button> */}
                  </div>
                )}
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button onClick={() => Post(item)}>Submit</Button>
              </DrawerClose>
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
