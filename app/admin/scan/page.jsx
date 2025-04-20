'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BarcodeScanner from '@/app/_components/admin/BarcodeScan';
import { Camera, Search } from 'lucide-react';

export default function ScanPage() {
  const router = useRouter();
  const [scanMode, setScanMode] = useState('camera');
  const [manualId, setManualId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    
    if (!manualId.trim()) {
      setError('Please enter a transaction ID');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/transactions/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactionId: manualId.trim() }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to process transaction');
      }
      
      // Redirect back to transactions page after successful scan
      router.push('/admin/transactions');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Scan Ticket</h1>
      
      {/* Toggle between scan modes */}
      <div className="flex rounded-lg overflow-hidden mb-8">
        <button
          className={`flex-1 py-3 flex justify-center items-center gap-2 ${
            scanMode === 'camera' ? 'bg-blue-600 text-white' : 'bg-gray-100'
          }`}
          onClick={() => setScanMode('camera')}
        >
          <Camera size={20} />
          <span>Camera Scan</span>
        </button>
        <button
          className={`flex-1 py-3 flex justify-center items-center gap-2 ${
            scanMode === 'manual' ? 'bg-blue-600 text-white' : 'bg-gray-100'
          }`}
          onClick={() => setScanMode('manual')}
        >
          <Search size={20} />
          <span>Manual Entry</span>
        </button>
      </div>
      
      {scanMode === 'camera' ? (
        <BarcodeScanner />
      ) : (
        <div className="bg-white p-6 rounded-lg shadow">
          <form onSubmit={handleManualSubmit}>
            <div className="mb-4">
              <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 mb-1">
                Enter Transaction ID
              </label>
              <input
                type="text"
                id="transactionId"
                value={manualId}
                onChange={(e) => setManualId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. TRX1234567"
              />
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            >
              {loading ? 'Processing...' : 'Submit'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button 
              onClick={() => router.push('/admin/transactions')}
              className="text-blue-600 hover:underline"
            >
              Return to Transactions
            </button>
          </div>
        </div>
      )}
    </div>
  );
}