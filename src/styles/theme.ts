import { extendTheme } from "@chakra-ui/react";
import colors from "./tokens/colors";
import { components } from "./tokens/components";
import config from "./tokens/config";
import fonts from "./tokens/fonts";

const theme = extendTheme({
  config,
  fonts,
  colors,
  components,
});

export { theme };
