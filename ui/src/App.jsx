import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "../router.jsx";
import theme from "./_theme/index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
    </>
  );
}

export default App;
