import { ApolloClient, InMemoryCache } from '@apollo/client';
// Determine the environment-specific GraphQL endpoint URI
const graphqlEndpoint = import.meta.env.DEV ? import.meta.env.VITE_GRAPQL_EP_DEV : import.meta.env.VITE_GRAPQL_EP_PROD;

// Initialize ApolloClient with the environment-specific URI
export const graphqlClient = new ApolloClient({
  uri: graphqlEndpoint,
  cache: new InMemoryCache(),
});
