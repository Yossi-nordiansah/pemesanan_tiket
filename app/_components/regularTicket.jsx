"use client"
import { useState, useEffect } from 'react';
import TicketPurchaseModal from './TicketPurchaseModal';
import { Heart, Clock } from 'lucide-react';

export default function EventTickets() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value);
  };

  const events = [
    {
      id: 1,
      title: "War Ticket I",
      category: "Web3 & Crypto Fest",
      attendees: "100 Slots Only",
      location: "Balai Pemuda, Surabaya",
      date: "Sunday, May 11, 2025",
      time: "06:00 PM",
      price: 75000,
      organizer: "Metavfest Official",
      image: "/images/war1.webp",
      originalPrice: "Rp 300.000,00",
      discount: "Limited Offer",
      quota: 100,
      saleStart: "2025-04-1T00:00:00",
      deadline: "2025-04-15T23:59:00"
    },
    {
      id: 2,
      title: "War Ticket II",
      category: "Web3 & Crypto Fest",
      attendees: "150 Slots Only",
      location: "Balai Pemuda, Surabaya",
      date: "Sunday, May 11, 2025",
      time: "06:00 PM",
      price: 100000,
      organizer: "Metavfest Official",
      image: "/images/war2.webp",
      originalPrice: "Rp 300.000,00",
      discount: "Limited Offer",
      quota: 150,
      saleStart: "2025-04-16T00:00:00",
      deadline: "2025-04-30T23:59:00"
    },
    {
      id: 3,
      title: "Regular Ticket",
      category: "Web3 & Crypto Fest",
      attendees: "Unlimited",
      location: "Balai Pemuda, Surabaya",
      date: "Sunday, May 11, 2025",
      time: "06:00 PM",
      price: 300000,
      organizer: "Metavfest Official",
      image: "/images/regular.webp",
      originalPrice: "Rp 300.000,00",
      discount: "Use Referral Code",
      quota: "No Limit",
      saleStart: "2025-03-26T00:00:00",
      deadline: "2025-05-11T23:59:00"
    }
  ];

  // Countdown hook
  const useCountdown = (targetDate, saleStartDate) => {
    const [countdown, setCountdown] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isAvailable: false
    });

    useEffect(() => {
      const intervalId = setInterval(() => {
        const now = new Date();
        const target = new Date(targetDate);
        const saleStart = new Date(saleStartDate);

        // Calculate time differences
        const remainingTime = target.getTime() - now.getTime();
        const saleStartDiff = saleStart.getTime() - now.getTime();

        if (remainingTime > 0) {
          const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
          const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

          setCountdown({
            days,
            hours,
            minutes,
            seconds,
            isAvailable: saleStartDiff <= 0 && remainingTime > 0
          });
        } else {
          setCountdown({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            isAvailable: false
          });
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }, [targetDate, saleStartDate]);

    return countdown;
  };

  const handleBuyNow = (event) => {
    const now = new Date();
    const saleStart = new Date(event.saleStart);
    const deadline = new Date(event.deadline);

    if (now >= saleStart && now <= deadline) {
      setSelectedTicket(event);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mb-8">
      {events.map((event) => {
        const countdown = useCountdown(event.deadline, event.saleStart);

        return (
          <div 
            key={event.id} 
            className="relative w-full bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Image Container with Ticket-like Cut */}
            <div className="relative">
              <div className="absolute top-0 right-0 p-2 z-10">
                <Heart className="text-white stroke-2" fill="rgba(255,255,255,0.3)" />
              </div>
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-48 object-cover"
                width={400}
                height={250}
                loading="lazy"
              />
              {/* Ticket Cut-out Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-white">
                <div className="absolute inset-x-0 -bottom-1 border-b-8 border-dashed border-gray-200"></div>
                <div className="absolute left-0 right-0 h-4 bg-gradient-to-b from-transparent to-white"></div>
              </div>
              
              {/* Discount Badge */}
              {event.discount && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {event.discount}
                </div>
              )}
            </div>

            {/* Event Details */}
            <div className="p-4 pt-6">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{event.category}</span>
                <span className="text-gray-500">{event.attendees}</span>
              </div>
              
              <h2 className="text-lg font-bold mb-2 line-clamp-2">{event.title}</h2>
              
              <div className="space-y-2 text-sm text-gray-600 mb-3">
                <div className="flex items-start">
                  <svg className="flex-shrink-0 h-4 w-4 mt-0.5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{event.location}</span>
                </div>
                <div className="flex items-start">
                  <svg className="flex-shrink-0 h-4 w-4 mt-0.5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{event.date} • {event.time}</span>
                </div>
                <div className="flex items-start">
                  <svg className="flex-shrink-0 h-4 w-4 mt-0.5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <div>
                    <span className="font-medium">{formatRupiah(event.price)}</span>
                    {event.originalPrice && (
                      <span className="ml-2 text-xs text-gray-400 line-through">{event.originalPrice}</span>
                    )}
                  </div>
                </div>
                <div className="text-xs text-gray-400">By {event.organizer}</div>
                
                {/* Countdown Section */}
                <div className="flex items-center text-xs text-gray-600 mt-2">
                  <Clock className="mr-2 h-4 w-4" />
                  {countdown.days > 0 || countdown.hours > 0 || countdown.minutes > 0 || countdown.seconds > 0 ? (
                    <span>
                      {countdown.days}d : {countdown.hours}h : {countdown.minutes}m : {countdown.seconds}s
                    </span>
                  ) : (
                    <span className="text-red-500">Sales Closed</span>
                  )}
                </div>
              </div>

              {/* Ticket Button */}
              <div className="mt-4 flex space-x-2">
                <button 
                  onClick={() => handleBuyNow(event)}
                  className={`flex-1 py-2 rounded-lg transition ${
                    countdown.isAvailable
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!countdown.isAvailable}
                >
                  {countdown.isAvailable ? 'Buy Tickets' : 'Not Available'}
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <TicketPurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ticket={selectedTicket}
      />
    </div>
  );
}