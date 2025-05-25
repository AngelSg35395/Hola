import React, { useState } from 'react';
import { FileText, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import useAppStore from '../../store';

const SurveySection: React.FC = () => {
  const { surveyQuestions, submitSurvey } = useAppStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    answers: {} as Record<string, string | number>,
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for the field
    if (name === 'name' || name === 'email') {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  
  const handleAnswerChange = (questionId: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: value,
      },
    }));
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '' };
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    submitSurvey({
      surveyId: 'default-survey',
      respondent: {
        name: formData.name,
        email: formData.email,
      },
      answers: Object.entries(formData.answers).map(([questionId, answer]) => ({
        questionId,
        answer,
      })),
    });
    
    setSubmitted(true);
  };
  
  if (submitted) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-primary">Thank You!</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">Your feedback has been submitted successfully.</p>
              <p className="text-gray-600">We appreciate your input and will use it to improve our services.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-2">Community Feedback</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We value your input! Please take a moment to complete our survey and help us
            improve our environmental initiatives.
          </p>
        </div>
        
        <Card className="max-w-xl mx-auto">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <CardTitle>Survey Form</CardTitle>
              <FileText className="h-6 w-6 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                  />
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-4">Survey Questions</h3>
                <div className="space-y-6">
                  {surveyQuestions.map((question) => (
                    <div key={question.id}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {question.text}
                      </label>
                      
                      {question.type === 'text' && (
                        <Textarea
                          value={(formData.answers[question.id] as string) || ''}
                          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        />
                      )}
                      
                      {question.type === 'multiple-choice' && question.options && (
                        <div className="space-y-2">
                          {question.options.map((option) => (
                            <label key={option} className="flex items-center">
                              <input
                                type="radio"
                                name={`question_${question.id}`}
                                value={option}
                                checked={(formData.answers[question.id] as string) === option}
                                onChange={() => handleAnswerChange(question.id, option)}
                                className="h-4 w-4 text-primary focus:ring-primary"
                              />
                              <span className="ml-2 text-sm text-gray-700">{option}</span>
                            </label>
                          ))}
                        </div>
                      )}
                      
                      {question.type === 'rating' && (
                        <div className="flex space-x-4">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <label key={rating} className="flex flex-col items-center">
                              <input
                                type="radio"
                                name={`question_${question.id}`}
                                value={rating}
                                checked={(formData.answers[question.id] as number) === rating}
                                onChange={() => handleAnswerChange(question.id, rating)}
                                className="h-4 w-4 text-primary focus:ring-primary"
                              />
                              <span className="mt-1 text-sm text-gray-700">{rating}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Submit Feedback
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SurveySection;