'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import GuestList from '@/app/_components/admin/guestList';
import DeleteConfirmation from '@/app/_components/admin/DeleteConfirmationGuests';

export default function GuestsPage() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guestToDelete, setGuestToDelete] = useState(null);

  const fetchGuests = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/guests');

      if (!response.ok) {
        throw new Error('Failed to fetch guests');
      }

      const data = await response.json();
      setGuests(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const handleDeleteClick = (guest) => {
    setGuestToDelete(guest);
  };

  const handleDeleteConfirm = async () => {
    if (!guestToDelete) return;

    try {
      const response = await fetch(`/api/guests/${guestToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete guest');
      }

      // Refresh the list
      fetchGuests();
      setGuestToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCancel = () => {
    setGuestToDelete(null);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Guests</h1>
        <Link href="/admin/guests/create">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add New Guest
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-4">{error}</div>
      ) : (
        <GuestList 
          guests={guests} 
          onDeleteClick={handleDeleteClick} 
        />
      )}

      {guestToDelete && (
        <DeleteConfirmation
          guest={guestToDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
}
