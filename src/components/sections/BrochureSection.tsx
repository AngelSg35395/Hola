import React from 'react';
import { FileDown, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import useAppStore from '../../store';
import { formatNumber } from '../../lib/utils';

const BrochureSection: React.FC = () => {
  const { brochures, incrementDownload } = useAppStore();
  
  const handleDownload = (brochureId: string) => {
    incrementDownload(brochureId);
    // In a real app, this would download a file
    alert('Download started. In a real app, this would download the brochure file.');
  };
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-2">Resources & Downloads</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access our informational brochures and resources to learn more about our initiatives
            and how you can contribute to a more sustainable future.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {brochures.map((brochure) => (
            <Card key={brochure.id} className="transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{brochure.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {formatNumber(brochure.downloadCount)} downloads
                    </CardDescription>
                  </div>
                  <FileDown className="h-8 w-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{brochure.description}</p>
                <Button 
                  onClick={() => handleDownload(brochure.id)}
                  className="w-full"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrochureSection;