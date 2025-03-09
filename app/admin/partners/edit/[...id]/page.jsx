'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PartnerForm from '@/app/_components/admin/PartnerForm';

export default function EditPartnerPage() {
  const params = useParams();
  const partnerId = params.id;
  
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPartner = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/partners/${partnerId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch partner details');
        }
        
        const data = await response.json();
        setPartner(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (partnerId) {
      fetchPartner();
    }
  }, [partnerId]);
  
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }
  
  if (error) {
    return (
      <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
        Error: {error}
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Partner</h1>
      {partner && <PartnerForm partner={partner} />}
    </div>
  );
}