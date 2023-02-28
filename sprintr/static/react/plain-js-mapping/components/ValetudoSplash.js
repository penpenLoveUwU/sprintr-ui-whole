import { ReactComponent as SplashLogo } from "../assets/icons/valetudo_splash.svg";
import { CircularProgress, Grid } from "@mui/material";
const ValetudoSplash = () => {
  return /*#__PURE__*/React.createElement(Grid, {
    container: true,
    sx: {
      width: "90%",
      height: "50%",
      margin: "auto",
      marginTop: "25%",
      marginBottom: "25%",
      maxWidth: "600px",
      minHeight: "90%"
    },
    direction: "column",
    alignItems: "center",
    justifyContent: "center"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(SplashLogo, {
    style: {
      width: "90%",
      marginLeft: "5%"
    }
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    sx: {
      marginTop: "3em"
    }
  }, /*#__PURE__*/React.createElement(CircularProgress, null)));
};
export default ValetudoSplash;