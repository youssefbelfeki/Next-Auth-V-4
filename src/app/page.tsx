import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  return (
    <section>
      <h1 className='text-slate-800 font-bold text-5xl '>
        HomePage
      </h1>
    <div className='text-center mt-7'>
      <Link className='text-blue-800 underline text-2xl rounded-lg' href="/login">
        Go to Login Page
      </Link>
    </div>
    </section>
  )
}

export default HomePage