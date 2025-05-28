import React, { useState, useEffect } from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const PDFSection: React.FC = () => {
  const [downloadCount, setDownloadCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);

  // Simulating fetching view/download stats
  useEffect(() => {
    const fetchStats = async () => {
      // In a real implementation, this would fetch data from Supabase
      // For now, we'll use mock data
      setDownloadCount(124);
      setViewCount(348);
    };
    
    fetchStats();
  }, []);

  const handleDownload = async () => {
    // In a real implementation, this would log the download to Supabase
    // and increment the counter
    setDownloadCount(prev => prev + 1);
    
    // Simulate PDF download
    window.open('https://example.com/brochure.pdf', '_blank');
  };

  const handleView = async () => {
    // In a real implementation, this would log the view to Supabase
    // and increment the counter
    setViewCount(prev => prev + 1);
    
    // Simulate PDF view
    window.open('https://example.com/brochure.pdf', '_blank');
  };

  return (
    <section className="py-16 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:grid md:grid-cols-5">
            <div className="bg-primary-600 text-white p-10 flex flex-col justify-center items-center md:col-span-2">
              <FileText className="h-16 w-16 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Waste Management Guide</h2>
              <p className="text-center text-primary-100 mb-6">
                Download our comprehensive guide to learn about waste reduction, 
                recycling best practices, and how to get involved in our community initiatives.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={handleDownload}
                  className="bg-white text-primary-600 px-4 py-2 rounded-lg flex items-center hover:bg-primary-50 transition-colors duration-300"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
                <button
                  onClick={handleView}
                  className="bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center hover:bg-primary-800 transition-colors duration-300"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View PDF
                </button>
              </div>
            </div>
            
            <div className="p-10 md:col-span-3">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">What's Inside?</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-1 mr-3 mt-0.5">
                    <span className="block h-2 w-2 rounded-full bg-primary-500"></span>
                  </div>
                  <span className="text-gray-700">Step-by-step recycling guide for different materials</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-1 mr-3 mt-0.5">
                    <span className="block h-2 w-2 rounded-full bg-primary-500"></span>
                  </div>
                  <span className="text-gray-700">Tips for reducing household waste</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-1 mr-3 mt-0.5">
                    <span className="block h-2 w-2 rounded-full bg-primary-500"></span>
                  </div>
                  <span className="text-gray-700">Community success stories and case studies</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-1 mr-3 mt-0.5">
                    <span className="block h-2 w-2 rounded-full bg-primary-500"></span>
                  </div>
                  <span className="text-gray-700">Collection point locations and operating hours</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-1 mr-3 mt-0.5">
                    <span className="block h-2 w-2 rounded-full bg-primary-500"></span>
                  </div>
                  <span className="text-gray-700">Calendar of upcoming events and workshops</span>
                </li>
              </ul>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">DOWNLOADS</h4>
                    <p className="text-2xl font-bold text-primary-600">{downloadCount}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">VIEWS</h4>
                    <p className="text-2xl font-bold text-secondary-600">{viewCount}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">FORMAT</h4>
                    <p className="text-lg font-semibold text-gray-700">PDF (2.4MB)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PDFSection;