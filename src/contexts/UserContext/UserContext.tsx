import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useFetch } from '../../hooks';

interface User {
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

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {/* {isLoading ? <div>Loading...</div> : children} */}
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
