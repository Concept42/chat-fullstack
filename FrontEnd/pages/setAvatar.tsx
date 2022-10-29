import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { NextPage } from 'next'
import { setAvatarRoute } from '../lib/APIRoutes'
import { userAgent } from 'next/server'
import { useRouter } from 'next/router'
import { parse } from 'path'

interface Image {
  id: string
  author: string
  download_url: string
  height: number
  width: number
  url: string
}
const SetAvatar: NextPage = () => {
  const [randomAvatars, setRandomAvatars] = useState<Image[]>([])
  const [selectedAvatar, setSelectedAvatar] = useState(0)

  const router = useRouter()

  const api = 'https://picsum.photos/v2/list?limit=4'

  useEffect(() => {
    const fetchData = async () => {
      const image = await axios.get(api)
      setRandomAvatars(image.data)
    }

    fetchData()
  }, [])

  useEffect(() => {
    const localUser = localStorage.getItem('logged-user')
    if (typeof localUser === 'string') {
      const parse = JSON.parse(localUser)
      if (parse.isAvatarImageSet === true) {
        router.push('/')
      }
    }
    if (!localUser) {
      router.push('/login')
    }
  }, [router])

  const setAvatar = async () => {
    const localUser = localStorage.getItem('logged-user')
    if (typeof localUser === 'string') {
      const parse = JSON.parse(localUser)
      const { data } = await axios.post(`${setAvatarRoute}/${parse._id}`, {
        image: randomAvatars[selectedAvatar].url,
      })

      if (data.isSet) {
        parse.isAvatarImageSet = true
        parse.avatarImage = data.image
        localStorage.setItem('logged-user', JSON.stringify(parse))
        router.push('/')
      }
    }
  }

  return (
    <div className='flex flex-col gap-10 w-screen h-screen justify-center items-center bg-accent'>
      <h1 className='text-4xl text-black font-bold'>Pick your avatar</h1>
      <ul className='flex gap-10 '>
        {randomAvatars?.map((avatar, index) => {
          return (
            <li
              className={
                selectedAvatar === index
                  ? 'flex justify-center items-center w-[202px] h-[136px] border-[5px] border-red-800 '
                  : 'flex justify-center items-center w-[202px] h-[136px] border-2 border-gray-800 '
              }
              key={index}
            >
              {
                <Image
                  onClick={() => {
                    setSelectedAvatar(index)
                    console.log(selectedAvatar)
                  }}
                  src={avatar.download_url}
                  width={200}
                  height={200}
                  alt='avatar'
                />
              }
            </li>
          )
        })}
      </ul>
      <button
        onClick={setAvatar}
        className='flex px-10 py-3 border-2 rounded-xl text-black transition-all duration-300 hover:bg-white'
      >
        Set Avatar
      </button>
    </div>
  )
}

export default SetAvatar
