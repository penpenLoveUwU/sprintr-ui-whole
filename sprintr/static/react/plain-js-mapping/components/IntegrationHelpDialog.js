import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import InfoBox from "./InfoBox";
const IntegrationHelpDialog = ({
  dialogOpen,
  setDialogOpen,
  helperText,
  coordinatesWarning,
  payload
}) => {
  return /*#__PURE__*/React.createElement(Dialog, {
    onClose: () => {
      setDialogOpen(false);
    },
    open: dialogOpen,
    style: {
      userSelect: "none"
    }
  }, /*#__PURE__*/React.createElement(DialogTitle, null, "Connect with other applications"), /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement(DialogContentText, {
    component: "span"
  }, helperText, coordinatesWarning && /*#__PURE__*/React.createElement(InfoBox, {
    boxShadow: 5,
    style: {
      marginTop: "1.5rem"
    }
  }, /*#__PURE__*/React.createElement(Typography, {
    color: "info"
  }, "Please note that the coordinates displayed here can become invalid if the underlying map changes.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "1rem"
    }
  }, /*#__PURE__*/React.createElement("pre", {
    style: {
      backgroundColor: "#000000",
      padding: "1rem",
      userSelect: "text",
      color: "#ffffff",
      fontFamily: "\"JetBrains Mono\",monospace",
      fontWeight: 200,
      whiteSpace: "pre-wrap"
    }
  }, payload)))), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    autoFocus: true,
    onClick: () => {
      setDialogOpen(false);
    }
  }, "OK")));
};
export default IntegrationHelpDialog;