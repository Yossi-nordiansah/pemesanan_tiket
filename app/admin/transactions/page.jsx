'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import DeleteConfirmation from '@/app/_components/admin/TransactionsDeleteConfirmations';
import { Camera } from 'lucide-react';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    unpaid: 0,
    pending: 0,
    totalAmount: 0,
    paidAmount: 0,
    unpaidAmount: 0,
    pendingAmount: 0
  });
  
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/transactions');
      
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      
      const data = await response.json();
      setTransactions(data);
      
      // Calculate statistics
      const calculatedStats = {
        total: data.length,
        paid: data.filter(t => t.status === 'Paid').length,
        unpaid: data.filter(t => t.status === 'Unpaid').length,
        pending: data.filter(t => t.status === 'Pending').length,
        scanned: data.filter(t => t.status === 'Scanned').length,
        totalAmount: data.reduce((sum, t) => sum + Number(t.price), 0),
        paidAmount: data.filter(t => t.status === 'Paid').reduce((sum, t) => sum + Number(t.price), 0),
        unpaidAmount: data.filter(t => t.status === 'Unpaid').reduce((sum, t) => sum + Number(t.price), 0),
        pendingAmount: data.filter(t => t.status === 'Pending').reduce((sum, t) => sum + Number(t.price), 0),
        scannedAmount: data.filter(t => t.status === 'Scanned').reduce((sum, t) => sum + Number(t.price), 0)
      };
      
      setStats(calculatedStats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTransactions();
  }, []);
  
  const handleDeleteClick = (transaction) => {
    setTransactionToDelete(transaction);
  };
  
  const handleDeleteConfirm = async () => {
    if (!transactionToDelete) return;
    
    try {
      const response = await fetch(`/api/transactions/${transactionToDelete.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }
      
      // Refresh the list
      fetchTransactions();
      setTransactionToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleDeleteCancel = () => { 
    setTransactionToDelete(null);
  };
  
  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(transaction => transaction.status === filter);
  
    const chartData = [
        { name: 'Paid', value: stats.paid, color: '#10B981' },
        { name: 'Unpaid', value: stats.unpaid, color: '#EF4444' },
        { name: 'Pending', value: stats.pending, color: '#F59E0B' },
        { name: 'Scanned', value: stats.scanned, color: '#8B5CF6' }
    ];
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR' 
    }).format(price);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };  
  
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">SCAN TICKET</h1>
        <Link href="/admin/scan">
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2 ml-2">
            <Camera size={18} />
            Scan Ticket
        </button>
        </Link>
      </div>
      
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-4">{error}</div>
      ) : (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm font-medium">Total Transactions</h3>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-gray-600">{formatPrice(stats.totalAmount)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-green-500 text-sm font-medium">Paid</h3>
              <p className="text-2xl font-bold">{stats.paid}</p>
              <p className="text-gray-600">{formatPrice(stats.paidAmount)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-red-500 text-sm font-medium">Unpaid</h3>
              <p className="text-2xl font-bold">{stats.unpaid}</p>
              <p className="text-gray-600">{formatPrice(stats.unpaidAmount)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-yellow-500 text-sm font-medium">Pending</h3>
              <p className="text-2xl font-bold">{stats.pending}</p>
              <p className="text-gray-600">{formatPrice(stats.pendingAmount)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-purple-500 text-sm font-medium">Scanned</h3>
                <p className="text-2xl font-bold">{stats.scanned}</p>
                <p className="text-gray-600">{formatPrice(stats.scannedAmount)}</p>
            </div>
          </div>
          
          {/* Chart */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="text-lg font-medium mb-4">Payment Status Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Filter Controls */}
          <div className="flex gap-2 mb-4">
            <button 
                className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
                onClick={() => setFilter('all')}
            >
                All
            </button>
            <button 
                className={`px-4 py-2 rounded ${filter === 'Paid' ? 'bg-green-600 text-white' : 'bg-green-100'}`}
                onClick={() => setFilter('Paid')}
            >
                Paid
            </button>
            <button 
                className={`px-4 py-2 rounded ${filter === 'Unpaid' ? 'bg-red-600 text-white' : 'bg-red-100'}`}
                onClick={() => setFilter('Unpaid')}
            >
                Unpaid
            </button>
            <button 
                className={`px-4 py-2 rounded ${filter === 'Pending' ? 'bg-yellow-600 text-white' : 'bg-yellow-100'}`}
                onClick={() => setFilter('Pending')}
            >
                Pending
            </button>
            <button 
                className={`px-4 py-2 rounded ${filter === 'Scanned' ? 'bg-purple-600 text-white' : 'bg-purple-100'}`}
                onClick={() => setFilter('Scanned')}
            >
                Scanned
            </button>
        </div>
          
          {/* Transactions Table */}
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No transactions found</td>
                  </tr>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{transaction.name}</div>
                        <div className="text-sm text-gray-500">{transaction.email}</div>
                        <div className="text-sm text-gray-500">{transaction.whatsapp}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{transaction.ticket_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatPrice(transaction.price)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${transaction.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                            transaction.status === 'Unpaid' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.purchase_time ? formatDate(transaction.purchase_time) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link href={`/admin/transactions/${transaction.id}/edit`}>
                          <span className="text-indigo-600 hover:text-indigo-900 mr-4 cursor-pointer">Edit</span>
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(transaction)}
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
      
      {transactionToDelete && (
        <DeleteConfirmation
          item={transactionToDelete}
          itemType="transaction"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
}