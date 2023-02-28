import React from "react";
import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CapabilitiesProvider from "./CapabilitiesProvider";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useLocalStorage } from "./hooks";
import { MainApp } from "./MainApp";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/jetbrains-mono/200.css";
const queryClient = new QueryClient();
const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [paletteMode, setPaletteMode] = useLocalStorage("palette-mode", prefersDarkMode ? "dark" : "light");
  const theme = React.useMemo(() => {
    return createTheme({
      palette: {
        mode: paletteMode
      }
    });
  }, [paletteMode]);
  return /*#__PURE__*/React.createElement(QueryClientProvider, {
    client: queryClient
  }, /*#__PURE__*/React.createElement(LocalizationProvider, {
    dateAdapter: AdapterDateFns
  }, /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/React.createElement(CssBaseline, null), /*#__PURE__*/React.createElement(SnackbarProvider, {
    maxSnack: 3,
    autoHideDuration: 5000
  }, /*#__PURE__*/React.createElement(CapabilitiesProvider, null, /*#__PURE__*/React.createElement(MainApp, {
    paletteMode: paletteMode,
    setPaletteMode: setPaletteMode
  })))), /*#__PURE__*/React.createElement(ReactQueryDevtools, {
    initialIsOpen: false
  })));
};
export default App;