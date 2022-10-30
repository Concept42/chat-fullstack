import React from 'react'

interface Props {
  message: string
}

const SentMessage = ({ message }: Props) => {
  return <div className='flex w-fit h-fit overflow-auto max-w-[200px] p-5 rounded-3xl '>{message}</div>
}

export default SentMessage
