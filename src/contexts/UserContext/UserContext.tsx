import React, { createContext, useState } from 'react';
import { User, UserContextValue, UserProviderProps } from './UserContext.interface';

const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export { UserContext };
