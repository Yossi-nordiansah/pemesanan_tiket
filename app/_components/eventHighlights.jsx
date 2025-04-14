"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";

const EventHighlights = () => {
    const events = [
        { 
            title: "Crypto Gathering Community", 
            popUpTitle: "Web3 & Blockchain Gathering", 
            description: "Acara eksklusif bagi komunitas Web3, NFT, dan Blockchain untuk berdiskusi, berjejaring, dan berbagi wawasan dengan para ahli industri. Hadirkan inovasi terbaru dalam dunia crypto dan potensi masa depan yang lebih terbuka!", 
            image: "/images/crypto.svg",
            descImage: "/images/crypto2.svg",
        },
        { 
            "title": "Web3 Insight Talkshow", 
            "popUpTitle": "Eksplorasi Masa Depan Web3 & Blockchain", 
            "description": "Talkshow interaktif yang menghadirkan para ahli Web3, Blockchain, NFT, dan DeFi untuk membahas perkembangan terbaru, tantangan, serta peluang di industri ini. Dapatkan wawasan eksklusif dan jadilah bagian dari revolusi digital!", 
            "image": "/images/web3-talkshow.svg",
            "descImage": "/images/web3-discussion.svg"
        },
        { 
            title: "Performance",
            popUpTitle: "Performance Song Showcase", 
            description: "Metavfest menghadirkan pertunjukan musik spektakuler yang menampilkan artis papan atas, band indie, serta musisi komunitas dari berbagai genre. Dengan tata panggung megah dan teknologi suara canggih, acara ini akan menjadi pusat hiburan yang menggetarkan jiwa.",
            image: "/images/performance.svg",
            descImage: "/images/performance2.svg",
        },
        { 
            title: "Turnamen Valorant",
            popUpTitle: "Valorant Grand Tournament", 
            description: "Saksikan pertarungan sengit antar tim terbaik dalam skena kompetitif Valorant di Metavfest! Dengan prize pool besar, caster profesional, dan atmosfer e-sports yang mendebarkan, turnamen ini akan menjadi ajang pertarungan para legenda.", 
            image: "/images/valorant.svg",
            descImage: "/images/valorant2.svg",
        },
        { 
            title: "Anime & Cosplay",
            popUpTitle: "Anime & Cosplay Festival", 
            description: "Bagi para pecinta anime dan cosplay, Metavfest menyajikan festival cosplay terbesar dengan para cosplayer profesional, kompetisi kostum, meet and greet dengan kreator anime, serta berbagai booth merchandise eksklusif.", 
            image: "/images/cosplay.svg",
            descImage: "/images/cosplay2.svg",
        },
    ];
      
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % events.length);
    };

    const prevSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
    };

    const getSecondaryIndex = () => {
        return (activeIndex + 1) % events.length;
    };

    const isFocused = (index) => {
        return index === activeIndex || index === getSecondaryIndex();
    };

    return (
        <>
        <div className="text-center md:mb-8 mb-0">
        {/* Title & Description */}
        <p className="px-4 text-2xl sm:text-4xl font-bold bg-black bg-clip-text text-transparent">
          MetaVFest - The Future of Web3 &
        </p>
        <p className="px-4 text-2xl sm:text-4xl font-bold bg-black bg-clip-text text-transparent">
          Blockchain in Surabaya
        </p>
        <p className="px-4 sm:text-xl mt-2 font-bold bg-black bg-clip-text text-transparent">
          Explore, Learn, Network, Experience the World of Crypto, Metaverse, and Innovation
        </p>
        <p className="px-4 sm:text-xl mt-6 font-bold bg-black bg-clip-text text-transparent">
          <a
            href="https://www.google.com/maps/place/Balai+Pemuda+Surabaya/@-7.2639727,112.7427289,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd7f9617fe40b67:0x987ff0249bb2e08a!8m2!3d-7.263978!4d112.7453038!16s%2Fg%2F1pzr1w7sd?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-blue-900"
          >
            Balai Pemuda Surabaya
          </a>{" "}
          <FaLocationDot className="inline text-red-700 mb-1" /> | 11 Mei 2025
        </p>
      </div>

        <h1 className="mt-16 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">METAVFEST <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Event Highlight</span></h1>
        <div className="flex min-h-screen items-center justify-center p-6 overflow-hidden">
            <div className="relative w-full max-w-6xl h-screen max-h-[600px]">
                <button 
                    className="absolute md:left-4 -left-1 top-1/2 -translate-y-1/2 z-40 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full transition-all"
                    onClick={prevSlide}
                >
                    ❮
                </button>
                
                <button 
                    className="absolute sm:right-4 -right-1 top-1/2 -translate-y-1/2 z-40 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full transition-all"
                    onClick={nextSlide}
                >
                    ❯
                </button>
                
                {/* Event items */}
                <div className="relative w-full h-full">
                    {events.map((event, index) => {
                        const focused = isFocused(index);
                        const isPrimary = index === activeIndex;
                        const isSecondary = index === getSecondaryIndex();
                        
                        if (!focused && !isPrimary && (index !== (activeIndex - 1 + events.length) % events.length) && (index !== (getSecondaryIndex() + 1) % events.length)) {
                            return null;
                        }
                        
                        let positionClass = "";
                        if (isPrimary) {
                            positionClass = "hidden md:block left-1/4 -translate-x-1/2";
                        } else if (isSecondary) {
                            positionClass = "md:left-3/4 left-1/2 -translate-x-1/2";
                        } else if (index === (activeIndex - 1 + events.length) % events.length) {
                            positionClass = "left-0 -translate-x-3/4";
                        } else {
                            positionClass = "left-full -translate-x-1/4";
                        }
                        
                        return (
                            <div
                                key={index}
                                className={`absolute top-1/2 -translate-y-1/2 ${positionClass} transition-all duration-500 ease-in-out 
                                           ${focused ? "z-20" : "z-10"} ${focused ? "cursor-pointer" : ""}`}
                                onClick={() => focused && setSelectedEvent(event)}
                            >
                                <div className={`relative overflow-hidden rounded-lg shadow-lg 
                                               ${focused ? "md:w-[430px] w-80 h-[30rem]" : "w-64 h-80"} 
                                               transition-all duration-500`}>
                                    <div className="absolute inset-0 w-full h-full">
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            fill
                                            className={`object-cover ${!focused ? "blur-sm brightness-50" : "brightness-100"}`}
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <h2 className={`font-bold ${focused ? "text-2xl" : "text-lg"} transition-all`}>
                                            {event.title}
                                        </h2>
                                        {focused && (
                                            <div className="mt-2 space-y-2">
                                                <p className="text-sm text-white/80 line-clamp-2">
                                                    {event.description.substring(0, 80)}...
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Popup Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[100] backdrop-blur-md">
                    <div className="bg-white w-11/12 md:p-8 p-2 h-fit max-h-[95vh] rounded-lg shadow-2xl max-w-2xl text-center relative">
                        <button
                            className="absolute top-3 right-4 text-red-600 hover:text-gray-900 text-3xl font-bold"
                            onClick={() => setSelectedEvent(null)}
                        >
                            &times;
                        </button>
                        <Image
                            src={selectedEvent.descImage}
                            alt={selectedEvent.popUpTitle}
                            width={600}
                            height={350}
                            className="w-full h-56 object-cover rounded-lg"
                        />
                        <h3 className="md:text-3xl text-2xl font-extrabold text-gray-800 mt-4">{selectedEvent.popUpTitle}</h3>
                        <p className="text-gray-700 md:text-lg text-base leading-relaxed p-2 mt-2">{selectedEvent.description}</p>
                    </div>
                </div>
            )}
        </div>
        </>
    );    
};

export default EventHighlights;