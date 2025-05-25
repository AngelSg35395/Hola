import { Outlet } from 'react-router-dom';
import { Navigation } from '@/components/ui/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminDashboard() {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation onSignOut={signOut} />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}