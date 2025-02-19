import React from 'react';

const Navtop = () => {
    return (
        <div className='fixed px-4 py-2 flex justify-between w-full'>
            <div className='flex items-center gap-2 '>
                <img src="/images/logometavfest.png" alt="Logo" className='w-10'/>
                <h1 className='text-white font-bold text-4xl'>MetaVFest</h1>
            </div>
            <div className='px-3 py-2 bg-white/5 backdrop-blur-md rounded-2xl w-56'>
                <p className='text-white'>Event Date</p>
                <h1 className='text-white text-xl font-semibold'>10 Mei 2025</h1>
            </div>
        </div>
    )
}

export default Navtop