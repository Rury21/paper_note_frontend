import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import defaultTheme from "./defaultTheme";
import { Router } from "./Router";

export const App = () => (
  <ChakraProvider theme={defaultTheme}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </ChakraProvider>
);
