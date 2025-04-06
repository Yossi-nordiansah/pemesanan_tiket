'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const WarTicketPopup = ({ onGetTickets }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentStage, setCurrentStage] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const warTicketStages = [
    {
      id: 1,
      name: 'War Ticket Stage 1',
      endDate: new Date('2025-04-15T00:00:00'),
      image: 'images/char1.png',
      boxColor: 'bg-gradient-to-br from-blue-500 via-white/50 to-red-500 backdrop-blur-lg'
    },
    {
      id: 2,
      name: 'War Ticket Stage 2',
      endDate: new Date('2025-04-30T00:00:00'),
      image: 'images/char2.png',
      boxColor: 'bg-gradient-to-br from-blue-500 via-white/50 to-red-500 backdrop-blur-lg'
    },
    {
      id: 3,
      name: 'War Ticket Stage 3',
      endDate: new Date('2025-05-01T00:00:00'),
      image: 'images/char1.png',
      boxColor: 'bg-gradient-to-br from-blue-500 via-white/50 to-red-500 backdrop-blur-lg'
    }
  ];

  useEffect(() => {
    const calculateCountdown = (target) => {
      const difference = target.getTime() - new Date().getTime();
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        return { days, hours, minutes, seconds };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      const currentStageData = warTicketStages[currentStage - 1];
      const countdown = calculateCountdown(currentStageData.endDate);
      
      setTimeRemaining(countdown);

      if (countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0) {
        setCurrentStage(prev => prev % warTicketStages.length + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentStage]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleGetTickets = () => {
    onGetTickets();
    handleClose();
  };

  if (!isVisible) return null;

  const currentStageData = warTicketStages[currentStage - 1];

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black bg-opacity-50" onClick={handleClose}>
      <div 
        className={`relative ${currentStageData.boxColor} text-white w-[800px] flex rounded-lg overflow-visible shadow-2xl`}
        onClick={(e) => e.stopPropagation()} // Mencegah event close saat klik dalam box
      >
        {/* Image Section */}
        <div className="relative w-1/2 overflow-visible">
          <div 
            className="absolute top-[-100px] -left-10 w-full max-w-[450px] h-[502px] bg-cover bg-center z-10 
                        md:w-[350px] md:h-[390px] sm:w-[250px] sm:h-[280px]"
            style={{
              backgroundImage: `url(${currentStageData.image})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>

        {/* Content Section */}
        <div className="w-1/2 p-6 flex flex-col justify-center relative">
          <button 
            onClick={handleClose} 
            className="absolute top-3 right-3 text-white hover:text-gray-200"
          >
            <X size={24} />
          </button>
          
          <h2 className="text-3xl font-bold mb-4 uppercase animate-attention text-white">
            GRAB YOUR TICKET NOW!!
          </h2>
          
          <div className="mb-4">
            <h3 className="font-semibold text-xl mb-2">{currentStageData.name}</h3>
            <div className="text-center text-2xl font-bold">
              {timeRemaining.days}d {timeRemaining.hours}h 
              {' '}{timeRemaining.minutes}m {timeRemaining.seconds}s
            </div>
          </div>
          
          <button onClick={handleGetTickets} className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
            Get Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarTicketPopup;