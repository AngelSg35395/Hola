import React from 'react';
import ObjectiveCard from './ObjectiveCard';
import { Target, Users, Leaf } from 'lucide-react';

const ObjectiveCards: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Our Objectives</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ObjectiveCard
            title="Waste Reduction"
            value="42%"
            subtitle="Of our annual target"
            icon={Target}
            trend={{ value: 8.3, isPositive: true }}
            color="primary"
          />
          
          <ObjectiveCard
            title="Community Participation"
            value="68%"
            subtitle="Of local residents involved"
            icon={Users}
            trend={{ value: 12.7, isPositive: true }}
            color="secondary"
          />
          
          <ObjectiveCard
            title="Environmental Impact"
            value="1.4k"
            subtitle="CO₂ emissions reduced (kg)"
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