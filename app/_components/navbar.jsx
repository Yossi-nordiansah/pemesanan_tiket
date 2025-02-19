import React from 'react'

const Navbar = () => {
  return (
    <div className='fixed bottom-5 items-center px-6 py-2 flex gap-20 mx-auto left-1/2 -translate-x-1/2 bg-white/5 rounded-xl border backdrop-blur-md text-white justify-center font-semibold'>
        <p>Agenda</p>
        <p>Partner</p>
        <p>FAQ</p>
        <button className='p-2 bg-primary rounded-md font-semibold'>Join Partner</button>
    </div>
  )
}

export default Navbar