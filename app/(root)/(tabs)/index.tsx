import { useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import Card from '@/components/card';
import EmptyDocumentsResult from '@/components/empty-documents-result';
import FeaturedCard from '@/components/featured-card';
import Filters from '@/components/filters';
import Search from '@/components/search';
import icons from '@/constants/icons';
import { useAppwrite } from '@/hooks/use-appwrite';
import { useGlobalContext } from '@/hooks/use-global-context';
import { getLatestProperties } from '@/services/get-latest-properties';
import { getProperties } from '@/services/get-properties';

const Index = () => {
  const { user } = useGlobalContext();
  const { filter, query } = useLocalSearchParams<{ query?: string; filter?: string }>();
  const { data: latestProperties, loading: loadingLatestProperties } = useAppwrite({
    fn: getLatestProperties,
  });
  const {
    data: properties,
    loading: loadingProperties,
    refetch: refetchProperties,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter,
      query,
    },
    skip: true,
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  useEffect(() => {
    refetchProperties({
      filter,
      query,
    });
  }, [filter, query]);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={properties}
        renderItem={({ item }) => <Card data={item} onPress={() => handleCardPress(item.$id)} />}
        keyExtractor={(item) => item.$id.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loadingProperties ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <EmptyDocumentsResult />
          )
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image source={{ uri: user?.avatar }} className="size-12 rounded-full" />

                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-black-100">Good Morning</Text>
                  <Text className="text-base font-rubik-medium text-black-300">{user?.name}</Text>
                </View>
              </View>

              <Image source={icons.bell} className="size-6" />
            </View>

            <Search />

            {loadingLatestProperties ? (
              <ActivityIndicator size="large" className="text-primary-300 mt-5" />
            ) : latestProperties && latestProperties.length > 0 ? (
              <View className="my-5">
                <View className="flex flex-row items-center justify-between">
                  <Text className="text-xl font-rubik-bold text-black-300">Featured</Text>
                  <TouchableOpacity>
                    <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={latestProperties}
                  renderItem={({ item }) => (
                    <FeaturedCard data={item} onPress={() => handleCardPress(item.$id)} />
                  )}
                  keyExtractor={(item) => item.$id.toString()}
                  horizontal
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="flex gap-5 mt-5"
                />
              </View>
            ) : null}

            <View className="flex flex-row items-center justify-between mt-5">
              <Text className="text-xl font-rubik-bold text-black-300">Our Recommendation</Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
              </TouchableOpacity>
            </View>

            <Filters />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Index;
