export interface User {
  id: string;
  name: string;
  password:string;
  organization:string;
  email: string;
  ownerType: 'user' | 'organization';
  role?: 'ceo' | 'hr' | 'captain' | 'senior' | 'junior';
  about:string;
  defaultCurrency:string;
  phone?: string;
  occupation?: string;
  createdAt: string;
}

