import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
const ConfirmationDialog = ({
  title,
  text,
  open,
  children,
  onClose,
  onAccept
}) => {
  return /*#__PURE__*/React.createElement(Dialog, {
    open: open,
    onClose: onClose
  }, /*#__PURE__*/React.createElement(DialogTitle, null, title), /*#__PURE__*/React.createElement(DialogContent, null, text && /*#__PURE__*/React.createElement(DialogContentText, {
    style: {
      whiteSpace: "pre-wrap"
    }
  }, text), children), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      onAccept();
      onClose();
    },
    autoFocus: true
  }, "Yes"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      onClose();
    }
  }, "No")));
};
export default ConfirmationDialog;