import Register from '@/components/reg/register'

export default function Page() {
  const url = process.env.BASEURL_API!
  const liffid = process.env.LIFF_ID!
  return (
    <Register
      url={url}
      liffid={liffid}
    />
  )
}
