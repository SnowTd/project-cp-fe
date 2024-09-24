'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ResForm from './formres'
import LiffClient from '../liffclient'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Already from './already'

interface Profile {
  userId: string
  displayName: string
  pictureUrl: string
  statusMessage: string
}
export default function Register() {
  const [profile, setProfile] = useState<Profile>()
  const [status, setStatus] = useState()
  console.log(profile)
  useEffect(() => {
    async function Check() {
      const res = await axios
        .get(
          `https://34f8-49-48-109-192.ngrok-free.app/register/${profile?.userId}`
        )
        .then((res) => res.data)
      setStatus(res.data)
    }

    Check()
  }, [profile])

  return (
    <div
      className='  min-h-screen bg-cover bg-center  bg-no-repeat'
      style={{ backgroundImage: "url('/bg-img.png')" }}>
      <div className='backdrop-blur-sm  bg-white/30 rounded-lg h-screen'>
        <div>
          <div className='flex justify-center '>
            <div>
              <p className='font-bold text-xl text-center mt-4'>
                Register Form
              </p>
              <LiffClient data={setProfile} />
            </div>
          </div>
          <div className='flex justify-center'>
            {!status ? (
              <ResForm
                profile={profile}
                status={setStatus}
              />
            ) : (
              <Already />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
