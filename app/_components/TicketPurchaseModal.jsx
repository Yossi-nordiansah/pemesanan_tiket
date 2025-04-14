"use client";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import Router from 'next/router';
import { useRouter } from 'next/navigation';

export default function TicketPurchaseModal({ isOpen, onClose, ticket }) {
  if (!isOpen || !ticket) return null;
  const [referralMessage, setReferralMessage] = useState('');
  const [finalPrice, setFinalPrice] = useState(0);
  const id = uuidv4().replace(/-/g, '').slice(0, 10);
  const [formData, setFormData] = useState({
    id,
    idProduct: "",
    buyer: '',
    email: '',
    waNumber: '',
    quantity: 1,
    productName: "",
    price: finalPrice,
    referralCode: '',
  });

  console.log(formData);

  const [loadingReferral, setLoadingReferral] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const router = useRouter();
  const modalRef = useRef(null);

  useEffect(() => {
    if (ticket) {
      setFinalPrice(ticket.price);
      setFormData((prev) => ({
        ...prev,
        productName: `metavfest ${ticket.title}`,
        idProduct: ticket.id,
        price: ticket.price
      }));
    }
  }, [ticket]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value);
  };

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert({ message: '', type: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/checkout', formData);
      if (res.status === 200) {
        showAlert('Pembelian berhasil! Silakan cek email/WA Anda.', 'success');
        window.snap.pay(res.data.token);
        onClose(); // menutup modal
      } else {
        showAlert('Gagal melakukan pembelian.', 'error');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      showAlert('Terjadi kesalahan saat memproses pembelian.', 'error');
    }
  };

  const validateReferral = async () => {
    if (!formData.referralCode) {
      setFinalPrice(ticket.price);
      setReferralMessage('');
      return;
    }

    setLoadingReferral(true);

    try {
      const res = await axios.post('/api/validate-referral', {
        referralCode: formData.referralCode,
        ticketPrice: ticket.price,
      });

      const data = res.data;

      if (data.valid) {
        setFinalPrice(data.finalPrice);
        setReferralMessage(data.message);
        showAlert('' + data.message, 'success');
      } else {
        setFinalPrice(ticket.price);
        setReferralMessage(data.message);
        showAlert('' + data.message, 'error');
      }
    } catch (error) {
      console.error('Referral validation error:', error);
      setFinalPrice(ticket.price);
      setReferralMessage('Terjadi kesalahan saat validasi kode.');
      showAlert('Terjadi kesalahan saat memvalidasi kode referral.', 'error');
    } finally {
      setLoadingReferral(false);
    }
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      price: finalPrice
    }));
  }, [finalPrice]);

  return (
    <>
      {alert.message && (
        <div
          className={`fixed top-10 left-1/2 transform -translate-x-1/2  px-4 py-3 text-center rounded shadow-lg text-white z-[150] flex items-center gap-3 transition-all duration-700 ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
        >
          {alert.type === 'success' ? (
            <AiOutlineCheckCircle className="text-6xl" />
          ) : (
            <AiOutlineCloseCircle className="text-6xl" />
          )}
          <span className="text-sm font-medium">{alert.message}</span>
        </div>
      )}

      {/* Modal */}
      <div className="fixed inset-0 px-6 bg-black bg-opacity-50 flex items-center justify-center z-40">
        <div
          ref={modalRef}
          className="bg-slate-950/75 backdrop-blur-md sm:p-6 p-3 rounded-lg shadow-lg w-96 border-4 border-cyan-500 drop-shadow-[0_0px_5px_#0096CF]"
        >
          <h2 className="text-2xl font-bold mb-4 text-white text-center">Purchase {ticket.title}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="buyer"
              placeholder="Full Name"
              value={formData.buyer}
              onChange={handleChange}
              required
              className="sm:w-full w-[95%] mx-auto block text-slate-900 border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="sm:w-full w-[95%] mx-auto block p-2 border rounded text-slate-900"
            />
            <input
              type="text"
              name="waNumber"
              placeholder="WhatsApp Number"
              value={formData.waNumber}
              onChange={handleChange}
              required
              className="sm:w-full w-[95%] mx-auto block p-2 border rounded text-slate-900"
            />

            {ticket.title === 'Regular Ticket' && (
              <div className='sm:w-full w-[95%] mx-auto flex gap-2 items-center'>
                <input
                  type="text"
                  name="referralCode"
                  placeholder="Referral Code (Optional)"
                  value={formData.referralCode}
                  onChange={handleChange}
                  className="sm:w-full w-11/12 flex-1 p-2 border rounded text-slate-900"
                />
                <button
                  type="button"
                  onClick={validateReferral}
                  className="px-3 py-2 bg-green-500 text-white rounded text-sm"
                  disabled={loadingReferral}
                >
                  {loadingReferral ? 'Checking...' : 'Submit'}
                </button>
              </div>
            )}

            <div className="flex justify-between items-center sm:w-full w-[95%] mx-auto">
              <p className="text-white font-semibold underline sm:text-base text-sm">Total: {formatRupiah(finalPrice)}</p>
              <button
                type="submit"
                className="sm:px-4 px-2 py-2 bg-cyan-500 text-white rounded font-semibold"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
