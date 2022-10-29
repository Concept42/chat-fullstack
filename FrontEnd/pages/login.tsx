import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../lib/formValidation'
import axios, { AxiosResponse } from 'axios'
import { loginRoute } from '../lib/APIRoutes'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'
import { useEffect } from 'react'

interface Login {
  email: string
  password: string
}

const Login: NextPage = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: yupResolver(loginSchema),
  })

  useEffect(() => {
    if (localStorage.getItem('logged-user')) {
      router.push('/')
    }
  }, [router])

  const loginUser = handleSubmit(async (data) => {
    try {
      const { email, password } = data
      const userData = await axios.post(loginRoute, {
        email: email,
        password: password,
      })
      console.log(userData)
      if (userData.data.status === false) {
        console.log(userData.data.status.msg)
        toast.error(userData.data.msg)
      } else {
        localStorage.setItem('logged-user', JSON.stringify(userData.data))
        router.push('/')
      }
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <div className='flex justify-center items-center w-screen h-screen bg-accent '>
      <Toaster />

      <div className='flex flex-col  items-center bg-white rounded-xl shadow-xl min-w-[300px] max-w-[300] md:min-w-[500px] h-fit py-10 '>
        <h1 className=' text-2xl md:text-4xl text-accent font-bold'>Log in</h1>
        <div className='flex  flex-col gap-8 w-full px-10 py-10 md:px-20 md:py-10 text-black '>
          <div>
            <input
              {...register('email')}
              type='email'
              placeholder='Email'
              className={
                errors.email
                  ? 'input w-full input-error bg-slate-200  text-black placeholder:text-slate-500'
                  : ' input w-full  bg-slate-200  text-black placeholder:text-slate-500'
              }
            />
            {errors.email && <p className='text-error text-sm '>{errors.email.message}</p>}
          </div>
          <div>
            <input
              className={
                errors.password
                  ? 'input w-full input-error bg-slate-200  text-black placeholder:text-slate-500'
                  : ' input w-full  bg-slate-200  text-black placeholder:text-slate-500'
              }
              {...register('password')}
              type='password'
              placeholder='Password'
            />
            {errors.password && <p className='text-error text-sm '>{errors.password.message}</p>}
          </div>
        </div>
        <button onClick={loginUser} className='btn btn-accent border-2 rounded-2xl px-20'>
          Login
        </button>
        <div className='flex flex-col justify-center items-center'>
          <h3 className='mt-5 text-black'>DONT HAVE AN ACCOUNT? </h3>
          <Link href={'/register'} className='text-accent cursor-pointer'>
            REGISTER
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
