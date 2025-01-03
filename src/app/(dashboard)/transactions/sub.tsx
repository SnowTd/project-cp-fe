'use client'

import axios from 'axios'
import { DataTableDemo } from '@/components/transactions'
import { useEffect, useState } from 'react'

export default function Sub({ url }: { url: string }) {
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get(`${url}order`)
      .then((res) => setData(res.data.response))
      .catch((ee) => console.log(ee))
  }, [])
  return <DataTableDemo data={data} />
}
