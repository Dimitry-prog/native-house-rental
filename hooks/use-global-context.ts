import { useContext } from 'react';

import { GlobalContext } from '@/libs/global-provider';
import { GlobalContextType } from '@/types/global-context-types';

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }

  return context;
};
