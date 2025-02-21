import React from 'react';
import { FaLocationDot } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className='text-white lg:h-screen py-10 bg-gradient-to-b from-black/5 to-secondary/55 flex justify-center'>
        <div className='sm:mt-16 mt-20 relative w-full'>
            <img src={"images/icon.png"} alt="" className='lg:w-[450px] md:w-[400px] w-80 mx-auto block mb-4 drop-shadow-[0_0px_5px_#0096CF]'/>
            <p className='px-4 rounded-md sm:text-4xl sm:mb-2 mb-4 text-3xl bg-gradient-to-t from-purple-500 to-cyan-400 bg-clip-text text-transparent text-center font-bold font-radjdhani_bold'>MetaVFest - The Future of Web3 & Blockchain in Surabaya</p>
            <p className='px-4 text-center font-radjdhani_semibold sm:text-xl'>"Explore. Learn. Network. Experience the World of Crypto, Metaverse, and Innovation."</p>
            <p className='px-4 text-center font-radjdhani_semibold sm:text-xl mt-10'>Balai Pemuda Surabaya <FaLocationDot className='inline text-red-700'/> | 10 Mei 2025</p>
           
            {/* <img src={"images/char1.png"} alt="" className='w-44 absolute left-6 top-1/2 -translate-y-1/2 drop-shadow-[0_0px_5px_#0096CF]'/> */}
        </div>
    </div>
  )
}

export default Hero
