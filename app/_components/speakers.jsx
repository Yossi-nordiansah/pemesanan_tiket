"use client";
import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Speakers = () => {
    const [speakers, setSpeakers] = useState([
        {
            name: 'Trinova',
            position: 'Chief Executive & Finance',
            image: '/images/trinova.png',
            companyLogo: '/images/icon.png',
        },
        {
            name: 'Eko Subagyo',
            position: 'Vice Chief Executife & Marketing',
            image: '/images/eko.png',
            companyLogo: '/images/icon.png',
        },
        {
            name: 'Baqhiz',
            position: 'Secretary',
            image: '/images/baqhiz.png',
            companyLogo: '/images/icon.png',
        },
        {
            name: 'Toriq',
            position: 'Event',
            image: '/images/thoriq.png',
            companyLogo: '/images/icon.png',
        },
        {
            name: 'Aryo',
            position: 'Creative',
            image: '/images/aryo.png',
            companyLogo: '/images/icon.png',
        },
        {
            name: 'Juan Mai',
            position: 'Decoration', 
            image: '/images/juan.png',
            companyLogo: '/images/icon.png',
        },
        {
            name: 'Putra',
            position: 'Communication', 
            image: '/images/putra.png',
            companyLogo: '/images/icon.png',
        },
    ]);

    // Konfigurasi Carousel
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1 }
            }
        ]
    };

    return (
        <section className="">
            <div className="max-w-[1200px] mx-auto px-8 sm:px-6 lg:px-8">
                <h2 className="sm:text-4xl text-xl font-bold text-slate-800 lg:mb-7 mb-12 text-center">Our Team</h2>
                <Slider {...settings}>
                    {speakers.map((speaker, index) => (
                        <div key={index} className="px-3 w-full h-full">
                            <div className="relative bg-gradient-to-br from-blue-300 via-white to-red-300 backdrop-blur-lg rounded-lg shadow-lg p-2 text-center group flex flex-col h-full lg:justify-between justify-center lg:min-h-[420px] min-h-96">
                                <img src={speaker.companyLogo} alt="Company Logo" className="w-20 mx-auto mb-1" />
                                <img src={speaker.image} alt={speaker.name} className="transition-transform duration-300 group-hover:group-hover:scale-125 lg:h-72 h-64 w-full rounded-md lg:mb-2 mb-3 object-contain" />
                                <div className="">
                                    <h3 className="text-xl font-semibold text-slate-800">{speaker.name}</h3>
                                    <p className="text-sm text-slate-800 font-semibold">{speaker.position}</p>
                                </div> 
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default Speakers;