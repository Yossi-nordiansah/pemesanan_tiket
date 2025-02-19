import React from 'react';


const Hero = () => {
  return (
    <div className='text-white h-screen bg-gradient-to-b from-black to-secondary flex justify-center'>
        <div className='mt-24 relative w-full'>
            <img src={"images/icon.png"} alt="" className='w-96 mx-auto block mb-4'/>
            <p className='mx-auto text-white text-2xl w-[70%] text-center font-bold'>Surabaya, 10 Mei 2025</p>
            <img src={"images/char1.png"} alt="" className='w-44 absolute left-6 top-1/2 -translate-y-1/2 drop-shadow-[0_0px_5px_#0096CF]'/>
        </div>
    </div>
  )
}

export default Hero