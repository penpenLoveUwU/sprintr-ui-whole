import { Card, CardContent, Divider, Grid, IconButton, styled, Typography } from "@mui/material";
import React from "react";
import { Help as HelpIcon, Refresh as RefreshIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import HelpDialog from "./HelpDialog";
const TopRightIconButton = styled(LoadingButton)(({
  theme
}) => {
  return {
    marginTop: -theme.spacing(1),
    minWidth: 0
  };
});
const ReloadableCard = ({
  title,
  onReload,
  reloadButton,
  children,
  loading = false,
  divider = true,
  boxShadow,
  helpText
}) => {
  const [helpDialogOpen, setHelpDialogOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, {
    sx: {
      boxShadow: boxShadow
    }
  }, /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 4,
    alignItems: "center",
    justifyContent: "space-between"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "h6",
    gutterBottom: true
  }, title)), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true
  }, helpText && /*#__PURE__*/React.createElement(Grid, {
    item: true,
    style: {
      marginTop: "-0.125rem"
    } //:(
  }, /*#__PURE__*/React.createElement(IconButton, {
    onClick: () => {
      return setHelpDialogOpen(true);
    },
    title: "Help"
  }, /*#__PURE__*/React.createElement(HelpIcon, null))), reloadButton || onReload && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(TopRightIconButton, {
    loading: loading,
    onClick: onReload,
    title: "Refresh"
  }, /*#__PURE__*/React.createElement(RefreshIcon, null)))))), divider && /*#__PURE__*/React.createElement(Divider, {
    sx: {
      mb: 1
    }
  }), children)), helpText && /*#__PURE__*/React.createElement(HelpDialog, {
    dialogOpen: helpDialogOpen,
    setDialogOpen: open => {
      setHelpDialogOpen(open);
    },
    helpText: helpText
  }));
};
export default ReloadableCard;