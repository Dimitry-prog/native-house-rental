import { UserType } from '@/types/user-types';

export type GlobalContextType = {
  user: UserType | null;
  isLoggedIn: boolean;
  loading: boolean;
  refetch: (params?: Record<string, string | number>) => Promise<void>;
};
