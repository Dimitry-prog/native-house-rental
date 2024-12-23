import { Image, Text, View } from 'react-native';

import images from '@/constants/images';

const EmptyDocumentsResult = () => {
  return (
    <View className="flex items-center my-5">
      <Image source={images.noResult} resizeMode="contain" className="w-11/12 h-80" />
      <Text className="text-2xl font-rubik-bold text-black-300 mt-5">No Houses</Text>
      <Text className="text-base text-black-100 mt-2">We could not find any results</Text>
    </View>
  );
};

export default EmptyDocumentsResult;
