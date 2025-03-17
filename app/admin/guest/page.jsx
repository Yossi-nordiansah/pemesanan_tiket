"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import PartnerList from '@/app/_components/admin/partnerList';
import DeleteConfirmation from '@/app/_components/admin/DeleteConfirmation';

const Guest = () => {

  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guestsToDelete, setGuestsToDelete] = useState(null);

  const fetchGuest = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/guests');
      
      if (!response.ok) {
        throw new Error('Failed to fetch guests');
      }
      
      const data = await response.json();
      setPartners(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuest();
  }, []);

  const handleDeleteClick = (partner) => {
    setGuestsToDelete(guests);
  };

  const handleDeleteConfirm = async () => {
    if (!guestsToDelete) return;
    
    try {
      const response = await fetch(`/api/guests/${guestsToDelete.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete guests');
      }
      
      // Refresh the list
      fetchGuest();
      setGuestsToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCancel = () => { 
    setPartnerToDelete(null);
  };
  

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Guests</h1>
        <Link href="/admin/guest/create">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add New Guestsss
          </button>
        </Link>
      </div>

           {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : error ? (
              <div className="bg-red-100 text-red-800 p-4 rounded mb-4">{error}</div>
            ) : (
              <PartnerList 
                guests={guests} 
                onDeleteClick={handleDeleteClick} 
              />
            )}
            
            {guestsToDelete && (
              <DeleteConfirmation
                guests={guestsToDelete}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
              />
            )}
    </div>
  )
}

export default Guest