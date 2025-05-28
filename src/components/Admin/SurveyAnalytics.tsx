import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import ChartToggle from '../Dashboard/ChartToggle';
import { supabase } from '../../lib/supabase';

type ChartType = 'bar' | 'line' | 'pie';

const SurveyAnalytics: React.FC = () => {
  const [chartType, setChartType] = useState<ChartType>('pie');
  
  // Mock survey data
  const participationData = {
    labels: ['Daily', 'Weekly', 'Monthly', 'Rarely', 'Never'],
    datasets: [
      {
        label: 'Participation Frequency',
        data: [35, 42, 18, 4, 1],
        backgroundColor: [
          'rgba(58, 174, 95, 0.6)',
          'rgba(39, 163, 210, 0.6)',
          'rgba(246, 172, 57, 0.6)',
          'rgba(239, 68, 68, 0.6)',
          'rgba(107, 114, 128, 0.6)',
        ],
        borderColor: [
          'rgb(58, 174, 95)',
          'rgb(39, 163, 210)',
          'rgb(246, 172, 57)',
          'rgb(239, 68, 68)',
          'rgb(107, 114, 128)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const satisfactionData = {
    labels: ['1 (Poor)', '2', '3', '4', '5 (Excellent)'],
    datasets: [
      {
        label: 'Satisfaction Level',
        data: [5, 12, 28, 38, 17],
        backgroundColor: [
          'rgba(239, 68, 68, 0.6)',
          'rgba(246, 172, 57, 0.6)',
          'rgba(107, 114, 128, 0.6)',
          'rgba(39, 163, 210, 0.6)',
          'rgba(58, 174, 95, 0.6)',
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(246, 172, 57)',
          'rgb(107, 114, 128)',
          'rgb(39, 163, 210)',
          'rgb(58, 174, 95)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const demographicData = {
    labels: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
    datasets: [
      {
        label: 'Age Distribution',
        data: [12, 25, 22, 18, 15, 8],
        backgroundColor: 'rgba(39, 163, 210, 0.6)',
        borderColor: 'rgb(39, 163, 210)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  // Render chart based on type
  const renderChart = (data: any, type: ChartType) => {
    switch (type) {
      case 'bar':
        return <Bar data={data} options={chartOptions} />;
      case 'pie':
        return <Pie data={data} options={chartOptions} />;
      default:
        return <Bar data={data} options={chartOptions} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Survey Analytics</h2>
        
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-3">Chart Type:</span>
          <ChartToggle
            activeType={chartType}
            onChange={(type) => setChartType(type)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">Participation Frequency</h3>
          <div className="h-64">{renderChart(participationData, chartType)}</div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">Satisfaction Level</h3>
          <div className="h-64">{renderChart(satisfactionData, chartType)}</div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">Demographics</h3>
        <div className="h-64">{renderChart(demographicData, 'bar')}</div>
      </div>
      
      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Key Insights</h3>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start">
            <div className="bg-primary-100 rounded-full p-1 mr-3 mt-0.5">
              <span className="block h-2 w-2 rounded-full bg-primary-500"></span>
            </div>
            <span>77% of respondents participate in recycling at least weekly</span>
          </li>
          <li className="flex items-start">
            <div className="bg-primary-100 rounded-full p-1 mr-3 mt-0.5">
              <span className="block h-2 w-2 rounded-full bg-primary-500"></span>
            </div>
            <span>Satisfaction levels are generally high, with 55% rating the program 4 or 5</span>
          </li>
          <li className="flex items-start">
            <div className="bg-primary-100 rounded-full p-1 mr-3 mt-0.5">
              <span className="block h-2 w-2 rounded-full bg-primary-500"></span>
            </div>
            <span>The 25-34 age group has the highest participation rate</span>
          </li>
          <li className="flex items-start">
            <div className="bg-primary-100 rounded-full p-1 mr-3 mt-0.5">
              <span className="block h-2 w-2 rounded-full bg-primary-500"></span>
            </div>
            <span>Most common suggestion: More collection points needed in residential areas</span>
          </li>
        </ul>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button className="px-4 py-2 text-primary-500 hover:text-primary-600 transition-colors duration-300 flex items-center">
          <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          Export Report (CSV)
        </button>
      </div>
    </div>
  );
};

export default SurveyAnalytics;