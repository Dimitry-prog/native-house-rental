import { Image, Text, TouchableOpacity, View } from 'react-native';

import { Models } from 'react-native-appwrite';

import icons from '@/constants/icons';
import images from '@/constants/images';

type FeaturedCardProps = {
  data: Models.Document;
  onPress?: () => void;
};

const FeaturedCard = ({ data, onPress }: FeaturedCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex flex-col items-start w-60 h-80 relative">
      <Image source={{ uri: data.image }} className="size-full rounded-2xl" />
      <Image source={images.cardGradient} className="size-full rounded-2xl absolute bottom-0" />

      <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-1">{data.rating}</Text>
      </View>

      <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
        <Text numberOfLines={1} className="text-xl font-rubik-extrabold text-white">
          {data.name}
        </Text>
        <Text className="text-base font-rubik text-white">{data.address}</Text>

        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-xl font-rubik-extrabold text-white">${data.price}</Text>
          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeaturedCard;
