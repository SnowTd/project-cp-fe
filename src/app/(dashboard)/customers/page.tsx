import Sub from './sub'

export default async function Customer() {
  const urlapi = process.env.BASEURL_API!
  return <Sub url={urlapi} />
}
