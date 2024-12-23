import { Models } from 'react-native-appwrite';

import { config, databases } from '@/libs/appwrite';

export const getDatabasesDocuments = async (queries: string[]) => {
  try {
    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      queries,
    );
    return result.documents;
  } catch (e) {
    console.log(e);
    return [] as Models.Document[];
  }
};
