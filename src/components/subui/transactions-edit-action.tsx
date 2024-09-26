'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import { set, useForm } from 'react-hook-form'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { toast } from '../../hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '../ui/input'
import axios from 'axios'

const languages = [
  { label: 'shirtLong', value: 'shirtLong' },
  { label: 'shirtShort', value: 'shirtShort' },
  { label: 'tshirtLong', value: 'tshirtLong' },
  { label: 'tshirtShort', value: 'tshirtShort' },
  { label: 'pantsLong', value: 'pantsLong' },
  { label: 'pantsShort', value: 'pantsShort' },
  { label: 'jeans', value: 'jeans' },
  { label: 'skirtLong', value: 'skirtLong' },
  { label: 'skirtShort', value: 'skirtShort' },
  { label: 'dressLong', value: 'dressLong' },
  { label: 'dress', value: 'dress' },
  { label: 'dryDress', value: 'dryDress' },
  { label: 'suit', value: 'suit' },
  { label: 'towel', value: 'towel' },
  { label: 'quiltSmall', value: 'quiltSmall' },
  { label: 'quiltLarge', value: 'quiltLarge' },
  { label: 'bedsheetSmall', value: 'bedsheetLarge' },
  { label: 'beddingSmall', value: 'beddingSmall' },
  { label: 'beddingMedium', value: 'beddingMedium' },
  { label: 'beddingLarge', value: 'beddingLarge' },
  { label: 'beddingExtraLarge', value: 'beddingExtraLarge' },
  { label: 'doormat', value: 'doormat' },
  { label: 'handTowel', value: 'handTowel' },
  { label: 'faceTowel', value: 'faceTowel' },
  { label: 'underwear', value: 'underwear' },
  { label: 'socks', value: 'socks' },
] as const

const FormSchema = z.object({
  type: z.string({
    required_error: 'Please select a type.',
  }),
  amount: z.string().min(1, { message: 'Please enter a valid amount.' }),
})

export function ComboboxForm({ item, setItem, setInput, setIsAdding }: any) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function Post(data: any) {
    const { type, amount } = data
    const num = Number(amount)
    const res = await axios
      .post('https://5f0a-202-28-119-90.ngrok-free.app/order', {
        type,
        num,
      })
      .then((res) => res.data)
    return res
  }
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setItem([...item, data])
    setInput('')
    setIsAdding(false)
    console.log(item)
    console.log(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex-none justify-center'>
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Type</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'w-[200px] justify-between',
                        !field.value && 'text-muted-foreground'
                      )}>
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : 'Select type'}
                      <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  <Command>
                    <CommandInput placeholder='Search type...' />
                    <CommandList>
                      <CommandEmpty>No type found.</CommandEmpty>
                      <CommandGroup>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue('type', language.value)
                            }}>
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                language.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {language.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>จำนวน</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='99'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          variant={'outline'}
          className='flex justify-center mt-1 w-full'>
          add
        </Button>
      </form>
    </Form>
  )
}
