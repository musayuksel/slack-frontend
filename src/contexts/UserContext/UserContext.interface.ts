import { ReactNode } from 'react';

export interface User {
  id: string;
  userName: string;
  userEmail: string;
  firstName: string;
  lastName: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
}

export interface UserProviderProps {
  children: ReactNode;
}
