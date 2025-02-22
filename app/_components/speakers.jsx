"use client";
import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Speakers = () => {
    const [speakers, setSpeakers] = useState([
        {
            name: 'Rowan Atkinson',
            position: 'Co-Founder and Executive Chairman of Coinstore',
            image: '/images/Rowan-atkinson.png',
            companyLogo: '/images/corp.png',
        },
        {
            name: 'Rowan Atkinson',
            position: 'Co-Founder and Executive Chairman of Coinstore',
            image: '/images/Rowan-atkinson.png',
            companyLogo: '/images/corp.png',
        },
        {
            name: 'Rowan Atkinson',
            position: 'Co-Founder and Executive Chairman of Coinstore',
            image: '/images/Rowan-atkinson.png',
            companyLogo: '/images/corp.png',
        },
        {
            name: 'Rowan Atkinson',
            position: 'Co-Founder and Executive Chairman of Coinstore',
            image: '/images/Rowan-atkinson.png',
            companyLogo: '/images/corp.png',
        },
        {
            name: 'Rowan Atkinson',
            position: 'Co-Founder and Executive Chairman of Coinstore',
            image: '/images/Rowan-atkinson.png',
            companyLogo: '/images/corp.png',
        },
        {
            name: 'Rowan Atkinson',
            position: 'Co-Founder and Executive Chairman of Coinstore',
            image: '/images/Rowan-atkinson.png',
            companyLogo: '/images/corp.png',
        },
    ]);

    // Konfigurasi Carousel
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
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
        <section className="py-5 mt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Speakers</h2>
                <Slider {...settings}>
                    {speakers.map((speaker, index) => (
                        <div key={index} className="px-3 h-full">
                            <div className="bg-gray-800 rounded-lg shadow-lg p-2 text-center group flex flex-col h-full justify-between min-h-[420px]">
                                <img src={speaker.companyLogo} alt="Company Logo" className="w-20 mx-auto" />
                                <img src={speaker.image} alt={speaker.name} className="transition-transform duration-300 group-hover:group-hover:scale-125 h-72 w-full object-cover rounded-md mb-2" />
                                <div className="">
                                    <h3 className="text-xl font-semibold text-white">{speaker.name}</h3>
                                    <p className="text-sm text-gray-400">{speaker.position}</p>
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
