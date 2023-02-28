import { CircularProgress, Fade } from "@mui/material";
import React from "react";
const LoadingFade = ({
  in: fadeIn = true,
  transitionDelay = "500ms",
  size
}) => {
  return /*#__PURE__*/React.createElement(Fade, {
    in: fadeIn,
    style: {
      transitionDelay
    },
    unmountOnExit: true
  }, /*#__PURE__*/React.createElement(CircularProgress, {
    size: size
  }));
};
export default LoadingFade;