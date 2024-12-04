import SideNav from '../../components/sidenav'

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const url = process.env.BASEURL_API!
  const liffid = process.env.LIFF_ID!
  return (
    <div>
      <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
        <div className='w-full flex-none md:w-64'>
          <SideNav
            url={url}
            liffid={liffid}
          />
        </div>
        <div className='flex-grow p-6 md:overflow-y-auto md:p-12'>
          {children}
        </div>
      </div>
    </div>
  )
}
