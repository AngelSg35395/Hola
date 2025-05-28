import React from 'react';
import { MapPin, Clock, Calendar, Award } from 'lucide-react';

const InfoSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Collection Information</h2>
            
            <div className="mb-8">
              <h3 className="flex items-center text-xl font-semibold text-gray-700 mb-4">
                <MapPin className="mr-2 h-5 w-5 text-primary-500" />
                Collection Points
              </h3>
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  title="Collection Point Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9914406081493!2d2.2922926153738434!3d48.85837360866272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sus!4v1653466031742!5m2!1sen!2sus"
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
                  <MapPin className="h-4 w-4 mr-1" /> View on Google Maps
                </a>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="flex items-center text-xl font-semibold text-gray-700 mb-4">
                <Clock className="mr-2 h-5 w-5 text-primary-500" />
                Operating Hours
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 font-medium">Monday - Friday</td>
                      <td className="py-2 text-right">8:00 AM - 6:00 PM</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 font-medium">Saturday</td>
                      <td className="py-2 text-right">9:00 AM - 5:00 PM</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Sunday</td>
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
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Project Overview</h3>
                <p className="text-gray-600 mb-6">
                  Our community waste management initiative focuses on reducing waste, 
                  increasing recycling rates, and promoting environmental awareness through 
                  education and data transparency.
                </p>
                
                <h4 className="flex items-center text-lg font-semibold text-gray-700 mb-4">
                  <Calendar className="mr-2 h-5 w-5 text-primary-500" />
                  Project Timeline
                </h4>
                
                <div className="space-y-4">
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="h-4 w-4 rounded-full bg-primary-500"></div>
                      <div className="h-full w-0.5 bg-primary-500"></div>
                    </div>
                    <div>
                      <p className="font-semibold">Project Launch</p>
                      <p className="text-sm text-gray-500">January 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="h-4 w-4 rounded-full bg-primary-500"></div>
                      <div className="h-full w-0.5 bg-primary-500"></div>
                    </div>
                    <div>
                      <p className="font-semibold">Community Outreach</p>
                      <p className="text-sm text-gray-500">March 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="h-4 w-4 rounded-full bg-primary-500"></div>
                      <div className="h-full w-0.5 bg-primary-500"></div>
                    </div>
                    <div>
                      <p className="font-semibold">First Milestone: 25% Reduction</p>
                      <p className="text-sm text-gray-500">July 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="h-4 w-4 rounded-full bg-primary-500"></div>
                      <div className="h-full w-0.5 bg-gray-300"></div>
                    </div>
                    <div>
                      <p className="font-semibold">Mid-Year Assessment</p>
                      <p className="text-sm text-gray-500">August 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="h-4 w-4 rounded-full bg-gray-300"></div>
                    </div>
                    <div>
                      <p className="font-semibold">Final Goal: 50% Reduction</p>
                      <p className="text-sm text-gray-500">December 2025</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="flex items-center text-lg font-semibold text-gray-700 mb-4">
                    <Award className="mr-2 h-5 w-5 text-primary-500" />
                    Key Milestones
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Achieve 50% community participation</li>
                    <li>Reduce waste volume by 35%</li>
                    <li>Increase recycling rate to 70%</li>
                    <li>Launch education program in 5 local schools</li>
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