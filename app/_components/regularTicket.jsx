"use client"
import { useState } from "react";
import React from 'react';
import { motion } from 'framer-motion';

const RegularTicket = () => {
    const [isPurchased, setIsPurchased] = useState(false);

    const handlePurchase = () => {
      setIsPurchased(true);
      setTimeout(() => setIsPurchased(false), 3000);
    };
  
    const tickets = [
      {
        title: 'War Ticket I',
        price: 'Rp75.000',
        originalPrice: 'Rp300.000',
        countdown: '2D :05H :00M :00S',
        status: 'Available',
        isAvailable: true,
        img: "/images/war1.png",
        amount: 100
      },
      {
        title: 'War Ticket II',
        price: 'Rp100.000',
        originalPrice: 'Rp300.000',
        countdown: 'Coming Soon',
        status: 'Not Started',
        isAvailable: false,
        img: "/images/war2.png",
        amount: 150
      },
      {
        title: 'Regular Ticket',
        price: 'Rp300.000',
        originalPrice: '',
        countdown: '',
        status: 'Available',
        isAvailable: true,
        img: "/images/regular.png",
        amount: 2000
      }
    ];
  
    return (
        <section className="min-h-screen bg-black text-white py-12 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket, index) => (
          <motion.div
            key={index}
            className="bg-gray-900 border-2 border-cyan-500 rounded-lg shadow-lg p-6 text-center flex flex-col justify-between"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h2 className="text-3xl font-bold text-cyan-400 mb-2">{ticket.title}</h2>
            {ticket.countdown && (
              <p className="text-lg text-yellow-400 mb-2">{ticket.countdown}</p>
            )}
            <div className="relative w-full mb-2">
             <img src={ticket.img} alt="" className="w-32 rotate-45 mx-auto"/>
            </div>
            <p className="text-lg text-gray-300 mb-2">
              {ticket.originalPrice && (
                <span className="line-through text-red-500 mr-2">{ticket.originalPrice}</span>
              )}
              <span className="text-2xl font-extrabold text-cyan-300">{ticket.price}</span>
            </p>
            <p className="text-md text-cyan-300 italic mb-2">MetaVFest - Surabaya</p>
            <p className="text-xl text-white font-semibold mb-4">{ticket.amount} tickets remain</p>
  
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(0, 255, 255, 0.8)' }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg font-semibold transition ${ticket.isAvailable ? 'bg-cyan-500 text-black' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
              onClick={ticket.isAvailable ? handlePurchase : undefined}
              disabled={!ticket.isAvailable}
            >
              {ticket.isAvailable ? (isPurchased ? 'Purchased!' : 'Buy Now') : 'Coming Soon'}
            </motion.button>
  
            {isPurchased && ticket.isAvailable && (
              <motion.div
                className="mt-4 text-green-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                ✅ Ticket Purchased Successfully!
              </motion.div>
            )}
          </motion.div>
        ))}
      </section>
    );
}

export default RegularTicket