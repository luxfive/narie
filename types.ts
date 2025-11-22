export interface Product {
  id: string;
  name: string;
  price: number;
  priceVND: number; // Added for VND pricing
  description: string;
  scentNotes: string[];
  image: string;
  category: 'signature' | 'seasonal' | 'limited' | 'accessory' | 'essential_oil';
}

export interface AIRecommendation {
  candleName: string;
  description: string;
  scentProfile: string[];
  moodMatch: string;
  intensityLevel: number; // 1-5
  recommendedProductId?: string; // ID of the real product matching the concept
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}