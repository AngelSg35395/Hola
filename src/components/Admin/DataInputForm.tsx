import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface WasteDataFormInput {
  date: string;
  petAmount: number;
  cardboardAmount: number;
  cansAmount: number;
  glassAmount: number;
  otherAmount: number;
  participationRate: number;
  misclassificationRate: number;
  campaignReach: number;
  costs: number;
  notes: string;
}

const DataInputForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<WasteDataFormInput>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      petAmount: 0,
      cardboardAmount: 0,
      cansAmount: 0,
      glassAmount: 0,
      otherAmount: 0,
      participationRate: 0,
      misclassificationRate: 0,
      campaignReach: 0,
      costs: 0,
      notes: '',
    }
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: WasteDataFormInput) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);
    
    try {
      // In a real implementation, this would submit to Supabase
      // const { error } = await supabase.from('waste_data').insert([data]);
      
      // if (error) throw error;
      
      // Simulate successful submission
      console.log('Data submitted:', data);
      
      // Show success message
      setSubmitSuccess(true);
      
      // Reset form after short delay
      setTimeout(() => {
        reset({
          date: new Date().toISOString().split('T')[0],
          petAmount: 0,
          cardboardAmount: 0,
          cansAmount: 0,
          glassAmount: 0,
          otherAmount: 0,
          participationRate: 0,
          misclassificationRate: 0,
          campaignReach: 0,
          costs: 0,
          notes: '',
        });
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error: any) {
      setSubmitError(error.message || 'Failed to submit data');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Daily Waste Data Input</h2>
      
      {submitSuccess && (
        <div className="mb-6 bg-success-500 bg-opacity-10 border border-success-500 text-success-500 px-4 py-3 rounded-lg flex items-center animate-fade-in">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>Data successfully submitted!</span>
        </div>
      )}
      
      {submitError && (
        <div className="mb-6 bg-error-500 bg-opacity-10 border border-error-500 text-error-500 px-4 py-3 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{submitError}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="date">
              Date
            </label>
            <input
              id="date"
              type="date"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.date ? 'border-error-500' : 'border-gray-300'
              }`}
              {...register('date', { required: 'Date is required' })}
            />
            {errors.date && (
              <p className="mt-1 text-error-500 text-sm">{errors.date.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="costs">
              Daily Costs ($)
            </label>
            <input
              id="costs"
              type="number"
              min="0"
              step="0.01"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.costs ? 'border-error-500' : 'border-gray-300'
              }`}
              {...register('costs', { 
                required: 'Cost amount is required',
                min: { value: 0, message: 'Cost cannot be negative' }
              })}
            />
            {errors.costs && (
              <p className="mt-1 text-error-500 text-sm">{errors.costs.message}</p>
            )}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Waste Amounts (kg)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="petAmount">
                PET
              </label>
              <input
                id="petAmount"
                type="number"
                min="0"
                step="0.1"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.petAmount ? 'border-error-500' : 'border-gray-300'
                }`}
                {...register('petAmount', { 
                  required: 'Amount is required',
                  min: { value: 0, message: 'Amount cannot be negative' }
                })}
              />
              {errors.petAmount && (
                <p className="mt-1 text-error-500 text-sm">{errors.petAmount.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="cardboardAmount">
                Cardboard
              </label>
              <input
                id="cardboardAmount"
                type="number"
                min="0"
                step="0.1"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.cardboardAmount ? 'border-error-500' : 'border-gray-300'
                }`}
                {...register('cardboardAmount', { 
                  required: 'Amount is required',
                  min: { value: 0, message: 'Amount cannot be negative' }
                })}
              />
              {errors.cardboardAmount && (
                <p className="mt-1 text-error-500 text-sm">{errors.cardboardAmount.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="cansAmount">
                Cans
              </label>
              <input
                id="cansAmount"
                type="number"
                min="0"
                step="0.1"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.cansAmount ? 'border-error-500' : 'border-gray-300'
                }`}
                {...register('cansAmount', { 
                  required: 'Amount is required',
                  min: { value: 0, message: 'Amount cannot be negative' }
                })}
              />
              {errors.cansAmount && (
                <p className="mt-1 text-error-500 text-sm">{errors.cansAmount.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="glassAmount">
                Glass
              </label>
              <input
                id="glassAmount"
                type="number"
                min="0"
                step="0.1"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.glassAmount ? 'border-error-500' : 'border-gray-300'
                }`}
                {...register('glassAmount', { 
                  required: 'Amount is required',
                  min: { value: 0, message: 'Amount cannot be negative' }
                })}
              />
              {errors.glassAmount && (
                <p className="mt-1 text-error-500 text-sm">{errors.glassAmount.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="otherAmount">
                Other
              </label>
              <input
                id="otherAmount"
                type="number"
                min="0"
                step="0.1"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.otherAmount ? 'border-error-500' : 'border-gray-300'
                }`}
                {...register('otherAmount', { 
                  required: 'Amount is required',
                  min: { value: 0, message: 'Amount cannot be negative' }
                })}
              />
              {errors.otherAmount && (
                <p className="mt-1 text-error-500 text-sm">{errors.otherAmount.message}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="participationRate">
              Participation Rate (%)
            </label>
            <input
              id="participationRate"
              type="number"
              min="0"
              max="100"
              step="0.1"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.participationRate ? 'border-error-500' : 'border-gray-300'
              }`}
              {...register('participationRate', { 
                required: 'Participation rate is required',
                min: { value: 0, message: 'Rate must be between 0-100%' },
                max: { value: 100, message: 'Rate must be between 0-100%' }
              })}
            />
            {errors.participationRate && (
              <p className="mt-1 text-error-500 text-sm">{errors.participationRate.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="misclassificationRate">
              Misclassification Rate (%)
            </label>
            <input
              id="misclassificationRate"
              type="number"
              min="0"
              max="100"
              step="0.1"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.misclassificationRate ? 'border-error-500' : 'border-gray-300'
              }`}
              {...register('misclassificationRate', { 
                required: 'Misclassification rate is required',
                min: { value: 0, message: 'Rate must be between 0-100%' },
                max: { value: 100, message: 'Rate must be between 0-100%' }
              })}
            />
            {errors.misclassificationRate && (
              <p className="mt-1 text-error-500 text-sm">{errors.misclassificationRate.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="campaignReach">
              Campaign Reach (people)
            </label>
            <input
              id="campaignReach"
              type="number"
              min="0"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.campaignReach ? 'border-error-500' : 'border-gray-300'
              }`}
              {...register('campaignReach', { 
                required: 'Campaign reach is required',
                min: { value: 0, message: 'Reach cannot be negative' }
              })}
            />
            {errors.campaignReach && (
              <p className="mt-1 text-error-500 text-sm">{errors.campaignReach.message}</p>
            )}
          </div>
        </div>
        
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="notes">
            Notes
          </label>
          <textarea
            id="notes"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Any additional information or observations..."
            {...register('notes')}
          ></textarea>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => reset()}
            className="mr-4 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-300"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300 ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Data'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DataInputForm;