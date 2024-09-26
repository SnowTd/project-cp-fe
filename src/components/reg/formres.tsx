'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axios from 'axios'

const formSchema = z.object({
  hidden: z.any(),
  address: z.string().min(1, {
    message: 'กรุณากรอกที่อยู่',
  }),
  phone: z
    .string()
    .min(10, {
      message: 'กรุณากรอกให้ครบ 10 ตัว',
    })
    .max(10, {
      message: 'กรุณากรอกให้ครบ 10 ตัว',
    }),
  name: z.string(),
})

export default function ResForm({
  profile,
  status,
}: {
  profile: any
  status: any
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
      phone: '',
      name: '',
    },
  })

  async function Post(values: z.infer<typeof formSchema>) {
    const { address, phone, name } = values
    const urlapi = process.env.BASEURL_API!
    const url = `${urlapi}register`
    const res = await axios.post('http://localhost:3001/register', {
      userID: profile.userId,
      name,
      phone,
      address,
    })
  }

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    Post(values)
    status(true)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=''>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อ</FormLabel>
              <FormControl>
                <Input
                  placeholder='นาย กอ ขอไข่'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>เบอร์โทร</FormLabel>
              <FormControl>
                <Input
                  placeholder='0894123210'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>ที่อยู่</FormLabel>
              <FormControl>
                <Input
                  placeholder='หอ 200 มอขอไข่'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='mt-4'>
          Submit
        </Button>
      </form>
    </Form>
  )
}
