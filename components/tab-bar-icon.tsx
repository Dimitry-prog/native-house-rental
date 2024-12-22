import { Image, ImageSourcePropType, Text, View } from 'react-native';

type TabBarIconType = {
  focused: boolean;
  title: string;
  icon: ImageSourcePropType;
};

const TabBarIcon = ({ focused, icon, title }: TabBarIconType) => {
  return (
    <View className="flex-1 mt-3 flex flex-col items-center">
      <Image
        source={icon}
        tintColor={focused ? '#0061FF' : '#666876'}
        resizeMode="contain"
        className="size-6"
      />
      <Text
        className={`${
          focused ? 'text-primary-300 font-rubik-medium' : 'text-black-200 font-rubik'
        } text-xs w-full text-center mt-1`}>
        {title}
      </Text>
    </View>
  );
};

export default TabBarIcon;
