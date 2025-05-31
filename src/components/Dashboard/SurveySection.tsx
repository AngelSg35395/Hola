import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ClipboardList, CheckCircle, XCircle, BookOpen } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface SurveyFormData {
  name: string;
  email: string;
  participationLevel: string;
  satisfactionLevel: number;
  suggestions: string;
  isSubscribed: boolean;
}

const SurveySection: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitSuccessful } } = useForm<SurveyFormData>();
  
  const onSubmit = async (data: SurveyFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const { error: insertError } = await supabase
        .from('survey_responses')
        .insert([{
          name: data.name,
          email: data.email,
          participation_level: data.participationLevel,
          satisfaction_level: data.satisfactionLevel,
          suggestions: data.suggestions,
          is_subscribed: data.isSubscribed,
          created_at: new Date().toISOString()
        }]);

      if (insertError) throw insertError;

      // Si el usuario se suscribió, agregarlo a la lista de suscriptores
      if (data.isSubscribed) {
        const { error: subscriberError } = await supabase
          .from('subscribers')
          .insert([{
            email: data.email,
            name: data.name,
            created_at: new Date().toISOString()
          }]);

        if (subscriberError) {
          console.error('Error al agregar suscriptor:', subscriberError);
        }
      }

      // Reset form after successful submission
      setTimeout(() => reset(), 3000);
      
    } catch (error) {
      console.error('Error submitting survey:', error);
      setError('Hubo un error al enviar el formulario. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <ClipboardList className="h-12 w-12 text-primary-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Feedback de la Comunidad</h2>
            <p className="text-gray-600 mb-6">
              Tu feedback nos ayuda a mejorar nuestras iniciativas de gestión de residuos. 
              Por favor, toma un momento para completar este breve cuestionario.
            </p>
            <button
              onClick={() => navigate('/encuesta-conocimientos')}
              className="inline-flex items-center px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors duration-300"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Realizar Prueba de Conocimientos
            </button>
          </div>
          
          {isSubmitSuccessful ? (
            <div className="bg-success-500 bg-opacity-10 p-6 rounded-lg border border-success-500 text-center animate-fade-in">
              <CheckCircle className="h-12 w-12 text-success-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-success-500 mb-2">¡Gracias!</h3>
              <p className="text-gray-700">
                Tu feedback ha sido enviado exitosamente. ¡Gracias por tu participación!
              </p>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit(onSubmit)} 
              className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200"
            >
              {error && (
                <div className="mb-6 p-4 bg-error-500 bg-opacity-10 border border-error-500 rounded-lg">
                  <p className="text-error-500 text-sm flex items-center">
                    <XCircle className="h-4 w-4 mr-2" />
                    {error}
                  </p>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.name ? 'border-error-500' : 'border-gray-300'
                  }`}
                  {...register('name', { required: 'Nombre es requerido' })}
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
                    required: 'Correo electrónico es requerido',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Dirección de correo electrónico inválida'
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
                  ¿Qué tan frecuentemente participas en la reciclaje?
                </label>
                <select
                  id="participationLevel"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.participationLevel ? 'border-error-500' : 'border-gray-300'
                  }`}
                  {...register('participationLevel', { required: 'Por favor, selecciona una opción' })}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="daily">Diario</option>
                  <option value="weekly">Semanal</option>
                  <option value="monthly">Mensual</option>
                  <option value="rarely">Raramente</option>
                  <option value="never">Nunca</option>
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
                  ¿Qué tan satisfecho estás con el sistema actual de gestión de residuos?
                </label>
                <div className="flex space-x-4 mt-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label key={value} className="flex flex-col items-center">
                      <input
                        type="radio"
                        value={value}
                        {...register('satisfactionLevel', { required: 'Por favor, selecciona una calificación' })}
                        className="sr-only"
                      />
                      <span 
                        className={`h-10 w-10 rounded-full flex items-center justify-center text-lg font-medium cursor-pointer transition-colors ${
                          value === Number(watch('satisfactionLevel'))
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {value}
                      </span>
                      <span className="text-xs text-gray-600 mt-1">
                        {value === 1 ? 'Muy malo' : value === 5 ? 'Excelente' : ''}
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
                  ¿Tienes alguna sugerencia para mejorar?
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
                    Me gustaría recibir actualizaciones sobre las iniciativas de gestión de residuos
                  </span>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-primary-500 text-white py-3 px-4 rounded-lg transition-colors duration-300 font-medium ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-600'
                }`}
              >
                {isLoading ? 'Enviando...' : 'Enviar Feedback'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default SurveySection;