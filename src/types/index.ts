export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export type ChartType = 'bar' | 'line' | 'pie' | 'doughnut';

export interface ChartData {
  id: string;
  title: string;
  description: string;
  type: ChartType;
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
}

export interface SurveyQuestion {
  id: string;
  text: string;
  type: 'multiple-choice' | 'text' | 'rating';
  options?: string[];
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  respondent: {
    name: string;
    email: string;
  };
  answers: {
    questionId: string;
    answer: string | number;
  }[];
  createdAt: Date;
}

export interface Brochure {
  id: string;
  title: string;
  description: string;
  fileName: string;
  url: string;
  downloadCount: number;
  createdAt: Date;
}

export interface VisitorStats {
  total: number;
  today: number;
  activeNow: number;
  history: {
    date: string;
    count: number;
  }[];
}

export interface AnalyticsData {
  visitors: VisitorStats;
  downloads: {
    total: number;
    byBrochure: {
      brochureId: string;
      title: string;
      count: number;
    }[];
    history: {
      date: string;
      count: number;
    }[];
  };
  surveyResponses: {
    total: number;
    recent: SurveyResponse[];
    history: {
      date: string;
      count: number;
    }[];
  };
}