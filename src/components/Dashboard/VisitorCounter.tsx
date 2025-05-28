import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const VisitorCounter: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Simulating fetching visitor count from database
  useEffect(() => {
    const fetchVisitorCount = async () => {
      // In a real implementation, this would fetch data from Supabase
      // For now, we'll use mock data
      const randomCount = Math.floor(Math.random() * (150 - 120 + 1)) + 120;
      setVisitorCount(randomCount);
    };
    
    fetchVisitorCount();
    
    // Simulate visitor count updates
    const interval = setInterval(() => {
      setVisitorCount(prev => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        return Math.max(0, prev + change);
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div 
      className={`fixed bottom-4 right-4 z-40 transition-transform duration-300 ${
        isVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="relative">
        <button
          onClick={toggleVisibility}
          className="absolute -left-10 top-0 bg-primary-500 text-white h-10 w-10 flex items-center justify-center rounded-l-lg"
        >
          <Users className="h-5 w-5" />
        </button>
        
        <div className="bg-white rounded-lg shadow-lg p-3 flex items-center border border-gray-200">
          <div>
            <p className="text-xs text-gray-500 font-medium">ACTIVE VISITORS</p>
            <p className="text-2xl font-bold text-primary-600">{visitorCount}</p>
          </div>
          <div className="ml-3 flex flex-col items-center">
            <span className="inline-block h-2 w-2 rounded-full bg-success-500 animate-pulse-slow"></span>
            <span className="text-xs text-gray-500 mt-1">LIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorCounter;