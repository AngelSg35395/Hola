import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import DataInputForm from '@/components/Admin/DataInputForm';
import SurveyAnalytics from '@/components/Admin/SurveyAnalytics';
import DataConsole from '@/components/Admin/DataConsole';
import { useAuth } from '@/context/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user, loading } = useAuth();
  
  // If still loading auth state, show loading indicator
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <svg className="animate-spin h-10 w-10 text-primary-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-gray-600">Cargando...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <div className="bg-gray-100 py-8 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
            <p className="text-gray-600 mt-2">
              Administrar datos de residuos, ver análisis de encuestas y controlar el contenido del tablero.
            </p>
          </div>
          
          <div className="space-y-8">
            <DataInputForm />
            <SurveyAnalytics />
            <DataConsole />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;