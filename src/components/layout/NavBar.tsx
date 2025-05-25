import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart, Users, FileText, Settings, Home, LogOut } from 'lucide-react';
import useAppStore from '../../store';
import { cn } from '../../lib/utils';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  admin?: boolean;
}

const NavBar: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAppStore();
  
  const navItems: NavItem[] = [
    {
      label: 'Home',
      path: '/',
      icon: <Home className="h-5 w-5" />,
    },
    {
      label: 'Dashboard',
      path: '/admin',
      icon: <BarChart className="h-5 w-5" />,
      admin: true,
    },
    {
      label: 'Survey Responses',
      path: '/admin/survey',
      icon: <FileText className="h-5 w-5" />,
      admin: true,
    },
    {
      label: 'User Engagement',
      path: '/admin/analytics',
      icon: <Users className="h-5 w-5" />,
      admin: true,
    },
    {
      label: 'Settings',
      path: '/admin/settings',
      icon: <Settings className="h-5 w-5" />,
      admin: true,
    },
  ];
  
  const filteredNavItems = navItems.filter(item => 
    !item.admin || (item.admin && isAuthenticated)
  );
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/" className="flex items-center space-x-2">
                <BarChart className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-gray-900">DataViz</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'inline-flex items-center px-1 pt-1 text-sm font-medium',
                    location.pathname === item.path
                      ? 'border-b-2 border-primary text-gray-900'
                      : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  )}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated && (
              <button
                onClick={logout}
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <LogOut className="mr-1 h-5 w-5" />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;