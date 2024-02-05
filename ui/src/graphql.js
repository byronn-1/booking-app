import { ApolloClient, InMemoryCache } from '@apollo/client';

export const graphqlClient = new ApolloClient({
  uri: 'http://54.154.39.93:8080/graphql',
  cache: new InMemoryCache()
});