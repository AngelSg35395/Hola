import React from 'react';
import { Github, Twitter, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h2 className="mb-4 text-lg font-semibold">About Us</h2>
            <p className="text-gray-400">
              We're dedicated to creating sustainable environmental solutions through
              data-driven insights and community engagement.
            </p>
          </div>
          <div>
            <h2 className="mb-4 text-lg font-semibold">Quick Links</h2>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">About</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">Contact</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white">Admin Login</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-lg font-semibold">Contact Info</h2>
            <ul className="space-y-2 text-gray-400">
              <li>123 Environmental Way</li>
              <li>Green City, Earth 12345</li>
              <li>info@dataviz.org</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-lg font-semibold">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 DataViz Project. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;