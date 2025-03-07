import React from 'react';

const Navtop = () => {
    return (
        <div className='fixed px-3 py-1 flex justify-between w-full z-20'>
            <div className='flex items-center gap-2 '>
                <img src="/images/logometavfest.png" alt="Logo" className='md:w-10 w-6'/>
                <h1 className='text-white font-bold md:text-4xl text-xl'>MetaVFest</h1>
            </div>
            <div className='px-3 py-1 bg-white/5 backdrop-blur-md rounded-2xl md:w-56 '>
                <p className='text-white'>Starting In</p>
                <h1 className='text-white md:text-xl font-semibold'>0D : 0H : 0M</h1>
            </div>
        </div>
    )
}

export default Navtop