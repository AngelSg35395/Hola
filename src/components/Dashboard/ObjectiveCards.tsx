import React from 'react';
import ObjectiveCard from './ObjectiveCard';
import { Target, Users, Leaf } from 'lucide-react';

const ObjectiveCards: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Nuestros Objetivos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ObjectiveCard
            title="Reducción de Desperdicio"
            value="42%"
            subtitle="De nuestro objetivo anual"
            icon={Target}
            trend={{ value: 8.3, isPositive: true }}
            color="primary"
          />
          
          <ObjectiveCard
            title="Participación de la Comunidad"
            value="68%"
            subtitle="De residentes locales involucrados"
            icon={Users}
            trend={{ value: 12.7, isPositive: true }}
            color="secondary"
          />
          
          <ObjectiveCard
            title="Impacto Ambiental"
            value="1.4k"
            subtitle="Reducción de CO₂ (kg)"
            icon={Leaf}
            trend={{ value: 5.2, isPositive: true }}
            color="accent"
          />
        </div>
      </div>
    </section>
  );
};

export default ObjectiveCards;