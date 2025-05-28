import React from 'react';
import { BarChart3, Recycle } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 flex items-center justify-center md:justify-start">
              <Recycle className="inline-block h-10 w-10 mr-2 text-accent-300" />
              <span>ReciPCL</span>
            </h1>
            <p className="text-xl text-gray-100 max-w-2xl">
              Bienvenido al panel de gestión de residuos de nuestra comunidad, donde los datos impulsan el progreso ambiental a través de acciones colectivas y un seguimiento transparente.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg inline-flex items-center justify-center">
            <BarChart3 className="h-12 w-12 text-accent-300 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-100">Mes Actual</p>
              <p className="text-2xl font-bold">897 kg</p>
              <p className="text-sm text-accent-300">↑ 12.3% desde el mes pasado</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;