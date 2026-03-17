export interface User {
  id: string;
  name: string;
  password:string;
  organization:string;
  email: string;
  ownerType: 'user' | 'organization';
  role?: 'ceo' | 'hr' | 'captain' | 'senior' | 'junior';
  about?: string;
  employeeEmail?: string;
  defaultCurrency:string;
  phone?: string;
  occupation?: string;
  isEmailVerified?: boolean;
  isActive?: boolean;
  createdAt: string;
}

