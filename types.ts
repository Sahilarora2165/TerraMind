export enum Section {
  Home = 'Home',
  Advisor = 'Agri-Advisor',
  Diagnostics = 'Diagnostics',
  Marketplace = 'Marketplace',
  Chat = 'AI Chat Assistant',
  Forum = 'Community Forum'
}

export interface WeatherData {
  temp: number;
  condition: string;
  rainProb: number;
  city: string;
}

export interface MarketplaceItem {
  id: string;
  farmer: string;
  produce: string;
  quantity: number;
  price: number;
  timestamp: number;
}

export interface Recipe {
  name: string;
  ingredients: string[];
  steps: string[];
}

export interface Diagnosis {
  issue: string;
  remedy: string;
  confidence: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface ForumReply {
  id: string;
  author: string;
  text: string;
  timestamp: number;
  isExpert?: boolean;
}

export interface ForumPost {
  id: string;
  author: string;
  question: string;
  replies: ForumReply[];
  timestamp: number;
  tags: string[];
}