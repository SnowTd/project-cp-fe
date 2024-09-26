import { DataTableDemo } from '@/components/transactions'
import axios from 'axios'

async function getData() {
  const res = await axios
    .get('https://api.sniw.me/order')
    .then((res) => res.data)
  return res.response
}

export default async function Transacions() {
  const data = await getData()

  return <DataTableDemo data={data} />
}
