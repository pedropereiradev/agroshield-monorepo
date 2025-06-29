export interface GraphQLConfig {
  endpoint: string;
  headers?: Record<string, string>;
}

export function createGraphQLConfig(): GraphQLConfig {
  const endpoint =
    //@ts-ignore
    import.meta.env.VITE_INDEXER_GRAPHQL_ENDPOINT ||
    'http://localhost:8080/v1/graphql';

  return {
    endpoint,
  };
}
