import { useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import Card from '@/components/card';
import EmptyDocumentsResult from '@/components/empty-documents-result';
import Filters from '@/components/filters';
import Search from '@/components/search';
import icons from '@/constants/icons';
import { useAppwrite } from '@/hooks/use-appwrite';
import { getProperties } from '@/services/get-properties';

const Explore = () => {
  const { filter, query } = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    loading: loadingProperties,
    refetch: refetchProperties,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter,
      query,
      limit: 20,
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
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                <Image source={icons.backArrow} className="size-6" />
              </TouchableOpacity>

              <Text className="text-center font-rubik-medium text-black-300 text-base mr-2">
                Search for your ideal home
              </Text>

              <Image source={icons.bell} className="size-6" />
            </View>

            <Search />

            <View className="mt-5">
              <Filters />
              <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                Found {properties?.length}
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Explore;
