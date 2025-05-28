import React from 'react';
import { MapPin, Clock, Calendar, Award } from 'lucide-react';

const InfoSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Información de Recolección</h2>
            
            <div className="mb-8">
              <h3 className="flex items-center text-xl font-semibold text-gray-700 mb-4">
                <MapPin className="mr-2 h-5 w-5 text-primary-500" />
                Puntos de Recolección
              </h3>
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  title="Nuestra Ubicación"
                  src="https://maps.app.goo.gl/YBN9QGqs4iRtGP4t8?g_st=aw"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="mt-4">
                <a 
                  href="https://maps.app.goo.gl/YBN9QGqs4iRtGP4t8?g_st=aw" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:text-primary-700 transition-colors duration-300 font-medium flex items-center"
                >
                  <MapPin className="h-4 w-4 mr-1" /> Ver en Google Maps
                </a>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="flex items-center text-xl font-semibold text-gray-700 mb-4">
                <Clock className="mr-2 h-5 w-5 text-primary-500" />
                Horarios de Operación
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 font-medium">Lunes - Viernes</td>
                      <td className="py-2 text-right">8:00 AM - 6:00 PM</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 font-medium">Sábado</td>
                      <td className="py-2 text-right">9:00 AM - 5:00 PM</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Domingo</td>
                      <td className="py-2 text-right">10:00 AM - 2:00 PM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Recycling center" 
                className="w-full h-64 object-cover object-center"
              />
              
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Resumen del Proyecto</h3>
                <p className="text-gray-600 mb-6">
                  Nuestra iniciativa de gestión de residuos de la comunidad se enfoca en reducir el desperdicio, 
                  aumentar las tasas de reciclaje y promover la concienciación ambiental a través de la educación y la transparencia de datos.
                </p>
                
                <h4 className="flex items-center text-lg font-semibold text-gray-700 mb-4">
                  <Calendar className="mr-2 h-5 w-5 text-primary-500" />
                  Cronología del Proyecto
                </h4>
                
                <div className="space-y-4">
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="h-4 w-4 rounded-full bg-primary-500"></div>
                      <div className="h-full w-0.5 bg-primary-500"></div>
                    </div>
                    <div>
                      <p className="font-semibold">Lanzamiento del Proyecto</p>
                      <p className="text-sm text-gray-500">Enero 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="h-4 w-4 rounded-full bg-primary-500"></div>
                      <div className="h-full w-0.5 bg-primary-500"></div>
                    </div>
                    <div>
                      <p className="font-semibold">Campaña de Outreach</p>
                      <p className="text-sm text-gray-500">Marzo 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="h-4 w-4 rounded-full bg-primary-500"></div>
                      <div className="h-full w-0.5 bg-primary-500"></div>
                    </div>
                    <div>
                      <p className="font-semibold">Primer hito: 25% de reducción</p>
                      <p className="text-sm text-gray-500">Julio 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="h-4 w-4 rounded-full bg-primary-500"></div>
                      <div className="h-full w-0.5 bg-gray-300"></div>
                    </div>
                    <div>
                      <p className="font-semibold">Evaluación Intermedia</p>
                      <p className="text-sm text-gray-500">Agosto 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="h-4 w-4 rounded-full bg-gray-300"></div>
                    </div>
                    <div>
                      <p className="font-semibold">Objetivo Final: 50% de reducción</p>
                      <p className="text-sm text-gray-500">Diciembre 2025</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="flex items-center text-lg font-semibold text-gray-700 mb-4">
                    <Award className="mr-2 h-5 w-5 text-primary-500" />
                    Hitos Clave
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Alcanzar el 50% de participación de la comunidad</li>
                    <li>Reducir el volumen de residuos en un 35%</li>
                    <li>Aumentar la tasa de reciclaje al 70%</li>
                    <li>Lanzar programa de educación en 5 escuelas locales</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;