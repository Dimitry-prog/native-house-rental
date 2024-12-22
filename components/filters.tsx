import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';

import { categories } from '@/constants/data';

type FiltersProps = {
  options?: {
    value: string;
    label: string;
  }[];
};

const Filters = ({ options = categories }: FiltersProps) => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(params.filter || ' All');

  const handleSelectCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory('All');
      router.setParams({ filter: 'All' });
      return;
    }
    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="my-3">
      {options.map((item) => (
        <TouchableOpacity
          onPress={() => handleSelectCategory(item.value)}
          key={item.value}
          className={`flex flex-col items-center mr-4 px-4 py-2 rounded-full ${
            selectedCategory === item.value
              ? 'bg-primary-300'
              : 'bg-primary-100 border border-primary-200'
          }`}>
          <Text
            className={`text-sm ${
              selectedCategory === item.value
                ? 'text-white font-rubik-bold mt-0.5'
                : 'text-black-300 font-rubik'
            }`}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;