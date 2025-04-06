import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Navtop = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [scrolled, setScrolled] = useState(false);
    const [targetDateTime, setTargetDateTime] = useState(null);
    const [newDateTime, setNewDateTime] = useState('');

    useEffect(() => {

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        const interval = setInterval(1000);

        return () => {
            clearInterval(interval);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const fetchTargetDateTime = async () => {
            try {
                const response = await axios.get('/api/event-date');
                if (response.data && response.data.length > 0) {
                    const fetchedDate = new Date(response.data[0].date);
                    setTargetDateTime(fetchedDate);
                    setNewDateTime(fetchedDate.toISOString().slice(0, 16)); // format untuk input datetime-local
                }
            } catch (error) {
                console.error('Error fetching target date:', error);
            }
        };

        fetchTargetDateTime();
    }, []);

    useEffect(() => {
        if (!targetDateTime) return;

        const intervalId = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDateTime.getTime() - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                clearInterval(intervalId);
                setTimeLeft({ days: 'Expired', hours: '', minutes: '', seconds: '' });
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [targetDateTime]);

    return (
        <div className='fixed px-3 py-1 flex justify-between w-full z-[100]'>
        <div className={`flex items-center gap-2 transition-all duration-300 ease-in-out ${scrolled ? "translate-x-5" : "translate-x-0"}`}>
            <img src="/images/logometavfest.png" alt="Logo" className="md:w-10 w-6" />
            <h1 className={`text-black font-bold md:text-4xl text-[19px] transition-all duration-300 ${scrolled ? "hidden" : "block"}`}>
                MetaVFest
            </h1>
        </div>
        <div className='px-2 py-1 bg-slate-100 backdrop-blur-md rounded-xl text-xs text-black text-center'>
            <p>Starts In</p>
            <h1 className='font-semibold text-sm md:text-base'>
                {timeLeft.days} d 
                <span className="hidden sm:inline"> : {timeLeft.hours} h : {timeLeft.minutes} m</span>
            </h1>
        </div>
    </div>
    );
};

export default Navtop;