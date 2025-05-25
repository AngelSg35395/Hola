import React, { useState } from 'react';
import { Edit, Trash2, Plus, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import DynamicChart from '../components/charts/DynamicChart';
import StatsCounter from '../components/sections/StatsCounter';
import useAppStore from '../store';
import { ChartData, ChartType } from '../types';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';

const AdminDashboard: React.FC = () => {
  const { charts, updateChart, addChart, deleteChart } = useAppStore();
  
  const [editingChartId, setEditingChartId] = useState<string | null>(null);
  const [isAddingChart, setIsAddingChart] = useState(false);
  const [editedChart, setEditedChart] = useState<Partial<ChartData>>({});
  
  const handleEdit = (chart: ChartData) => {
    setEditingChartId(chart.id);
    setEditedChart({ ...chart });
  };
  
  const handleSave = () => {
    if (editingChartId) {
      updateChart(editingChartId, editedChart);
      setEditingChartId(null);
      setEditedChart({});
    } else if (isAddingChart && editedChart.title && editedChart.type) {
      addChart(editedChart as Omit<ChartData, 'id'>);
      setIsAddingChart(false);
      setEditedChart({});
    }
  };
  
  const handleCancel = () => {
    setEditingChartId(null);
    setIsAddingChart(false);
    setEditedChart({});
  };
  
  const handleDelete = (chartId: string) => {
    if (confirm('Are you sure you want to delete this chart?')) {
      deleteChart(chartId);
    }
  };
  
  const handleNewChart = () => {
    setIsAddingChart(true);
    setEditedChart({
      title: '',
      description: '',
      type: 'bar',
      labels: ['Label 1', 'Label 2', 'Label 3'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [10, 20, 30],
          backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        },
      ],
    });
  };
  
  const handleTypeChange = (chartId: string, type: ChartType) => {
    updateChart(chartId, { type });
  };
  
  const handleEditField = (field: string, value: string) => {
    setEditedChart(prev => ({
      ...prev,
      [field]: value,
    }));
  };
  
  const renderEditForm = () => {
    const chart = editedChart;
    
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{editingChartId ? 'Edit Chart' : 'Add New Chart'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <Input
                value={chart.title || ''}
                onChange={(e) => handleEditField('title', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Textarea
                value={chart.description || ''}
                onChange={(e) => handleEditField('description', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chart Type</label>
              <Select
                options={[
                  { value: 'bar', label: 'Bar Chart' },
                  { value: 'line', label: 'Line Chart' },
                  { value: 'pie', label: 'Pie Chart' },
                ]}
                value={chart.type || 'bar'}
                onChange={(e) => handleEditField('type', e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <StatsCounter />
        
        <div className="flex justify-between items-center mt-8 mb-4">
          <h2 className="text-2xl font-semibold">Charts & Data</h2>
          <Button onClick={handleNewChart} disabled={isAddingChart || editingChartId !== null}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Chart
          </Button>
        </div>
        
        {(isAddingChart || editingChartId !== null) && renderEditForm()}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {charts.map((chart) => (
            <div key={chart.id} className="relative">
              <DynamicChart 
                data={chart} 
                allowTypeChange={true}
                onTypeChange={(type) => handleTypeChange(chart.id, type)}
              />
              <div className="absolute top-4 right-4 flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                  onClick={() => handleEdit(chart)}
                  disabled={isAddingChart || editingChartId !== null}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
                  onClick={() => handleDelete(chart.id)}
                  disabled={isAddingChart || editingChartId !== null}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;