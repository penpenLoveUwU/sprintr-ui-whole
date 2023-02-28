import { HashRouter } from "react-router-dom";
import Div100vh from "react-div-100vh";
import HomePage from "./HomePage";
import { styled } from "@mui/material";
import React from "react";
// import ValetudoRouter from "./valetudo";
const Root = styled(Div100vh)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start"
});
const Content = styled("main")({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  overflow: "auto"
});
const AppRouter = ({
  paletteMode,
  setPaletteMode
}) => {
  return /*#__PURE__*/React.createElement(HashRouter, null, /*#__PURE__*/React.createElement(Root, null, /*#__PURE__*/React.createElement(Content, null, /*#__PURE__*/React.createElement(HomePage, null))));
};
export default AppRouter;