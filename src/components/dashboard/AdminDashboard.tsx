import { Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const getActiveTab = () => {
    const path = location.pathname.split('/').pop();
    return path || 'waste-metrics';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
          <Button variant="outline" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={getActiveTab()} className="mb-8">
          <TabsList>
            <TabsTrigger value="waste-metrics" onClick={() => navigate('/admin/waste-metrics')}>
              Métricas de Residuos
            </TabsTrigger>
            <TabsTrigger value="campaign-impact" onClick={() => navigate('/admin/campaign-impact')}>
              Impacto de Campañas
            </TabsTrigger>
            <TabsTrigger value="daily-collection" onClick={() => navigate('/admin/daily-collection')}>
              Recolección Diaria
            </TabsTrigger>
            <TabsTrigger value="expenses" onClick={() => navigate('/admin/expenses')}>
              Gastos
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="bg-white shadow rounded-lg p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}