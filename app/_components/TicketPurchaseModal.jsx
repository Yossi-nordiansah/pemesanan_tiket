"use client"
import { useState } from 'react';

export default function TicketPurchaseModal({ isOpen, onClose, onConfirm, ticket }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    referralCode: ''
  });

  if (!isOpen || !ticket) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 px-6 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-950/75 backdrop-blur-md p-6 rounded-lg shadow-lg w-96 border-4 border-cyan-500 drop-shadow-[0_0px_5px_#0096CF]">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">Purchase {ticket.title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 text-slate-900 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded text-slate-900"
          />
          <input
            type="text"
            name="whatsapp"
            placeholder="WhatsApp Number"
            value={formData.whatsapp}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded text-slate-900"
          />
          {ticket.title === 'Regular Ticket' && (
            <input
              type="text"
              name="referralCode"
              placeholder="Referral Code (Optional)"
              value={formData.referralCode}
              onChange={handleChange}
              className="w-full p-2 border rounded text-slate-900"
            />
          )}
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-red-400 rounded font-semibold">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-cyan-500 text-white rounded font-semibold">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
}
