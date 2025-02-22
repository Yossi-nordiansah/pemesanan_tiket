"use client"
import React from 'react'

const Navbar = () => {
  return (
    <div className='fixed bottom-5 items-center md:w-fit w-5/6 px-6 py-2 flex md:gap-28 mx-auto left-1/2 -translate-x-1/2 bg-white/5 rounded-xl border backdrop-blur-md text-white md:justify-center justify-between font-semibold z-20'>
        <p className='md:block hidden'>Agenda</p>
        <p className='md:block hidden'>Partner</p>
        <p className='md:block hidden'>FAQ</p>
        <img src="/images/burger-menu.svg" alt="" className='w-10 md:hidden'/>
        <button className='p-2 bg-primary rounded-md font-semibold text-nowrap'>Join Partner</button>
    </div>
  )
}

export default Navbar;