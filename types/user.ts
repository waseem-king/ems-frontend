export interface User {
  id: string;
  name: string;
  email: string;
  ownerType: 'user' | 'organization';
  role?: 'ceo' | 'hr' | 'captain' | 'senior' | 'junior';
  phone?: string;
  occupation?: string;
  createdAt: string;
}

