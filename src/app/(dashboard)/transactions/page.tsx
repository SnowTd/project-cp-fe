import { DataTableDemo } from '@/components/transactions'
import axios from 'axios'

async function getData() {
  const url = process.env.BASEURL_API!
  const res = await axios.get(`${url}order`).then((res) => res.data)
  return res.response
}

export default async function Transacions() {
  const data = await getData()

  return <DataTableDemo data={data} />
}
