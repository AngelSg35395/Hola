import React from 'react';
import { BarChart, PieChart, LineChart } from 'lucide-react';

type ChartType = 'bar' | 'line' | 'pie';

interface ChartToggleProps {
  activeType: ChartType;
  onChange: (type: ChartType) => void;
}

const ChartToggle: React.FC<ChartToggleProps> = ({ activeType, onChange }) => {
  return (
    <div className="inline-flex bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => onChange('bar')}
        className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
          activeType === 'bar'
            ? 'bg-white text-primary-600 shadow-sm'
            : 'text-gray-600 hover:text-primary-600'
        }`}
      >
        <BarChart className="h-4 w-4 mr-1" />
        Bar
      </button>
      
      <button
        onClick={() => onChange('line')}
        className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
          activeType === 'line'
            ? 'bg-white text-primary-600 shadow-sm'
            : 'text-gray-600 hover:text-primary-600'
        }`}
      >
        <LineChart className="h-4 w-4 mr-1" />
        Line
      </button>
      
      <button
        onClick={() => onChange('pie')}
        className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
          activeType === 'pie'
            ? 'bg-white text-primary-600 shadow-sm'
            : 'text-gray-600 hover:text-primary-600'
        }`}
      >
        <PieChart className="h-4 w-4 mr-1" />
        Pie
      </button>
    </div>
  );
};

export default ChartToggle;