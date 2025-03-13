'use client';
import { useState, useEffect } from 'react';

// Import icons from lucide-react (if you have it)
// If you don't have lucide-react, you can replace with simple text or your preferred icons
const IconNewspaper = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>;
const IconUsers = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const IconStore = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const IconCalendarClock = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /><circle cx="12" cy="14" r="3" /></svg>;

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    newsCount: 0,
    guestsCount: 0,
    partnersCount: 0,
  });
  
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const [eventDate, setEventDate] = useState(() => {
    // Try to get from localStorage or use default (7 days from now)
    const savedDate = localStorage.getItem('metavfestEventDate');
    return savedDate ? new Date(savedDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [tempEventDate, setTempEventDate] = useState('');

  // Fetch counts from API
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const newsRes = await fetch('/api/news/count');
        const guestsRes = await fetch('/api/guests/count');
        const partnersRes = await fetch('/api/partners/count');
        
        if (newsRes.ok && guestsRes.ok && partnersRes.ok) {
          const newsData = await newsRes.json();
          const guestsData = await guestsRes.json();
          const partnersData = await partnersRes.json();
          
          setStats({
            newsCount: newsData.count,
            guestsCount: guestsData.count,
            partnersCount: partnersData.count,
          });
        }
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };
    
    fetchCounts();
    
    // Poll for updates every 5 minutes
    const interval = setInterval(fetchCounts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Update countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = eventDate.getTime() - now.getTime();
      
      if (diff <= 0) {
        // Event has passed
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
    };
    
    // Update immediately and then every second
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [eventDate]);
  
  // Save event date to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('metavfestEventDate', eventDate.toISOString());
  }, [eventDate]);
  
  const handleSaveDate = () => {
    try {
      const newDate = new Date(tempEventDate);
      if (!isNaN(newDate.getTime())) {
        setEventDate(newDate);
        setIsEditing(false);
      } else {
        alert('Please enter a valid date');
      }
    } catch (error) {
      alert('Invalid date format');
    }
  };
  
  const handleEditClick = () => {
    setTempEventDate(eventDate.toISOString().substring(0, 16));
    setIsEditing(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* MetaVFest Countdown */}
      <div className="mb-8 bg-gradient-to-r from-azureRadiance to-segaSunset rounded-lg p-6 text-white shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">MetaVFest Countdown</h2>
          {!isEditing ? (
            <button 
              onClick={handleEditClick}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-sm transition"
            >
              Edit Date
            </button>
          ) : (
            <div className="flex gap-2">
              <input
                type="datetime-local"
                value={tempEventDate}
                onChange={(e) => setTempEventDate(e.target.value)}
                className="text-black px-2 py-1 rounded text-sm"
              />
              <button 
                onClick={handleSaveDate}
                className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-sm transition"
              >
                Save
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-sm transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        
        <p className="mb-4">
          Event starts on: {eventDate.toLocaleString()}
        </p>
        
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-4xl font-bold">{countdown.days}</div>
            <div className="text-xs uppercase tracking-wider mt-1">Days</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-4xl font-bold">{countdown.hours}</div>
            <div className="text-xs uppercase tracking-wider mt-1">Hours</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-4xl font-bold">{countdown.minutes}</div>
            <div className="text-xs uppercase tracking-wider mt-1">Minutes</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-4xl font-bold">{countdown.seconds}</div>
            <div className="text-xs uppercase tracking-wider mt-1">Seconds</div>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* News Card */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-gray-500">Total News</h3>
            <IconNewspaper />
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.newsCount}</div>
            <p className="text-xs text-gray-500 mt-1">
              Published articles and updates
            </p>
          </div>
        </div>
        
        {/* Guests Card */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Guests</h3>
            <IconUsers />
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.guestsCount}</div>
            <p className="text-xs text-gray-500 mt-1">
              Registered event participants
            </p>
          </div>
        </div>
        
        {/* Partners Card */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Partners</h3>
            <IconStore />
          </div>
          <div>
            <div className="text-2xl font-bold">{stats.partnersCount}</div>
            <p className="text-xs text-gray-500 mt-1">
              Affiliated sponsors and partners
            </p>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="p-4 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition flex items-center justify-center gap-2">
          <IconNewspaper />
          Add New Article
        </button>
        <button className="p-4 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg transition flex items-center justify-center gap-2">
          <IconUsers />
          Manage Guests
        </button>
        <button className="p-4 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg transition flex items-center justify-center gap-2">
          <IconStore />
          Manage Partners
        </button>
        <button className="p-4 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg transition flex items-center justify-center gap-2">
          <IconCalendarClock />
          Event Settings
        </button>
      </div>
    </div>
  );
}