import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';

import icons from '@/constants/icons';

type SettingsItemProps = {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  showArrow?: boolean;
  textStyle?: string;
};

const SettingsItem = ({ icon, title, onPress, showArrow = true, textStyle }: SettingsItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex flex-row items-center justify-between py-3">
      <View className="flex flex-row items-center gap-3">
        <Image source={icon} className="size-6" />
        <Text className={`text-lg text-black-300 font-rubik-medium ${textStyle}`}>{title}</Text>
      </View>

      {showArrow && <Image source={icons.rightArrow} className="size-5" />}
    </TouchableOpacity>
  );
};

export default SettingsItem;
