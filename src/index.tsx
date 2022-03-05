import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MapProvider } from "react-map-gl";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/700.css";
import { theme } from "./styles/theme";
import { HelmetProvider } from "react-helmet-async";
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <MapProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </MapProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
