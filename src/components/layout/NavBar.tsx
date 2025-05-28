import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Recycle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Recycle className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-lg font-semibold text-gray-900">EcoTrack</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/' 
                    ? 'text-primary-500 bg-primary-50' 
                    : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
                } transition duration-300`}
              >
                Dashboard
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/admin" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname.startsWith('/admin') 
                        ? 'text-primary-500 bg-primary-50' 
                        : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
                    } transition duration-300`}
                  >
                    Admin
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition duration-300"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/login' 
                      ? 'text-primary-500 bg-primary-50' 
                      : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
                  } transition duration-300`}
                >
                  Admin Login
                </Link>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/' 
                  ? 'text-primary-500 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
              } transition duration-300`}
            >
              Dashboard
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/admin" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname.startsWith('/admin') 
                      ? 'text-primary-500 bg-primary-50' 
                      : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
                  } transition duration-300`}
                >
                  Admin
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition duration-300"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/login' 
                    ? 'text-primary-500 bg-primary-50' 
                    : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
                } transition duration-300`}
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;