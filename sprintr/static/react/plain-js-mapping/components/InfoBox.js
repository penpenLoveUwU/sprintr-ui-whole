import React from "react";
import { Grid, Paper } from "@mui/material";
import { Announcement } from "@mui/icons-material";
const InfoBox = props => {
  return /*#__PURE__*/React.createElement(Paper, {
    style: props.style,
    sx: {
      boxShadow: props.boxShadow
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "row",
    alignItems: "center",
    style: {
      padding: "1rem"
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    style: {
      marginLeft: "auto",
      marginRight: "auto"
    }
  }, /*#__PURE__*/React.createElement(Announcement, {
    fontSize: "large",
    color: "info"
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    style: {
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto"
    }
  }, props.children)));
};
export default InfoBox;