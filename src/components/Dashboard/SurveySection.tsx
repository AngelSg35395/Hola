import React from 'react';
import { useForm } from 'react-hook-form';
import { ClipboardList, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface SurveyFormData {
  name: string;
  email: string;
  participationLevel: string;
  satisfactionLevel: number;
  suggestions: string;
  isSubscribed: boolean;
}

const SurveySection: React.FC = () => {
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitSuccessful } } = useForm<SurveyFormData>();
  
  const onSubmit = async (data: SurveyFormData) => {
    try {
      // In a real implementation, this would submit to Supabase
      // const { error } = await supabase.from('survey_responses').insert([data]);
      
      // if (error) throw error;
      
      // Simulate successful submission
      console.log('Survey submitted:', data);
      
      // Reset form after successful submission
      setTimeout(() => reset(), 3000);
      
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <ClipboardList className="h-12 w-12 text-primary-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Community Feedback</h2>
            <p className="text-gray-600">
              Your feedback helps us improve our waste management initiatives. 
              Please take a moment to complete this short survey.
            </p>
          </div>
          
          {isSubmitSuccessful ? (
            <div className="bg-success-500 bg-opacity-10 p-6 rounded-lg border border-success-500 text-center animate-fade-in">
              <CheckCircle className="h-12 w-12 text-success-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-success-500 mb-2">Thank You!</h3>
              <p className="text-gray-700">
                Your feedback has been submitted successfully. We appreciate your participation!
              </p>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit(onSubmit)} 
              className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.name ? 'border-error-500' : 'border-gray-300'
                  }`}
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && (
                  <p className="mt-1 text-error-500 text-sm flex items-center">
                    <XCircle className="h-4 w-4 mr-1" />
                    {errors.name.message}
                  </p>
                )}
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.email ? 'border-error-500' : 'border-gray-300'
                  }`}
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-error-500 text-sm flex items-center">
                    <XCircle className="h-4 w-4 mr-1" />
                    {errors.email.message}
                  </p>
                )}
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="participationLevel">
                  How often do you participate in recycling?
                </label>
                <select
                  id="participationLevel"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.participationLevel ? 'border-error-500' : 'border-gray-300'
                  }`}
                  {...register('participationLevel', { required: 'Please select an option' })}
                >
                  <option value="">Select an option</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="rarely">Rarely</option>
                  <option value="never">Never</option>
                </select>
                {errors.participationLevel && (
                  <p className="mt-1 text-error-500 text-sm flex items-center">
                    <XCircle className="h-4 w-4 mr-1" />
                    {errors.participationLevel.message}
                  </p>
                )}
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  How satisfied are you with the current waste management system?
                </label>
                <div className="flex space-x-4 mt-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label key={value} className="flex flex-col items-center">
                      <input
                        type="radio"
                        value={value}
                        {...register('satisfactionLevel', { required: 'Please select a rating' })}
                        className="sr-only"
                      />
                      <span 
                        className={`h-10 w-10 rounded-full flex items-center justify-center text-lg font-medium cursor-pointer transition-colors ${
                          value === parseInt(watch('satisfactionLevel'))
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {value}
                      </span>
                      <span className="text-xs text-gray-600 mt-1">
                        {value === 1 ? 'Poor' : value === 5 ? 'Excellent' : ''}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.satisfactionLevel && (
                  <p className="mt-1 text-error-500 text-sm flex items-center">
                    <XCircle className="h-4 w-4 mr-1" />
                    {errors.satisfactionLevel.message}
                  </p>
                )}
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="suggestions">
                  Do you have any suggestions for improvement?
                </label>
                <textarea
                  id="suggestions"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  {...register('suggestions')}
                ></textarea>
              </div>
              
              <div className="mb-8">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded text-primary-500 focus:ring-primary-500 border-gray-300"
                    {...register('isSubscribed')}
                  />
                  <span className="ml-2 text-gray-700">
                    I would like to receive updates about waste management initiatives
                  </span>
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors duration-300 font-medium"
              >
                Submit Feedback
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default SurveySection;