import { createContext, ReactNode } from 'react';

import { useAppwrite } from '@/hooks/use-appwrite';
import { getCurrentUser } from '@/libs/get-current-user';
import { GlobalContextType } from '@/types/global-context-types';

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });

  const isLoggedIn = !!user;

  return (
    <GlobalContext.Provider value={{ isLoggedIn, user, loading, refetch }}>
      {children}
    </GlobalContext.Provider>
  );
};
