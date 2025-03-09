"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const router = useRouter();

  return (
    <div className='fixed bottom-5 items-center md:w-fit w-5/6 px-6 py-2 flex md:gap-28 mx-auto left-1/2 -translate-x-1/2 bg-white/5 rounded-xl border backdrop-blur-md text-white md:justify-center justify-between font-semibold z-20'>
        <a href="#highlights" className='md:block hidden scroll-smooth'>Highlights</a>
        <a href="#partner" className='md:block hidden scroll-smooth'>Partner</a>
        <a href="#faq" className='md:block hidden scroll-smooth'>FAQ</a>
        <img src="/images/burger-menu.svg" alt="Menu" className='w-10 md:hidden'/>
        <button 
          className='p-2 bg-primary rounded-md font-semibold text-nowrap' 
          onClick={() => router.push('/join-partner')}
        >
          Join Partner
        </button>
    </div>
  )
}

export default Navbar;
