import React from 'react';
import { Recycle, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center">
              <Recycle className="h-8 w-8 text-primary-400" />
              <span className="ml-2 text-xl font-bold">ReciPCL</span>
            </div>
            <p className="mt-4 text-gray-300">
              Empoderar a las comunidades para rastrear y reducir el desperdicio a través de ideas basadas en datos y esfuerzos de colaboración.
            </p>
            <div className="mt-6">
              <a 
                href="https://maps.app.goo.gl/YBN9QGqs4iRtGP4t8?g_st=aw" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-400 hover:text-primary-300 transition duration-300"
              >
                <MapPin className="h-5 w-5 mr-2" />
                <span>Encuentra Puntos de Recolección</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contactanos</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary-400" />
                <span>info@ReciPCL.example.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary-400" />
                <span>
                  Parque Rancho Banthi
                  Calle Prol. Benito Juárez
                  Banthi, 76804
                  San Juan del Río, Qro.</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Horarios de Operación</h3>
            <table className="w-full text-left">
              <tbody>
                <tr>
                  <td className="py-1 pr-4 text-gray-300">Lunes - Viernes</td>
                  <td className="py-1">8:00 AM - 6:00 PM</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 text-gray-300">Sábado</td>
                  <td className="py-1">9:00 AM - 5:00 PM</td>
                </tr>
                <tr>
                  <td className="py-1 pr-4 text-gray-300">Domingo</td>
                  <td className="py-1">10:00 AM - 2:00 PM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ReciPCL. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;