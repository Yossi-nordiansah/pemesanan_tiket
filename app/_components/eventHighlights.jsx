"use client"
import React from 'react';
import { FaMicrophoneAlt, FaGamepad, FaChalkboardTeacher, FaBuilding, FaHandshake } from 'react-icons/fa';

const EventHighlights = () => {
    const highlights = [
        { 
            title: "Konferensi", 
            description: "Talkshow, keynote speakers tentang Web3 & Blockchain.", 
            icon: <FaMicrophoneAlt className="text-4xl text-indigo-500" /> 
        },
        { 
            title: "Kompetisi", 
            description: "Hackathon Web3, VR Challenges, Best Startup Pitch.", 
            icon: <FaGamepad className="text-4xl text-green-500" /> 
        },
        { 
            title: "Workshop", 
            description: "NFT creation, Smart Contract coding, Metaverse development.", 
            icon: <FaChalkboardTeacher className="text-4xl text-yellow-500" /> 
        },
        { 
            title: "Exhibition", 
            description: "Booth startup blockchain, produk NFT, & komunitas Web3.", 
            icon: <FaBuilding className="text-4xl text-red-500" /> 
        },
        { 
            title: "Networking", 
            description: "Sesi temu bisnis dengan investor, developer, dan komunitas.", 
            icon: <FaHandshake className="text-4xl text-blue-500" /> 
        }
    ];

    return (
        <section className="py-4 mt-10 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold mb-8">🎉 Event Highlights <span className="text-indigo-400">(Why You Should Join)</span></h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {highlights.map((item, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105">
                            <div className="flex justify-center mb-4">{item.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-400">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventHighlights;
