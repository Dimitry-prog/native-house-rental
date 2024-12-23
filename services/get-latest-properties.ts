import { Query } from 'react-native-appwrite';

import { getDatabasesDocuments } from '@/libs/get-databases-documents';

export const getLatestProperties = async () => {
  const documents = await getDatabasesDocuments([Query.orderAsc('$createdAt'), Query.limit(5)]);

  return documents;
};
