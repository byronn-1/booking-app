import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "../router.jsx";
import theme from "./_theme/index";
import { ApolloProvider } from "@apollo/client";
import { graphqlClient } from "./graphql.js";

function App() {
  return (
    <>
      <ApolloProvider client={graphqlClient}>
        <ChakraProvider theme={theme}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
