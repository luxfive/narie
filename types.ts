export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  scentNotes: string[];
  image: string;
  category: 'signature' | 'seasonal' | 'limited';
}

export interface AIRecommendation {
  candleName: string;
  description: string;
  scentProfile: string[];
  moodMatch: string;
  intensityLevel: number; // 1-5
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
