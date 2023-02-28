import React from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText, Switch, Typography } from "@mui/material";
export const ToggleSwitchListMenuItem = ({
  value,
  setValue,
  disabled,
  loadError,
  primaryLabel,
  secondaryLabel,
  icon
}) => {
  let toggle;
  if (loadError) {
    toggle = /*#__PURE__*/React.createElement(Typography, {
      variant: "body2",
      color: "error"
    }, "Error");
  } else {
    toggle = /*#__PURE__*/React.createElement(Switch, {
      disabled: disabled,
      checked: value ?? false,
      onChange: e => {
        setValue(e.target.checked);
      }
    });
  }
  return /*#__PURE__*/React.createElement(ListItem, {
    style: {
      userSelect: "none"
    }
  }, /*#__PURE__*/React.createElement(ListItemAvatar, null, /*#__PURE__*/React.createElement(Avatar, null, icon)), /*#__PURE__*/React.createElement(ListItemText, {
    primary: primaryLabel,
    secondary: secondaryLabel,
    style: {
      marginRight: "2rem"
    }
  }), toggle);
};