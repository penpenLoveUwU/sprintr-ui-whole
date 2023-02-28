import React from "react";
import AppRouter from "./AppRouter";
import { useValetudoInformationQuery } from "./api";
import ValetudoSplash from "./components/ValetudoSplash";
export const MainApp = ({
  paletteMode,
  setPaletteMode
}) => {
  const {
    data: valetudoInformation,
    isLoading: valetudoInformationLoading
  } = useValetudoInformationQuery();
  const [hideWelcomeDialog, setHideWelcomeDialog] = React.useState(false);
  if (valetudoInformationLoading || !valetudoInformation) {
    return /*#__PURE__*/React.createElement(ValetudoSplash, null);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppRouter, {
    paletteMode: paletteMode,
    setPaletteMode: setPaletteMode
  }));
};