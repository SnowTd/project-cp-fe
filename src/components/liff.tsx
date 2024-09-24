'use client'
import { useEffect, useState } from 'react'
import liff from '@line/liff'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRouter, usePathname } from 'next/navigation'
import axios from 'axios'
import path from 'path'

const LiffPage = ({}) => {
  const router = useRouter()
  const [liffError, setLiffError] = useState<string | null>(null)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId: '2006367792-jkgoyNWW' })
        if (liff.isLoggedIn()) {
          const profileData = await liff.getProfile()
          setProfile(profileData)
          await sendProfileToBackend(profileData)
        } else {
          liff.login()
        }
      } catch (error) {
        setLiffError('LIFF Initialization failed: ' + (error as Error).message)
        router.refresh()
      }
    }

    initializeLiff()
  }, [])

  const sendProfileToBackend = async (profileData: any) => {
    const urlapi = process.env.BASEURL_API!
    const url = `${urlapi}user`
    try {
      const response = await axios.post('http://localhost:3001/user', {
        userId: profileData.userId,
        displayName: profileData.displayName,
        pictureUrl: profileData.pictureUrl,
      })
      console.log(response.data)
      console.log('Profile sent to backend:', response.data)
    } catch (error) {
      console.error('Failed to send profile to backend:', error)
    }
  }
  const pathname = usePathname()

  return (
    <div>
      {liffError ? (
        <p>{liffError}</p>
      ) : profile ? (
        <button
          onClick={() => {
            liff.logout()
            router.refresh()
          }}>
          <Avatar
            className={
              pathname === '/register'
                ? 'w-32 h-32 mt-2 justify-center flex'
                : ''
            }>
            <AvatarImage src={profile.pictureUrl} />
            <AvatarFallback>{profile.displayName}</AvatarFallback>
          </Avatar>
          {pathname === '/register' ? (
            <p className='mt-2 text-center'>{profile.displayName}</p>
          ) : (
            ''
          )}
        </button>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default LiffPage
