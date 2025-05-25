import React, { useEffect } from 'react';
import { MapPin, Clock, PieChart, Users, Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import DynamicChart from '../components/charts/DynamicChart';
import BrochureSection from '../components/sections/BrochureSection';
import SurveySection from '../components/sections/SurveySection';
import StatsCounter from '../components/sections/StatsCounter';
import useAppStore from '../store';

const PublicHome: React.FC = () => {
  const { charts } = useAppStore();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Environmental Data Visualization</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90">
            Transforming environmental data into actionable insights for a sustainable future.
          </p>
        </div>
      </section>
      
      {/* Feature Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-blue-500 transition-transform hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-full mr-4">
                    <PieChart className="h-6 w-6 text-blue-500" />
                  </div>
                  <CardTitle>Data-Driven Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Leverage comprehensive data analysis to make informed decisions about environmental initiatives 
                  and track their impact over time.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-green-500 transition-transform hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-full mr-4">
                    <Leaf className="h-6 w-6 text-green-500" />
                  </div>
                  <CardTitle>Sustainable Solutions</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Discover innovative approaches to environmental challenges through our research and 
                  community-driven sustainability programs.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-purple-500 transition-transform hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-full mr-4">
                    <Users className="h-6 w-6 text-purple-500" />
                  </div>
                  <CardTitle>Community Engagement</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Participate in our community initiatives, provide feedback through surveys, and access 
                  resources to get involved in environmental action.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Information Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-2" />
                  <CardTitle className="text-lg">Our Location</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-md mb-4">
                  {/* Placeholder for map - would be an actual map in production */}
                  <div className="h-full w-full flex items-center justify-center text-gray-500">
                    <p>Interactive Map</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  123 Environmental Way<br />
                  Green City, Earth 12345<br />
                  United States
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  <CardTitle className="text-lg">Operating Hours</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                  <div className="pt-4 text-gray-600">
                    <p>Special operating hours may apply during holidays.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Methodology</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our project uses a comprehensive approach to environmental data collection and analysis:
                </p>
                <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                  <li>Data collection from multiple community sources</li>
                  <li>Rigorous quality control and validation</li>
                  <li>Advanced statistical analysis and modeling</li>
                  <li>Collaborative interpretation with domain experts</li>
                  <li>Community-based action planning</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Dashboard Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-2">Interactive Dashboard</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our environmental data through interactive visualizations.
              Toggle between different chart types to gain new perspectives.
            </p>
          </div>
          
          <StatsCounter />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {charts.map((chart) => (
              <DynamicChart 
                key={chart.id} 
                data={chart} 
                allowTypeChange={true}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Brochures Section */}
      <BrochureSection />
      
      {/* Survey Section */}
      <SurveySection />
    </div>
  );
};

export default PublicHome;