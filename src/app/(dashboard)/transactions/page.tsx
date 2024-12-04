import Sub from './sub'

export default async function Transacions() {
  const url = process.env.BASEURL_API!
  return <Sub url={url} />
}
