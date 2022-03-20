import { extendTheme } from "@chakra-ui/react";

const defaultTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.700",
        color: "gray.900",
      },
      input: {
        baseStyle: { _focus: { boxShadow: "none" } },
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        _focus: { boxShadow: "none" },
      },
    },
  },
});
export default defaultTheme;
