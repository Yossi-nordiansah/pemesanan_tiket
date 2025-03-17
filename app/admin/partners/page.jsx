'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PartnerList from '@/app/_components/admin/partnerList';
import DeleteConfirmation from '@/app/_components/admin/DeleteConfirmation';

export default function PartnersPage() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [partnerToDelete, setPartnerToDelete] = useState(null);
  
  const fetchPartners = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/partners');
      
      if (!response.ok) {
        throw new Error('Failed to fetch partners');
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
    fetchPartners();
  }, []);
  
  const handleDeleteClick = (partner) => {
    setPartnerToDelete(partner);
  };
  
  const handleDeleteConfirm = async () => {
    if (!partnerToDelete) return;
    
    try {
      const response = await fetch(`/api/partners/${partnerToDelete.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete partner');
      }
      
      // Refresh the list
      fetchPartners();
      setPartnerToDelete(null);
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
        <h1 className="text-2xl font-bold">Partners</h1>
        <Link href="/admin/partners/create">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add New Partner
          </button>
        </Link>
      </div>
      
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-4">{error}</div>
      ) : (
        <PartnerList 
          partners={partners} 
          onDeleteClick={handleDeleteClick} 
        />
      )}
      
      {partnerToDelete && (
        <DeleteConfirmation
          partner={partnerToDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
}