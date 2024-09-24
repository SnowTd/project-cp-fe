import { DataTableDemo } from '@/components/transactions'
import axios from 'axios'

async function getData() {
  const res = await axios
    .get('https://ldbpxndv-3001.asse.devtunnels.ms/order')
    .then((res) => res.data)
  return res.response
}

export default async function Transacions() {
  const data = await getData()
  console.log('data', data)
  return <DataTableDemo data={data} />
}
