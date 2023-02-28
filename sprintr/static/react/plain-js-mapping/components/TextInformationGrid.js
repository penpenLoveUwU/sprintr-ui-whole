import React from "react";
import { Grid, Typography } from "@mui/material";
const TextInformationGrid = ({
  items
}) => {
  return /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 2,
    style: {
      wordBreak: "break-all"
    }
  }, items.map(item => {
    return /*#__PURE__*/React.createElement(Grid, {
      item: true,
      key: item.header
    }, /*#__PURE__*/React.createElement(Typography, {
      variant: "caption",
      color: "textSecondary"
    }, item.header), /*#__PURE__*/React.createElement(Typography, {
      variant: "body2"
    }, item.body));
  }));
};
export default TextInformationGrid;