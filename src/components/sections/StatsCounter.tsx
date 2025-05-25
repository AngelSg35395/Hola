import React, { useEffect } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Users, Download, FileText } from 'lucide-react';
import useAppStore from '../../store';
import { formatNumber } from '../../lib/utils';

const StatsCounter: React.FC = () => {
  const { visitorStats, brochures, surveyResponses, incrementVisitor } = useAppStore();
  
  useEffect(() => {
    // Increment visitor count when component mounts
    incrementVisitor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const totalDownloads = brochures.reduce((sum, brochure) => sum + brochure.downloadCount, 0);
  
  const stats = [
    {
      label: 'Visitors',
      value: visitorStats.total,
      icon: <Users className="h-6 w-6 text-blue-500" />,
      color: 'bg-blue-50',
    },
    {
      label: 'Downloads',
      value: totalDownloads,
      icon: <Download className="h-6 w-6 text-green-500" />,
      color: 'bg-green-50',
    },
    {
      label: 'Survey Responses',
      value: surveyResponses.length,
      icon: <FileText className="h-6 w-6 text-purple-500" />,
      color: 'bg-purple-50',
    },
  ];
  
  return (
    <div className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className={`border-none ${stat.color}`}>
            <CardContent className="p-4 flex items-center">
              <div className="p-3 rounded-full mr-4">{stat.icon}</div>
              <div>
                <p className="text-2xl font-bold">{formatNumber(stat.value)}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StatsCounter;