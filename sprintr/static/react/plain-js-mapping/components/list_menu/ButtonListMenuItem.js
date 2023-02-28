import React from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ConfirmationDialog from "../ConfirmationDialog";
export const ButtonListMenuItem = ({
  primaryLabel,
  secondaryLabel,
  icon,
  buttonLabel,
  buttonColor,
  confirmationDialog,
  action,
  actionLoading
}) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ListItem, {
    style: {
      userSelect: "none"
    }
  }, icon && /*#__PURE__*/React.createElement(ListItemAvatar, null, /*#__PURE__*/React.createElement(Avatar, null, icon)), /*#__PURE__*/React.createElement(ListItemText, {
    primary: primaryLabel,
    secondary: secondaryLabel,
    style: {
      marginRight: "2rem"
    }
  }), /*#__PURE__*/React.createElement(LoadingButton, {
    loading: actionLoading,
    color: buttonColor,
    variant: "outlined",
    onClick: () => {
      if (confirmationDialog) {
        setDialogOpen(true);
      } else {
        action();
      }
    },
    sx: {
      mt: 1,
      mb: 1,
      minWidth: 0
    }
  }, buttonLabel)), confirmationDialog !== undefined && /*#__PURE__*/React.createElement(ConfirmationDialog, {
    title: confirmationDialog.title,
    text: confirmationDialog.body,
    open: dialogOpen,
    onClose: () => {
      setDialogOpen(false);
    },
    onAccept: action
  }));
};