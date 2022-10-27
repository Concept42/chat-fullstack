import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { usersRoute } from '../../lib/APIRoutes'

interface User {
  id: string
  username: string
  email: string
  password: string
  isAvatarImageSet: boolean
  avatarImage: string
}

export async function getServerSideProps() {
  const { data } = await axios.get(usersRoute)
  return {
    props: {
      users: data,
    },
  }
}
interface Users {
  users?: User[] | undefined
}

const Profile = ({ users }: Users) => {
  const [dbUsers, setDbUsers] = useState<User>()

  return (
    <div>
      {users?.map((user) => {
        return <h1 key={user.id}>{user.username}</h1>
      })}
    </div>
  )
}

export default Profile
