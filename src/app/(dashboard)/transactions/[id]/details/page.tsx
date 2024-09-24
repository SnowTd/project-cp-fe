import Details from '@/components/details'

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <div>
        <Details />
      </div>
    </>
  )
}
