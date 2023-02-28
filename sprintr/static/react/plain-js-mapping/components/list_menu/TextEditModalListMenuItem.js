import React from "react";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Edit as EditIcon } from "@mui/icons-material";
export const TextEditModalListMenuItem = ({
  primaryLabel,
  secondaryLabel,
  icon,
  dialog,
  value,
  isLoading
}) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editorValue, setEditorValue] = React.useState(value);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ListItem, {
    style: {
      userSelect: "none"
    }
  }, /*#__PURE__*/React.createElement(ListItemAvatar, null, /*#__PURE__*/React.createElement(Avatar, null, icon)), /*#__PURE__*/React.createElement(ListItemText, {
    primary: primaryLabel,
    secondary: secondaryLabel,
    style: {
      marginRight: "2rem"
    }
  }), /*#__PURE__*/React.createElement(LoadingButton, {
    loading: isLoading,
    variant: "outlined",
    onClick: () => {
      setEditorValue(value);
      setDialogOpen(true);
    },
    sx: {
      mt: 1,
      mb: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(EditIcon, null))), /*#__PURE__*/React.createElement(TextEditModal, {
    dialogOpen: dialogOpen,
    setDialogOpen: setDialogOpen,
    title: dialog.title,
    description: dialog.description,
    value: editorValue,
    setValue: newValue => {
      if (typeof dialog.validatingTransformer === "function") {
        setEditorValue(dialog.validatingTransformer(newValue));
      } else {
        setEditorValue(newValue);
      }
    },
    onSave: dialog.onSave
  }));
};
const TextEditModal = ({
  dialogOpen,
  setDialogOpen,
  title,
  description,
  value,
  setValue,
  onSave
}) => {
  return /*#__PURE__*/React.createElement(Dialog, {
    open: dialogOpen,
    onClose: () => {
      setDialogOpen(false);
    }
  }, /*#__PURE__*/React.createElement(DialogTitle, null, title), /*#__PURE__*/React.createElement(DialogContent, null, description && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DialogContentText, {
    style: {
      whiteSpace: "pre-wrap"
    }
  }, description), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement(Input, {
    type: "text",
    fullWidth: true,
    value: value,
    sx: {
      mb: 1
    },
    onChange: e => {
      setValue(e.target.value);
    }
  })), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      onSave(value);
      setDialogOpen(false);
    },
    autoFocus: true
  }, "Save"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      setDialogOpen(false);
    }
  }, "Cancel")));
};