export interface User {
  id: string;
  name: string;
  email: string;
  college: string;
  avatar?: string;
  isAdmin: boolean;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: ProductCategory;
  condition: ProductCondition;
  images: string[];
  seller: User;
  createdAt: string;
  isSold: boolean;
  isFree: boolean;
  college: string;
}

export type ProductCategory = 
  | 'books' 
  | 'electronics' 
  | 'clothing' 
  | 'furniture' 
  | 'hostel' 
  | 'sports' 
  | 'other';

export type ProductCondition = 
  | 'new' 
  | 'like-new' 
  | 'good' 
  | 'fair' 
  | 'poor';

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  productId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participants: User[];
  productId: string;
  lastMessage?: ChatMessage;
  unreadCount: number;
}

export interface FilterOptions {
  category?: ProductCategory | 'all';
  minPrice?: number;
  maxPrice?: number;
  condition?: ProductCondition | 'all';
  college?: string;
  search?: string;
  onlyFree?: boolean;
}