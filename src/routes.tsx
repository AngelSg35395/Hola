import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import WasteMetrics from '@/components/dashboard/WasteMetrics';
import CampaignImpact from '@/components/dashboard/CampaignImpact';
import DailyCollection from '@/components/dashboard/DailyCollection';
import Expenses from '@/components/dashboard/Expenses';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  return session ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      }>
        <Route path="waste-metrics" element={<WasteMetrics />} />
        <Route path="campaign-impact" element={<CampaignImpact />} />
        <Route path="daily-collection" element={<DailyCollection />} />
        <Route path="expenses" element={<Expenses />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}