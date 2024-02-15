import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from 'react-router-dom';
import { ApolloProvider } from "@apollo/client";
import { graphqlClient } from "./graphql.js";
import { Provider, useDispatch } from "react-redux";

import theme from "./_theme/index";
import { store } from "./_shared/redux/store.js";
import { router } from "../router.jsx";

function App() {
  return (
    <>
      <ApolloProvider client={graphqlClient}>
        <ChakraProvider theme={theme}>
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
