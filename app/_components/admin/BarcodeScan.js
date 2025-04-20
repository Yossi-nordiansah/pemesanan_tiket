'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Camera } from 'lucide-react';

export default function BarcodeScanner() {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  
  // We'll simulate barcode scanning since we can't access the camera API directly
  // In a real application, you would use a library like quagga.js, zxing, or html5-qrcode
  const startScanning = () => {
    setScanning(true);
    setMessage('Scanning for barcode...');
    setError(null);
    
    // In a real app, this is where you'd initialize the scanner
    // For demo purposes, we'll simulate a successful scan after a delay
    setTimeout(() => {
      handleBarcodeDetected("TRX1234567");
    }, 3000);
  };
  
  const stopScanning = () => {
    setScanning(false);
    // In a real app, this is where you'd stop the scanner
  };
  
  const handleBarcodeDetected = async (barcode) => {
    try {
      setMessage(`Barcode detected: ${barcode}`);
      
      // Extract transaction ID from barcode
      // In a real app, you might need to parse the barcode data
      const transactionId = barcode;
      
      // Call API to update transaction status
      const response = await fetch('/api/transactions/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactionId }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to process scan');
      }
      
      setScanned(true);
      setMessage(`Success! ${data.message}`);
      
      // Return to transactions page after successful scan
      setTimeout(() => {
        router.push('/admin/transactions');
      }, 2000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      stopScanning();
    }
  };
  
  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);
  
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Scan Ticket</h1>
      
      <div className="mb-6">
        {!scanning && !scanned ? (
          <button 
            onClick={startScanning}
            className="w-full py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
          >
            <Camera size={24} />
            Start Scanning
          </button>
        ) : null}
        
        {scanning && (
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <div className="animate-pulse mb-2">
                <Camera size={48} className="mx-auto text-blue-600" />
              </div>
              <p>Position barcode in the camera view</p>
            </div>
          </div>
        )}
        
        {scanned && (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center">
            <svg className="w-8 h-8 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <p className="font-medium">Scan Successful!</p>
            <p className="text-sm mt-1">Redirecting to transactions...</p>
          </div>
        )}
        
        {message && <p className="text-center my-4">{message}</p>}
        
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg mt-4">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>
      
      {scanning && (
        <button 
          onClick={stopScanning}
          className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
      )}
      
      <div className="mt-6 text-center">
        <button 
          onClick={() => router.push('/admin/transactions')}
          className="text-blue-600 hover:underline"
        >
          Return to Transactions
        </button>
      </div>
    </div>
  );
}