import React from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { ArrowForwardIos as ArrowIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
export const LinkListMenuItem = ({
  url,
  primaryLabel,
  secondaryLabel,
  icon
}) => {
  return /*#__PURE__*/React.createElement(ListItem, {
    secondaryAction: /*#__PURE__*/React.createElement(ArrowIcon, null),
    style: {
      cursor: "pointer",
      userSelect: "none",
      color: "inherit" //for the link
    },
    component: Link,
    to: url
  }, /*#__PURE__*/React.createElement(ListItemAvatar, null, /*#__PURE__*/React.createElement(Avatar, null, icon)), /*#__PURE__*/React.createElement(ListItemText, {
    primary: primaryLabel,
    secondary: secondaryLabel,
    style: {
      marginRight: "2rem"
    }
  }));
};