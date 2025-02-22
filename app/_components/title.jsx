import React from 'react'

const Title = () => {
    return (
        <div className="relative bg-gradient-to-r backdrop-blur-sm from-indigo-900/50 via-purple-900/50 to-indigo-900/50 border-b-4 border-cyan-500">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-japanese md:text-6xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    METAVFEST 2025
                </h1>
                <p className="text-xl font-semibold mt-4 max-w-2xl text-cyan-100">
                    Your ultimate guide to the anime, gaming & crypto community event
                </p>
            </div>
        </div>
    )
}

export default Title