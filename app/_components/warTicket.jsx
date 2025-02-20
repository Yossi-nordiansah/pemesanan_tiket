import React from 'react';
import { useState, useEffect } from 'react';

const WarTicket = () => {
    const calculateTimeLeft = () => {
        const targetDate = new Date().getTime() + 2 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000; // 2 days 5 hours
        const now = new Date().getTime();
        const difference = targetDate - now;
    
        let timeLeft = {};
    
        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }
    
        return timeLeft;
      };
    
      const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    
      useEffect(() => {
        const timer = setInterval(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
    
        return () => clearInterval(timer);
      }, []);
    
      return (
        <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-b from-blue-950/50 to-transparent text-yellow-400 px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-white text-center">🎟️ War Ticket</h1>
          <div className="text-3xl md:text-4xl font-bold bg-blue-800 px-4 md:px-6 py-3 md:py-4 rounded-lg shadow-lg text-center">
            <span>{timeLeft.days}D</span> :
            <span>{timeLeft.hours.toString().padStart(2, "0")}H</span> :
            <span>{timeLeft.minutes.toString().padStart(2, "0")}M</span> :
            <span>{timeLeft.seconds.toString().padStart(2, "0")}S</span>
          </div>
          <p className="text-2xl md:text-4xl font-extrabold text-yellow-300 mt-4 text-center">
            💰 <span className="line-through text-red-500">Rp300.000</span> <span className="text-white animate-neon">NOW ONLY Rp75.000!</span>
          </p>
          <p className="mt-4 text-sm md:text-base text-white text-center">Hurry up! Get your tickets before time runs out! 🎉</p>
          <button className="mt-8 bg-yellow-400 text-black px-5 py-3 rounded-full font-semibold hover:bg-yellow-300 transition w-full md:w-auto animate-bounce">
            🎉 Grab Your Ticket Now!
          </button>
    
          <style jsx>{`
            @keyframes neon-pulse {
              0%, 100% {
                text-shadow: 0 0 10px #00ffff;
              }
              50% {
                text-shadow: 0 0 20px #00ffff;
              }
            }
    
            .animate-neon {
              animation: neon-pulse 1.5s infinite alternate;
            }
          `}</style>
        </div>
      );
}

export default WarTicket