'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { DataTableDemo } from '@/components/member'

export default function Sub({ url }: { url: string }) {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(`${url}user`).then((res) => setData(res.data.response))
  }, [])
  return <DataTableDemo data={data} />
}
