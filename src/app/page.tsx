import Image from 'next/image'
import liff from '@line/liff'
import LiffPage from '@/components/liff'
export default function Home() {
  const url = process.env.BASEURL_API!
  const liffid = process.env.LIFF_ID!
  return (
    <LiffPage
      url={url}
      liffid={liffid}
    />
  )
}
