import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { ChartData, ChartType } from '../../types';
import Select from '../ui/Select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Download, BarChart, LineChart, PieChart } from 'lucide-react';
import Button from '../ui/Button';

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title
);

interface DynamicChartProps {
  data: ChartData;
  allowTypeChange?: boolean;
  onTypeChange?: (type: ChartType) => void;
  className?: string;
}

const DynamicChart: React.FC<DynamicChartProps> = ({ 
  data, 
  allowTypeChange = false, 
  onTypeChange,
  className 
}) => {
  const [chartType, setChartType] = useState<ChartType>(data.type);
  
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as ChartType;
    setChartType(newType);
    if (onTypeChange) {
      onTypeChange(newType);
    }
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
  };
  
  const chartData = {
    labels: data.labels,
    datasets: data.datasets,
  };
  
  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar data={chartData} options={chartOptions} />;
      case 'line':
        return <Line data={chartData} options={chartOptions} />;
      case 'pie':
      case 'doughnut':
        return <Pie data={chartData} options={chartOptions} />;
      default:
        return <Bar data={chartData} options={chartOptions} />;
    }
  };
  
  const getChartTypeIcon = () => {
    switch (chartType) {
      case 'bar':
        return <BarChart className="h-4 w-4" />;
      case 'line':
        return <LineChart className="h-4 w-4" />;
      case 'pie':
      case 'doughnut':
        return <PieChart className="h-4 w-4" />;
      default:
        return <BarChart className="h-4 w-4" />;
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">{data.title}</CardTitle>
        <div className="flex items-center gap-2">
          {allowTypeChange && (
            <div className="flex items-center gap-1">
              {getChartTypeIcon()}
              <Select
                options={[
                  { value: 'bar', label: 'Bar' },
                  { value: 'line', label: 'Line' },
                  { value: 'pie', label: 'Pie' },
                ]}
                value={chartType}
                onChange={handleTypeChange}
                className="h-8 w-24 text-xs"
              />
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            title="Download"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">{renderChart()}</div>
      </CardContent>
      {data.description && (
        <CardFooter>
          <p className="text-sm text-muted-foreground">{data.description}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default DynamicChart;