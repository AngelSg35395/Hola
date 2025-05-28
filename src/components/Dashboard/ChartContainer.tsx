import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartToggle from './ChartToggle';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type ChartType = 'bar' | 'line' | 'pie';

interface ChartContainerProps {
  title: string;
  description?: string;
  data: any;
  options?: any;
  availableTypes?: ChartType[];
  defaultType?: ChartType;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  description,
  data,
  options = {},
  availableTypes = ['bar', 'line', 'pie'],
  defaultType = 'bar',
}) => {
  const [chartType, setChartType] = useState<ChartType>(defaultType);

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar data={data} options={options} />;
      case 'line':
        return <Line data={data} options={options} />;
      case 'pie':
        return <Pie data={data} options={options} />;
      default:
        return <Bar data={data} options={options} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 animate-fade-in">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
        
        {availableTypes.length > 1 && (
          <ChartToggle
            activeType={chartType}
            onChange={(type) => setChartType(type)}
          />
        )}
      </div>
      
      <div className="h-64 md:h-80">
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartContainer;