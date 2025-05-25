import { create } from 'zustand';
import { faker } from '@faker-js/faker';
import { Brochure, ChartData, SurveyQuestion, SurveyResponse, User, VisitorStats, AnalyticsData } from '../types';
import { generateTimeLabels } from '../lib/utils';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  charts: ChartData[];
  brochures: Brochure[];
  surveyQuestions: SurveyQuestion[];
  surveyResponses: SurveyResponse[];
  visitorStats: VisitorStats;
  analyticsData: AnalyticsData;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  incrementVisitor: () => void;
  incrementDownload: (brochureId: string) => void;
  submitSurvey: (response: Omit<SurveyResponse, 'id' | 'createdAt'>) => void;
  updateChart: (chartId: string, data: Partial<ChartData>) => void;
  addChart: (chart: Omit<ChartData, 'id'>) => void;
  deleteChart: (chartId: string) => void;
}

// Generate demo data
const generateDemoUser = (): User => ({
  id: faker.string.uuid(),
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
  avatar: faker.image.avatar(),
});

const generateDemoCharts = (): ChartData[] => {
  const timeLabels = generateTimeLabels(7);
  
  return [
    {
      id: faker.string.uuid(),
      title: 'Waste Collection by Type',
      description: 'Weekly breakdown of waste collection by material type',
      type: 'bar',
      labels: ['Paper', 'Plastic', 'Glass', 'Metal', 'Organic'],
      datasets: [
        {
          label: 'Tons Collected',
          data: [65, 59, 80, 81, 56],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
        },
      ],
    },
    {
      id: faker.string.uuid(),
      title: 'Community Participation',
      description: 'Monthly trends in community engagement',
      type: 'line',
      labels: timeLabels,
      datasets: [
        {
          label: 'Participants',
          data: [28, 48, 40, 19, 86, 27, 90],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
        },
      ],
    },
    {
      id: faker.string.uuid(),
      title: 'Resource Allocation',
      description: 'Distribution of project resources across initiatives',
      type: 'pie',
      labels: ['Education', 'Collection', 'Processing', 'Distribution', 'Research'],
      datasets: [
        {
          label: 'Allocation %',
          data: [25, 30, 20, 15, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
        },
      ],
    },
  ];
};

const generateDemoBrochures = (): Brochure[] => {
  return [
    {
      id: faker.string.uuid(),
      title: 'Sustainable Waste Management Guide',
      description: 'Learn about best practices for sustainable waste management at home and in your community.',
      fileName: 'sustainable-waste-management.pdf',
      url: '#',
      downloadCount: faker.number.int({ min: 50, max: 500 }),
      createdAt: faker.date.past(),
    },
    {
      id: faker.string.uuid(),
      title: 'Recycling Program Overview',
      description: 'A comprehensive overview of our recycling program, including materials accepted and drop-off locations.',
      fileName: 'recycling-program.pdf',
      url: '#',
      downloadCount: faker.number.int({ min: 100, max: 800 }),
      createdAt: faker.date.past(),
    },
    {
      id: faker.string.uuid(),
      title: 'Community Impact Report',
      description: 'Our annual report on the impact of our environmental initiatives in the community.',
      fileName: 'impact-report.pdf',
      url: '#',
      downloadCount: faker.number.int({ min: 30, max: 300 }),
      createdAt: faker.date.past(),
    },
  ];
};

const generateDemoSurveyQuestions = (): SurveyQuestion[] => {
  return [
    {
      id: faker.string.uuid(),
      text: 'How satisfied are you with the waste collection services in your area?',
      type: 'rating',
    },
    {
      id: faker.string.uuid(),
      text: 'Which of the following recycling practices do you regularly follow?',
      type: 'multiple-choice',
      options: [
        'Separating recyclables from general waste',
        'Composting organic waste',
        'Reusing containers and packaging',
        'Bringing reusable bags for shopping',
        'None of the above',
      ],
    },
    {
      id: faker.string.uuid(),
      text: 'What improvements would you suggest for our environmental programs?',
      type: 'text',
    },
  ];
};

const generateDemoSurveyResponses = (questions: SurveyQuestion[]): SurveyResponse[] => {
  const responses: SurveyResponse[] = [];
  
  for (let i = 0; i < 20; i++) {
    responses.push({
      id: faker.string.uuid(),
      surveyId: 'default-survey',
      respondent: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      answers: questions.map(question => ({
        questionId: question.id,
        answer: question.type === 'rating' 
          ? faker.number.int({ min: 1, max: 5 }) 
          : question.type === 'multiple-choice' && question.options 
            ? question.options[faker.number.int({ min: 0, max: question.options.length - 1 })] 
            : faker.lorem.sentence(),
      })),
      createdAt: faker.date.recent({ days: 30 }),
    });
  }
  
  return responses;
};

const generateDemoVisitorStats = (): VisitorStats => {
  const total = faker.number.int({ min: 1000, max: 5000 });
  const today = faker.number.int({ min: 10, max: 200 });
  
  const history = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    
    return {
      date: date.toISOString().split('T')[0],
      count: faker.number.int({ min: 10, max: 200 }),
    };
  });
  
  return {
    total,
    today,
    activeNow: faker.number.int({ min: 1, max: 50 }),
    history,
  };
};

const generateDemoAnalyticsData = (brochures: Brochure[], responses: SurveyResponse[]): AnalyticsData => {
  const visitors = generateDemoVisitorStats();
  
  const downloadHistory = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    
    return {
      date: date.toISOString().split('T')[0],
      count: faker.number.int({ min: 1, max: 30 }),
    };
  });
  
  const surveyHistory = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    
    return {
      date: date.toISOString().split('T')[0],
      count: faker.number.int({ min: 0, max: 5 }),
    };
  });
  
  return {
    visitors,
    downloads: {
      total: brochures.reduce((sum, brochure) => sum + brochure.downloadCount, 0),
      byBrochure: brochures.map(brochure => ({
        brochureId: brochure.id,
        title: brochure.title,
        count: brochure.downloadCount,
      })),
      history: downloadHistory,
    },
    surveyResponses: {
      total: responses.length,
      recent: responses.slice(0, 5),
      history: surveyHistory,
    },
  };
};

// Create the store
const useAppStore = create<AppState>((set, get) => {
  // Initialize demo data
  const surveyQuestions = generateDemoSurveyQuestions();
  const brochures = generateDemoBrochures();
  const surveyResponses = generateDemoSurveyResponses(surveyQuestions);
  
  return {
    user: null,
    isAuthenticated: false,
    charts: generateDemoCharts(),
    brochures,
    surveyQuestions,
    surveyResponses,
    visitorStats: generateDemoVisitorStats(),
    analyticsData: generateDemoAnalyticsData(brochures, surveyResponses),
    
    login: async (email, password) => {
      // In a real app, we would validate credentials against an API
      if (email === 'admin@example.com' && password === 'password') {
        set({ user: generateDemoUser(), isAuthenticated: true });
        return true;
      }
      return false;
    },
    
    logout: () => {
      set({ user: null, isAuthenticated: false });
    },
    
    incrementVisitor: () => {
      set(state => {
        const newVisitorStats = { ...state.visitorStats };
        newVisitorStats.total += 1;
        newVisitorStats.today += 1;
        newVisitorStats.activeNow += 1;
        
        const today = new Date().toISOString().split('T')[0];
        const todayHistoryIndex = newVisitorStats.history.findIndex(item => item.date === today);
        
        if (todayHistoryIndex >= 0) {
          newVisitorStats.history[todayHistoryIndex].count += 1;
        } else {
          newVisitorStats.history.push({ date: today, count: 1 });
        }
        
        return { visitorStats: newVisitorStats };
      });
    },
    
    incrementDownload: (brochureId) => {
      set(state => {
        const newBrochures = [...state.brochures];
        const index = newBrochures.findIndex(b => b.id === brochureId);
        
        if (index >= 0) {
          newBrochures[index] = {
            ...newBrochures[index],
            downloadCount: newBrochures[index].downloadCount + 1,
          };
        }
        
        const newAnalytics = { ...state.analyticsData };
        newAnalytics.downloads.total += 1;
        
        const brochureIndex = newAnalytics.downloads.byBrochure.findIndex(b => b.brochureId === brochureId);
        if (brochureIndex >= 0) {
          newAnalytics.downloads.byBrochure[brochureIndex].count += 1;
        }
        
        const today = new Date().toISOString().split('T')[0];
        const todayHistoryIndex = newAnalytics.downloads.history.findIndex(item => item.date === today);
        
        if (todayHistoryIndex >= 0) {
          newAnalytics.downloads.history[todayHistoryIndex].count += 1;
        } else {
          newAnalytics.downloads.history.push({ date: today, count: 1 });
        }
        
        return { brochures: newBrochures, analyticsData: newAnalytics };
      });
    },
    
    submitSurvey: (response) => {
      const newResponse: SurveyResponse = {
        ...response,
        id: faker.string.uuid(),
        createdAt: new Date(),
      };
      
      set(state => {
        const newResponses = [...state.surveyResponses, newResponse];
        
        const newAnalytics = { ...state.analyticsData };
        newAnalytics.surveyResponses.total += 1;
        newAnalytics.surveyResponses.recent = [...newResponses].sort((a, b) => 
          b.createdAt.getTime() - a.createdAt.getTime()
        ).slice(0, 5);
        
        const today = new Date().toISOString().split('T')[0];
        const todayHistoryIndex = newAnalytics.surveyResponses.history.findIndex(item => item.date === today);
        
        if (todayHistoryIndex >= 0) {
          newAnalytics.surveyResponses.history[todayHistoryIndex].count += 1;
        } else {
          newAnalytics.surveyResponses.history.push({ date: today, count: 1 });
        }
        
        return { 
          surveyResponses: newResponses,
          analyticsData: newAnalytics,
        };
      });
    },
    
    updateChart: (chartId, data) => {
      set(state => {
        const newCharts = [...state.charts];
        const index = newCharts.findIndex(c => c.id === chartId);
        
        if (index >= 0) {
          newCharts[index] = {
            ...newCharts[index],
            ...data,
          };
        }
        
        return { charts: newCharts };
      });
    },
    
    addChart: (chart) => {
      const newChart: ChartData = {
        ...chart,
        id: faker.string.uuid(),
      };
      
      set(state => ({
        charts: [...state.charts, newChart],
      }));
    },
    
    deleteChart: (chartId) => {
      set(state => ({
        charts: state.charts.filter(c => c.id !== chartId),
      }));
    },
  };
});

export default useAppStore;