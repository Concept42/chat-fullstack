import React, { useEffect, useState } from 'react'
import { Contact, User } from '../lib/Types'
import Image from 'next/image'
import { MdOutlineClose } from 'react-icons/Md'
import ChatInput from './ChatInput'
import axios from 'axios'
import { getAllMessagesRoute, sendMessageRoute } from '../lib/APIRoutes'
import SentMessage from './SentMessage'

interface Props {
  currentChat?: Contact | undefined
  currentUser?: User | undefined
}

interface Message {
  fromtSelf: boolean
  message: string
}

const ChatBox = ({ currentChat, currentUser }: Props) => {
  const [messages, setMessages] = useState([])

  const handleSendMsg = async (msg: string) => {
    await axios.post(sendMessageRoute, {
      from: currentUser?._id,
      to: currentChat?._id,
      message: msg,
    })
  }

  useEffect(() => {
    const getChatMessesages = async () => {
      const response = await axios.post(getAllMessagesRoute, {
        from: currentUser?._id,
        to: currentChat?._id,
      })
      setMessages(response.data)
    }

    getChatMessesages()
  }, [currentChat])
  console.log(messages)

  return (
    <div className='flex flex-col relative overflow-y-scroll'>
      <div className=' flex justify-between items-center bg-base-300 absolute top-0 w-full h-20 '>
        <div className='flex gap-5 justify-center items-center'>
          <div className='ml-5 w-10 h-10 relative '>
            <Image alt='avatar' src={currentChat?.avatarImage} fill />
          </div>
          <h3 className='text-2xl text-accent'>{currentChat?.username}</h3>
        </div>
        <div className='mr-5 hover:text-accent'>
          <MdOutlineClose size={40} />
        </div>
      </div>
      <div className='flex flex-col gap-5 overflow-y-scroll w-full h-full py-10'>
        {messages.map((message, index) => {
          return (
            <div className='flex w-full h-full ' key={index}>
              <div
                className={`flex items-center px-5  w-full h-full text-white ${
                  message?.fromSelf ? 'justify-end ' : 'justify-start w-[40%] '
                }`}
              >
                <div
                  className={`px-4 py-2 max-w-[70%] rounded-3xl break-words ${
                    message?.fromSelf ? 'bg-blue-500' : 'bg-green-500'
                  }`}
                >
                  {message?.message}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  )
}

export default ChatBox
