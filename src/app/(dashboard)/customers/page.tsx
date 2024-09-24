import { DataTableDemo } from '@/components/member'
import axios from 'axios'
async function getData() {
  const urlapi = process.env.BASEURL_API!
  const url = `${urlapi}user`
  const res = await axios.get(url)
  return res.data.response
}

export default async function Customer() {
  const data = await getData()
  return <DataTableDemo data={data} />
}
