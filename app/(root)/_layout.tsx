import { ActivityIndicator } from 'react-native';

import { Redirect, Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGlobalContext } from '@/hooks/use-global-context';

const AppLayout = () => {
  const { loading, isLoggedIn } = useGlobalContext();

  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator size="large" className="text-primary-300" />
      </SafeAreaView>
    );
  }

  if (!isLoggedIn) return <Redirect href="/sign-in" />;

  return <Slot />;
};

export default AppLayout;
