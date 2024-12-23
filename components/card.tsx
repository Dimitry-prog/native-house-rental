import { Image, Text, TouchableOpacity, View } from 'react-native';

import { Models } from 'react-native-appwrite';

import icons from '@/constants/icons';

type CardProps = {
  data: Models.Document;
  onPress?: () => void;
};

const Card = ({ data, onPress }: CardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative">
      <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50">
        <Image source={icons.star} className="size-2.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-0.5">{data.rating}</Text>
      </View>

      <Image source={{ uri: data.image }} className="w-full h-40 rounded-lg" />

      <View className="flex flex-col mt-2">
        <Text className="text-base font-rubik-bold text-black-300">{data.name}</Text>
        <Text className="text-xs font-rubik text-black-200">{data.address}</Text>

        <View className="flex flex-row items-center justify-between mt-2">
          <Text className="text-base font-rubik-bold text-primary-300">${data.price}</Text>
          <Image source={icons.heart} tintColor="#191d31" className="size-5 mr-2" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
