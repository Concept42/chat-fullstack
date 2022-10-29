import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { NextPage } from 'next'

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
  const [selectedAvatar, setSelectedAvatar] = useState('')

  const api = 'https://picsum.photos/v2/list?limit=4'

  useEffect(() => {
    const fetchData = async () => {
      const image = await axios.get(api)
      setRandomAvatars(image.data)
    }
    fetchData()
  }, [])
  console.log(randomAvatars)

  return (
    <div className='flex flex-col gap-10 w-screen h-screen justify-center items-center bg-accent'>
      <h1 className='text-4xl text-black font-bold'>Pick your avatar</h1>
      <ul className='flex gap-10 '>
        {randomAvatars?.map((avatar, index) => {
          return (
            <li className='w-[202px] h-[136px] border-2 border-gray-800  hover' key={index}>
              {<Image src={avatar.download_url} width={200} height={200} alt='avatar' />}
            </li>
          )
        })}
      </ul>
      <button className='flex px-10 py-3 border-2 rounded-xl text-black transition-all duration-300 hover:bg-white'>
        Set Avatar
      </button>
    </div>
  )
}

export default SetAvatar
