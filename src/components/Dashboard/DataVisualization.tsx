import React from 'react';
import ChartContainer from './ChartContainer';

const DataVisualization: React.FC = () => {
  // Data for waste collected by type over time
  const wasteByTypeData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'PET',
        data: [65, 78, 82, 75, 92, 88],
        backgroundColor: 'rgba(58, 174, 95, 0.6)',
        borderColor: 'rgb(58, 174, 95)',
        borderWidth: 1,
      },
      {
        label: 'Cardboard',
        data: [45, 52, 49, 60, 55, 65],
        backgroundColor: 'rgba(39, 163, 210, 0.6)',
        borderColor: 'rgb(39, 163, 210)',
        borderWidth: 1,
      },
      {
        label: 'Cans',
        data: [28, 35, 39, 42, 40, 48],
        backgroundColor: 'rgba(246, 172, 57, 0.6)',
        borderColor: 'rgb(246, 172, 57)',
        borderWidth: 1,
      },
    ],
  };

  // Data for participation rates
  const participationData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Participation Rate (%)',
        data: [32, 39, 45, 53, 58, 65],
        backgroundColor: 'rgba(39, 163, 210, 0.2)',
        borderColor: 'rgb(39, 163, 210)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // Data for campaign impact
  const campaignImpactData = {
    labels: ['Awareness', 'Knowledge Gain', 'Behavior Change', 'Long-term Habits'],
    datasets: [
      {
        label: 'Pre-Campaign',
        data: [25, 20, 15, 10],
        backgroundColor: 'rgba(156, 163, 175, 0.6)',
        borderColor: 'rgb(156, 163, 175)',
        borderWidth: 1,
      },
      {
        label: 'Post-Campaign',
        data: [65, 55, 45, 40],
        backgroundColor: 'rgba(58, 174, 95, 0.6)',
        borderColor: 'rgb(58, 174, 95)',
        borderWidth: 1,
      },
    ],
  };

  // Data for misclassification rate
  const misclassificationData = {
    labels: ['PET', 'Cardboard', 'Cans', 'Glass', 'Other'],
    datasets: [
      {
        label: 'Misclassification Rate (%)',
        data: [12, 8, 15, 7, 22],
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

  // Data for daily costs
  const costData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Daily Costs ($)',
        data: [320, 295, 310, 285, 275, 260],
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2,
        tension: 0.3,
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

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Data Visualization</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Track our progress with real-time data visualization. Toggle between different chart 
            types to analyze waste collection, participation rates, and environmental impact metrics.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <ChartContainer
            title="Waste Collected by Type"
            description="Monthly totals in kilograms"
            data={wasteByTypeData}
            options={chartOptions}
            availableTypes={['bar', 'line']}
          />
          
          <ChartContainer
            title="Community Participation"
            description="Percentage of community members participating"
            data={participationData}
            options={chartOptions}
            defaultType="line"
            availableTypes={['bar', 'line']}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <ChartContainer
            title="Campaign Impact"
            description="Comparing pre and post-campaign metrics"
            data={campaignImpactData}
            options={chartOptions}
            availableTypes={['bar', 'line']}
          />
          
          <ChartContainer
            title="Misclassification Rate"
            description="Percentage of incorrectly sorted items by type"
            data={misclassificationData}
            options={chartOptions}
            defaultType="pie"
            availableTypes={['bar', 'pie']}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ChartContainer
            title="Daily Operational Costs"
            description="Average daily costs in USD"
            data={costData}
            options={chartOptions}
            defaultType="line"
            availableTypes={['bar', 'line']}
          />
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex flex-col justify-center items-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Need More Detailed Analysis?</h3>
            <p className="text-gray-600 text-center mb-6">
              Access our complete dataset for custom analysis and reporting.
            </p>
            <button className="bg-primary-500 text-white px-5 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-300 shadow-sm">
              Download Full Data (CSV)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataVisualization;