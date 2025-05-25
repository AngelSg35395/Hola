import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Eye, Download, FileText, TrendingUp, Users } from 'lucide-react';
import useAppStore from '../store';
import { formatNumber, formatDate } from '../lib/utils';
import { Line } from 'react-chartjs-2';

const AdminAnalytics: React.FC = () => {
  const { analyticsData, visitorStats } = useAppStore();
  
  const createLineChartData = (
    history: { date: string; count: number }[],
    label: string,
    color: string
  ) => {
    // Sort by date
    const sortedHistory = [...history].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    return {
      labels: sortedHistory.map(item => {
        const date = new Date(item.date);
        return `${date.getMonth() + 1}/${date.getDate()}`;
      }),
      datasets: [
        {
          label,
          data: sortedHistory.map(item => item.count),
          borderColor: color,
          backgroundColor: `${color}33`,
          fill: true,
          tension: 0.4,
        },
      ],
    };
  };
  
  const visitorChartData = createLineChartData(
    visitorStats.history,
    'Visitors',
    'rgb(59, 130, 246)'
  );
  
  const downloadChartData = createLineChartData(
    analyticsData.downloads.history,
    'Downloads',
    'rgb(16, 185, 129)'
  );
  
  const surveyChartData = createLineChartData(
    analyticsData.surveyResponses.history,
    'Survey Responses',
    'rgb(139, 92, 246)'
  );
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Visitors</p>
                  <p className="text-2xl font-bold">{formatNumber(visitorStats.total)}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500 mr-2">Today:</span>
                    <span className="text-sm font-medium">{formatNumber(visitorStats.today)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 mr-4">
                  <Download className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Downloads</p>
                  <p className="text-2xl font-bold">{formatNumber(analyticsData.downloads.total)}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500 mr-2">Most popular:</span>
                    <span className="text-sm font-medium truncate max-w-[160px]">
                      {analyticsData.downloads.byBrochure[0]?.title || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 mr-4">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Survey Responses</p>
                  <p className="text-2xl font-bold">{formatNumber(analyticsData.surveyResponses.total)}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500 mr-2">Last response:</span>
                    <span className="text-sm font-medium">
                      {analyticsData.surveyResponses.recent[0]
                        ? formatDate(analyticsData.surveyResponses.recent[0].createdAt)
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
                <CardTitle>Visitor Trends (30 Days)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <Line data={visitorChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Download className="mr-2 h-5 w-5 text-green-500" />
                <CardTitle>Download Trends (30 Days)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <Line data={downloadChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-purple-500" />
                <CardTitle>Survey Response Trends</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <Line data={surveyChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" />
                <CardTitle>Recent Survey Respondents</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.surveyResponses.recent.map((response) => (
                  <div key={response.id} className="flex justify-between items-center border-b pb-4">
                    <div>
                      <p className="font-medium">{response.respondent.name}</p>
                      <p className="text-sm text-gray-500">{response.respondent.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{formatDate(response.createdAt)}</p>
                      <p className="text-sm font-medium text-gray-700">
                        {response.answers.length} answers
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;