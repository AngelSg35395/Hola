import React, { useState } from 'react';
import { FileText, Download, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import useAppStore from '../store';
import { formatDate } from '../lib/utils';
import { SurveyQuestion, SurveyResponse } from '../types';
import DynamicChart from '../components/charts/DynamicChart';

const AdminSurvey: React.FC = () => {
  const { surveyResponses, surveyQuestions } = useAppStore();
  const [activeQuestion, setActiveQuestion] = useState<SurveyQuestion | null>(null);
  
  // Sort responses by date (newest first)
  const sortedResponses = [...surveyResponses].sort((a, b) => 
    b.createdAt.getTime() - a.createdAt.getTime()
  );
  
  const generateChartData = (question: SurveyQuestion) => {
    if (question.type === 'multiple-choice' && question.options) {
      // Count responses for each option
      const counts = question.options.reduce((acc, option) => {
        acc[option] = 0;
        return acc;
      }, {} as Record<string, number>);
      
      // Count the occurrences of each answer
      surveyResponses.forEach(response => {
        const answer = response.answers.find(a => a.questionId === question.id)?.answer;
        if (answer && typeof answer === 'string' && counts[answer] !== undefined) {
          counts[answer]++;
        }
      });
      
      return {
        id: question.id,
        title: question.text,
        description: 'Survey responses distribution',
        type: 'pie',
        labels: Object.keys(counts),
        datasets: [
          {
            label: 'Responses',
            data: Object.values(counts),
            backgroundColor: [
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
            ],
          },
        ],
      };
    } else if (question.type === 'rating') {
      // Count ratings (1-5)
      const counts = [0, 0, 0, 0, 0]; // Ratings 1-5
      
      surveyResponses.forEach(response => {
        const answer = response.answers.find(a => a.questionId === question.id)?.answer;
        if (answer && typeof answer === 'number' && answer >= 1 && answer <= 5) {
          counts[answer - 1]++;
        }
      });
      
      return {
        id: question.id,
        title: question.text,
        description: 'Rating distribution',
        type: 'bar',
        labels: ['1', '2', '3', '4', '5'],
        datasets: [
          {
            label: 'Responses',
            data: counts,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          },
        ],
      };
    }
    
    return null;
  };
  
  const handleExportCSV = () => {
    // Create CSV header
    let csv = 'Name,Email,Date';
    surveyQuestions.forEach(question => {
      csv += `,${question.text.replace(/,/g, ' ')}`;
    });
    csv += '\n';
    
    // Add response data
    sortedResponses.forEach(response => {
      csv += `${response.respondent.name},${response.respondent.email},${formatDate(response.createdAt)}`;
      
      surveyQuestions.forEach(question => {
        const answer = response.answers.find(a => a.questionId === question.id)?.answer || '';
        csv += `,${String(answer).replace(/,/g, ' ')}`;
      });
      
      csv += '\n';
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'survey_responses.csv';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Survey Responses</h1>
          <Button onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Survey Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {surveyQuestions.map((question) => (
                    <Button
                      key={question.id}
                      variant={activeQuestion?.id === question.id ? 'primary' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => setActiveQuestion(question)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      <div className="truncate text-left">
                        {question.text.length > 40 
                          ? `${question.text.substring(0, 40)}...` 
                          : question.text}
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            {activeQuestion ? (
              <>
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>
                        {activeQuestion.text}
                      </CardTitle>
                      <div className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {activeQuestion.type}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {activeQuestion.type === 'multiple-choice' && (
                      <div className="space-y-2">
                        <h3 className="font-medium">Options:</h3>
                        <ul className="list-disc pl-5">
                          {activeQuestion.options?.map((option) => (
                            <li key={option}>{option}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {activeQuestion.type !== 'text' && (
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <BarChart className="mr-2 h-5 w-5 text-primary" />
                      <h2 className="text-xl font-semibold">Response Visualization</h2>
                    </div>
                    
                    <DynamicChart 
                      data={generateChartData(activeQuestion)!} 
                      allowTypeChange={true}
                    />
                  </div>
                )}
                
                <Card>
                  <CardHeader>
                    <CardTitle>Individual Responses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sortedResponses.map((response) => {
                        const answer = response.answers.find(
                          (a) => a.questionId === activeQuestion.id
                        );
                        
                        return (
                          <div key={response.id} className="border-b pb-4">
                            <div className="flex justify-between mb-2">
                              <div>
                                <p className="font-medium">{response.respondent.name}</p>
                                <p className="text-sm text-gray-500">{response.respondent.email}</p>
                              </div>
                              <p className="text-sm text-gray-500">
                                {formatDate(response.createdAt)}
                              </p>
                            </div>
                            <p className="mt-2">
                              <span className="font-medium">Response: </span>
                              {answer ? String(answer.answer) : 'No response'}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
                <div>
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No question selected</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Select a question from the left to view responses and analytics.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSurvey;