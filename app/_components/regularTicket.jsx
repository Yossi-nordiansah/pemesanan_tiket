"use client"
import { useState } from 'react';
import TicketPurchaseModal from './TicketPurchaseModal';

export default function RegularTicket() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

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

  const handleBuyNow = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  const handleConfirmPurchase = (formData) => {
    console.log('Purchase Data:', { ...formData, ticket: selectedTicket });
    alert(`Ticket purchased for ${formData.name} (${formData.email}) - WhatsApp: ${formData.whatsapp}`);
  };

  return (
    <section className="min-h-screen text-white py-6 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tickets.map((ticket, index) => (
        <div
          key={index}
          className="bg-gray-900/65 backdrop-blur-sm border-2 border-cyan-500 rounded-lg shadow-lg p-6 text-center flex flex-col justify-between"
        >
          <h2 className="text-3xl font-bold text-cyan-400 mb-2">{ticket.title}</h2>
          {ticket.countdown && (
            <p className="text-lg text-yellow-400 mb-2">{ticket.countdown}</p>
          )}
          <div className="relative w-full mb-2">
            <img src={ticket.img} alt="" className="w-32 rotate-45 mx-auto" />
          </div>
          <p className="text-lg text-gray-300 mb-2">
            {ticket.originalPrice && (
              <span className="line-through text-red-500 mr-2">{ticket.originalPrice}</span>
            )}
            <span className="text-2xl font-extrabold text-cyan-300">{ticket.price}</span>
          </p>
          <p className="text-md text-cyan-300 italic mb-2">MetaVFest - Surabaya</p>
          <p className="text-xl text-white font-semibold mb-4">{ticket.amount} tickets remain</p>

          <button
            className={`px-6 py-3 rounded-lg font-semibold transition ${ticket.isAvailable ? 'bg-cyan-500 text-black' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
            onClick={() => ticket.isAvailable && handleBuyNow(ticket)}
            disabled={!ticket.isAvailable}
          >
            {ticket.isAvailable ? 'Buy Now' : 'Coming Soon'}
          </button>
        </div>
      ))}

      <TicketPurchaseModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirmPurchase}
        ticket={selectedTicket}
      />
    </section>
  );
}
