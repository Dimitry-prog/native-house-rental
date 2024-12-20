import { Text, View } from 'react-native';

import { Link } from 'expo-router';

const Index = () => {
  return (
    <View>
      <Text className="font-bold text-2xl">Welcome to House Rental</Text>
      <Link href="/sign-in">Sign In</Link>
      <Link href="/explore">Explore</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/properties/1">Property</Link>
    </View>
  );
};

export default Index;
