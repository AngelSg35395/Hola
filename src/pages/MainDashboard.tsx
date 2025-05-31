import React, { useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import Header from '@/components/Dashboard/Header';
import ObjectiveCards from '@/components/Dashboard/ObjectiveCards';
import InfoSection from '@/components/Dashboard/InfoSection';
import DataVisualization from '@/components/Dashboard/DataVisualization';
import PDFSection from '@/components/Dashboard/PDFSection';
import SurveySection from '@/components/Dashboard/SurveySection';
import VisitorCounter from '@/components/Dashboard/VisitorCounter';
import { supabase } from '@/lib/supabase';

const MainDashboard: React.FC = () => {
  // Track page view
  useEffect(() => {
    const trackPageView = async () => {
      // In a real implementation, this would log to Supabase
      console.log('Main dashboard viewed');
    };
    
    trackPageView();
  }, []);

  return (
    <Layout>
      <Header />
      <ObjectiveCards />
      <InfoSection />
      <DataVisualization />
      <PDFSection />
      <SurveySection />
      <VisitorCounter />
    </Layout>
  );
};

export default MainDashboard;