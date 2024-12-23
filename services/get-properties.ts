import { Query } from 'react-native-appwrite';

import { getDatabasesDocuments } from '@/libs/get-databases-documents';

type getPropertiesProps = {
  filter?: string;
  query?: string;
  limit?: number;
};

export const getProperties = async ({ filter, query, limit = 6 }: getPropertiesProps) => {
  const buildQuery = [Query.orderDesc('$createdAt'), Query.limit(limit)];

  if (filter && filter !== 'All') buildQuery.push(Query.equal('type', filter));

  if (query)
    buildQuery.push(
      Query.or([
        Query.search('name', query),
        Query.search('address', query),
        Query.search('type', query),
      ]),
    );

  const documents = await getDatabasesDocuments(buildQuery);

  return documents;
};
