export interface GraphQLConfig {
  endpoint: string;
  headers?: Record<string, string>;
}

export function createGraphQLConfig(): GraphQLConfig {
  const endpoint =
    process.env.VITE_INDEXER_GRAPHQL_ENDPOINT ||
    'http://localhost:8080/v1/graphql';
  const adminSecret = process.env.VITE_INDEXER_HASURA_ADMIN_SECRET || 'testing';

  return {
    endpoint,
    headers: {
      'x-hasura-admin-secret': adminSecret,
    },
  };
}
