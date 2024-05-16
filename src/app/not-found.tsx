/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Link } from './_ui/link'

export default function NotFound() {
  return (
    <div className='grow flex flex-col items-center justify-center'>
      <p className='text-2xl'>404</p>
      <p>Sorry, the page you are looking for isn't available</p>
      <Link href={'/'} className='p-2 bg-sky-500 text-white rounded-md mt-2'>Go back home</Link>
    </div>
  )
}
