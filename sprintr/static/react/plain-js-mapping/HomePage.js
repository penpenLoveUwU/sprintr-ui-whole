import { Box, Grid, styled } from "@mui/material";
import { useIsMobileView } from "./hooks";
import { FullHeightGrid } from "./components/FullHeightGrid";
import LiveMapPage from "./map/LiveMapPage";
import MobileControls from "./controls/MobileControls";
import React from "react";
const ScrollableGrid = styled(Grid)({
  overflow: "auto"
});
const HomePage = () => {
  const mobileView = useIsMobileView();
  const [mobileControlsOpen, setMobileControlsOpen] = React.useState(false);
  if (mobileView) {
    return /*#__PURE__*/React.createElement(Box, {
      sx: {
        height: "100%",
        width: "100%",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement(Box, {
      sx: {
        height: "calc(100% - 68px)",
        display: mobileControlsOpen ? "none" : "inherit"
      }
    }, /*#__PURE__*/React.createElement(LiveMapPage, null)), /*#__PURE__*/React.createElement(Box, {
      sx: {
        height: "5%",
        display: mobileControlsOpen ? "inherit" : "none"
      }
    }, "\xA0"), /*#__PURE__*/React.createElement(MobileControls, {
      open: mobileControlsOpen,
      setOpen: setMobileControlsOpen
    }));
  }
  return /*#__PURE__*/React.createElement(FullHeightGrid, {
    container: true,
    direction: "row",
    justifyContent: "space-evenly"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    sm: true,
    md: true,
    lg: true,
    xl: true
  }, /*#__PURE__*/React.createElement(LiveMapPage, null)));
};
export default HomePage;