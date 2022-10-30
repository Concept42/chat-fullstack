import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { allUsersRoute } from '../lib/APIRoutes'
import type { Contact, User } from '../lib/Types'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatBox from '../components/ChatBox'

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [currentUser, setCurrentUser] = useState<User>({})
  const [currentChat, setCurrentChat] = useState<Contact>()

  const router = useRouter()

  useEffect(() => {
    const localUser = localStorage.getItem('logged-user')
    const setLoggedUser = async () => {
      if (typeof localUser === 'string') {
        const parse = await JSON.parse(localUser)
        setCurrentUser(parse)
        if (parse.isAvatarImageSet === false) {
          router.push('/setAvatar')
        }
      }
    }
    if (localUser) {
      setLoggedUser()
    } else {
      router.push('/login')
    }
  }, [router])

  useEffect(() => {
    const getAllUsers = async () => {
      const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
      setContacts(data.data)
    }
    if (currentUser?.isAvatarImageSet) {
      getAllUsers()
    }
  }, [currentUser, router])

  const handleChatChage = (chat: Contact) => {
    setCurrentChat(chat)
    console.log(currentChat)
  }

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center mx-auto'>
      <div className='container h-[85vh] bg-neutral grid grid-cols-[25%,75%] md:grid-cols-[35%,65%] '>
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChage} />
        {!currentChat ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatBox currentChat={currentChat} currentUser={currentUser} />
        )}
      </div>
    </div>
  )
}
