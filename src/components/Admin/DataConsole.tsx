import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Pencil, Trash, Save, X, PlusCircle, FileDown, FileUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface WasteDataEntry {
  id: string;
  date: string;
  petAmount: number;
  cardboardAmount: number;
  cansAmount: number;
  glassAmount: number;
  otherAmount: number;
  participationRate: number;
  misclassificationRate: number;
  campaignReach: number;
  costs: number;
}

const DataConsole: React.FC = () => {
  const [data, setData] = useState<WasteDataEntry[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<WasteDataEntry>>({});
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      // In a real implementation, this would fetch data from Supabase
      // For now, we'll use mock data
      setIsLoading(true);
      
      const mockData: WasteDataEntry[] = [
        {
          id: '1',
          date: '2025-05-01',
          petAmount: 65,
          cardboardAmount: 45,
          cansAmount: 28,
          glassAmount: 32,
          otherAmount: 15,
          participationRate: 68,
          misclassificationRate: 12,
          campaignReach: 320,
          costs: 285,
        },
        {
          id: '2',
          date: '2025-05-02',
          petAmount: 72,
          cardboardAmount: 51,
          cansAmount: 31,
          glassAmount: 28,
          otherAmount: 18,
          participationRate: 70,
          misclassificationRate: 10,
          campaignReach: 345,
          costs: 275,
        },
        {
          id: '3',
          date: '2025-05-03',
          petAmount: 68,
          cardboardAmount: 48,
          cansAmount: 29,
          glassAmount: 35,
          otherAmount: 14,
          participationRate: 71,
          misclassificationRate: 11,
          campaignReach: 355,
          costs: 290,
        },
      ];
      
      setData(mockData);
      setIsLoading(false);
    };
    
    fetchData();
  }, []);
  
  // Handle edit click
  const handleEditClick = (entry: WasteDataEntry) => {
    setEditingId(entry.id);
    setEditFormData(entry);
  };
  
  // Handle form field change
  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Convert numeric fields to numbers
    const numericFields = [
      'petAmount', 'cardboardAmount', 'cansAmount', 'glassAmount', 
      'otherAmount', 'participationRate', 'misclassificationRate', 
      'campaignReach', 'costs'
    ];
    
    setEditFormData(prev => ({
      ...prev,
      [name]: numericFields.includes(name) ? parseFloat(value) : value,
    }));
  };
  
  // Handle save
  const handleSaveClick = async (id: string) => {
    const updatedData = data.map(item => 
      item.id === id ? { ...item, ...editFormData } : item
    );
    
    // In a real implementation, this would update Supabase
    // For now, we'll just update the local state
    setData(updatedData);
    setEditingId(null);
    setEditFormData({});
  };
  
  // Handle delete
  const handleDeleteClick = async (id: string) => {
    // In a real implementation, this would delete from Supabase
    // For now, we'll just update the local state
    setData(data.filter(item => item.id !== id));
  };
  
  // Handle add new entry
  const handleAddNewClick = () => {
    const newId = (Math.max(...data.map(item => parseInt(item.id))) + 1).toString();
    const newEntry: WasteDataEntry = {
      id: newId,
      date: new Date().toISOString().split('T')[0],
      petAmount: 0,
      cardboardAmount: 0,
      cansAmount: 0,
      glassAmount: 0,
      otherAmount: 0,
      participationRate: 0,
      misclassificationRate: 0,
      campaignReach: 0,
      costs: 0,
    };
    
    setData([...data, newEntry]);
    setEditingId(newId);
    setEditFormData(newEntry);
  };
  
  // Export data as CSV
  const handleExportCSV = () => {
    const headers = [
      'id', 'date', 'petAmount', 'cardboardAmount', 'cansAmount', 
      'glassAmount', 'otherAmount', 'participationRate', 
      'misclassificationRate', 'campaignReach', 'costs'
    ];
    
    const csvRows = [
      headers.join(','),
      ...data.map(row => headers.map(header => row[header as keyof WasteDataEntry]).join(','))
    ];
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'waste_data.csv');
    link.click();
  };
  
  // Total calculations
  const totals = data.reduce((acc, entry) => {
    return {
      petAmount: acc.petAmount + entry.petAmount,
      cardboardAmount: acc.cardboardAmount + entry.cardboardAmount,
      cansAmount: acc.cansAmount + entry.cansAmount,
      glassAmount: acc.glassAmount + entry.glassAmount,
      otherAmount: acc.otherAmount + entry.otherAmount,
      costs: acc.costs + entry.costs,
    };
  }, {
    petAmount: 0,
    cardboardAmount: 0,
    cansAmount: 0,
    glassAmount: 0,
    otherAmount: 0,
    costs: 0,
  });
  
  // Render table header
  const renderTableHeader = () => (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Fecha
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          PET (kg)
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Cartón (kg)
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Latas (kg)
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Vidrio (kg)
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Otros (kg)
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Participación (%)
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Clasificación Incorrecta (%)
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Alcance
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Costos ($)
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Acciones
        </th>
      </tr>
    </thead>
  );
  
  // Render table footer with totals
  const renderTableFooter = () => (
    <tfoot className="bg-gray-50 font-medium">
      <tr>
        <td className="px-4 py-3 text-left text-sm text-gray-700">
          Total
        </td>
        <td className="px-4 py-3 text-left text-sm text-gray-700">
          {totals.petAmount.toFixed(1)}
        </td>
        <td className="px-4 py-3 text-left text-sm text-gray-700">
          {totals.cardboardAmount.toFixed(1)}
        </td>
        <td className="px-4 py-3 text-left text-sm text-gray-700">
          {totals.cansAmount.toFixed(1)}
        </td>
        <td className="px-4 py-3 text-left text-sm text-gray-700">
          {totals.glassAmount.toFixed(1)}
        </td>
        <td className="px-4 py-3 text-left text-sm text-gray-700">
          {totals.otherAmount.toFixed(1)}
        </td>
        <td className="px-4 py-3 text-left text-sm text-gray-700">
          -
        </td>
        <td className="px-4 py-3 text-left text-sm text-gray-700">
          -
        </td>
        <td className="px-4 py-3 text-left text-sm text-gray-700">
          -
        </td>
        <td className="px-4 py-3 text-left text-sm text-gray-700">
          {totals.costs.toFixed(2)}
        </td>
        <td className="px-4 py-3 text-left text-sm text-gray-700">
          -
        </td>
      </tr>
    </tfoot>
  );
  
  // Render editable row
  const renderEditableRow = (entry: WasteDataEntry) => (
    <tr key={entry.id} className="bg-blue-50">
      <td className="px-4 py-3 text-sm text-gray-700">
        <input
          type="date"
          name="date"
          value={editFormData.date || ''}
          onChange={handleEditFormChange}
          className="w-full px-2 py-1 border rounded-md"
        />
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">
        <input
          type="number"
          name="petAmount"
          value={editFormData.petAmount || 0}
          onChange={handleEditFormChange}
          className="w-full px-2 py-1 border rounded-md"
        />
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">
        <input
          type="number"
          name="cardboardAmount"
          value={editFormData.cardboardAmount || 0}
          onChange={handleEditFormChange}
          className="w-full px-2 py-1 border rounded-md"
        />
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">
        <input
          type="number"
          name="cansAmount"
          value={editFormData.cansAmount || 0}
          onChange={handleEditFormChange}
          className="w-full px-2 py-1 border rounded-md"
        />
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">
        <input
          type="number"
          name="glassAmount"
          value={editFormData.glassAmount || 0}
          onChange={handleEditFormChange}
          className="w-full px-2 py-1 border rounded-md"
        />
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">
        <input
          type="number"
          name="otherAmount"
          value={editFormData.otherAmount || 0}
          onChange={handleEditFormChange}
          className="w-full px-2 py-1 border rounded-md"
        />
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">
        <input
          type="number"
          name="participationRate"
          value={editFormData.participationRate || 0}
          onChange={handleEditFormChange}
          className="w-full px-2 py-1 border rounded-md"
        />
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">
        <input
          type="number"
          name="misclassificationRate"
          value={editFormData.misclassificationRate || 0}
          onChange={handleEditFormChange}
          className="w-full px-2 py-1 border rounded-md"
        />
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">
        <input
          type="number"
          name="campaignReach"
          value={editFormData.campaignReach || 0}
          onChange={handleEditFormChange}
          className="w-full px-2 py-1 border rounded-md"
        />
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">
        <input
          type="number"
          name="costs"
          value={editFormData.costs || 0}
          onChange={handleEditFormChange}
          className="w-full px-2 py-1 border rounded-md"
        />
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">
        <div className="flex space-x-2">
          <button
            onClick={() => handleSaveClick(entry.id)}
            className="text-primary-500 hover:text-primary-700"
          >
            <Save className="h-5 w-5" />
          </button>
          <button
            onClick={() => setEditingId(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
  
  // Render read-only row
  const renderReadOnlyRow = (entry: WasteDataEntry) => (
    <tr key={entry.id} className="hover:bg-gray-50">
      <td className="px-4 py-3 text-sm text-gray-700">
        {format(new Date(entry.date), 'MMM dd, yyyy')}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">
        {entry.petAmount.toFixed(1)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">
        {entry.cardboardAmount.toFixed(1)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">
        {entry.cansAmount.toFixed(1)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">
        {entry.glassAmount.toFixed(1)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">
        {entry.otherAmount.toFixed(1)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">
        {entry.participationRate.toFixed(1)}%
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">
        {entry.misclassificationRate.toFixed(1)}%
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">
        {entry.campaignReach}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">
        ${entry.costs.toFixed(2)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditClick(entry)}
            className="text-secondary-500 hover:text-secondary-700"
          >
            <Pencil className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleDeleteClick(entry.id)}
            className="text-error-500 hover:text-error-700"
          >
            <Trash className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Consola de Gestión de Datos</h2>
        
        <div className="flex space-x-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <FileDown className="h-4 w-4 mr-2" />
            Exportar CSV
          </button>
          <button
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <FileUp className="h-4 w-4 mr-2" />
            Importar Datos
          </button>
          <button
            onClick={handleAddNewClick}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-md hover:bg-primary-600"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Añadir Nueva Entrada
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="py-12 text-center">
            <svg className="animate-spin h-8 w-8 text-primary-500 mx-auto\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
              <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-2 text-gray-500">Cargando datos...</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            {renderTableHeader()}
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map(entry => (
                editingId === entry.id
                  ? renderEditableRow(entry)
                  : renderReadOnlyRow(entry)
              ))}
            </tbody>
            {renderTableFooter()}
          </table>
        )}
      </div>
    </div>
  );
};

export default DataConsole;