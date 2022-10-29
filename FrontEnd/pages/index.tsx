import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.getItem('logged-user')) {
      router.push('/login')
    }
  }, [router])

  const logOut = () => {
    localStorage.clear()
    router.push('/login')
  }
  return (
    <div className='text-4xl'>
      <button onClick={logOut} className='btn'>
        Log out
      </button>
    </div>
  )
}
