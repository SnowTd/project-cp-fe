import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
const formSchema = z.object({
  amount: z.number().min(1).max(100),
})
export default function FormSub({ setAmount }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setAmount(values)
    console.log()
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=''>
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>จำนวน</FormLabel>
              <FormControl>
                <Input
                  placeholder='99'
                  type='number'
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
