import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import icons from '@/constants/icons';
import images from '@/constants/images';

const SignIn = () => {
  const handleLogin = () => {};

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image source={images.onboarding} className="w-full h-4/6" resizeMode="contain" />

        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to House Rental
          </Text>

          <Text className="mt-2 text-3xl text-center font-rubik-bold text-black-300">
            Let's Get You Closer to {'\n'}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>

          <Text className="text-lg text-center font-rubik text-black-200 mt-12">
            Login to House Rental with Google
          </Text>

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5">
            <View className="flex flex-row gap-2 items-center justify-center">
              <Image source={icons.google} resizeMode="contain" className="w-5 h-5" />
              <Text className="text-lg font-rubik-medium text-black-300">Continue with Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
