import { GraphQLClient } from 'graphql-request';
import { createGraphQLConfig } from './config';

let clientInstance: GraphQLClient | null = null;

export function createGraphQLClient(): GraphQLClient {
  if (clientInstance) {
    return clientInstance;
  }

  const config = createGraphQLConfig();

  clientInstance = new GraphQLClient(config.endpoint, {
    headers: config.headers,
  });

  return clientInstance;
}

export const graphQLClient = createGraphQLClient();
