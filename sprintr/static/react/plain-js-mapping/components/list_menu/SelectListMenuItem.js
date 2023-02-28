import React from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText, MenuItem, Select, Typography } from "@mui/material";
export const SelectListMenuItem = ({
  options,
  currentValue,
  setValue,
  disabled,
  loadError,
  primaryLabel,
  secondaryLabel,
  icon
}) => {
  let select;
  if (loadError) {
    select = /*#__PURE__*/React.createElement(Typography, {
      variant: "body2",
      color: "error"
    }, "Error");
  } else {
    select = /*#__PURE__*/React.createElement(Select, {
      disabled: disabled,
      value: currentValue.value,
      onChange: e => {
        const selectedOption = options.find(option => option.value === e.target.value);
        if (selectedOption) {
          setValue(selectedOption);
        }
      }
    }, options.map((o, i) => {
      return /*#__PURE__*/React.createElement(MenuItem, {
        value: o.value,
        key: `${o}_${i}`
      }, o.label);
    }));
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
  }), select);
};