import { Divider, Grid, IconButton, styled, Typography } from "@mui/material";
import React from "react";
import { Help as HelpIcon, Refresh as RefreshIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import HelpDialog from "./HelpDialog";
const TopRightRefreshButton = styled(LoadingButton)(({
  theme
}) => {
  return {
    minWidth: 0
  };
});
const DetailPageHeaderRow = ({
  title,
  icon,
  helpText,
  onRefreshClick,
  isRefreshing
}) => {
  const [helpDialogOpen, setHelpDialogOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    container: true,
    alignItems: "center",
    spacing: 1,
    justifyContent: "space-between"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    style: {
      paddingRight: "8px"
    }
  }, icon), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Typography, null, title))), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true
  }, helpText !== undefined && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    style: {
      marginTop: "-0.125rem"
    } //:(
  }, /*#__PURE__*/React.createElement(IconButton, {
    onClick: () => {
      return setHelpDialogOpen(true);
    },
    title: "Help"
  }, /*#__PURE__*/React.createElement(HelpIcon, null))), /*#__PURE__*/React.createElement(HelpDialog, {
    dialogOpen: helpDialogOpen,
    setDialogOpen: open => {
      setHelpDialogOpen(open);
    },
    helpText: helpText
  })), onRefreshClick !== undefined && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(TopRightRefreshButton, {
    loading: isRefreshing ?? false,
    onClick: onRefreshClick,
    title: "Refresh"
  }, /*#__PURE__*/React.createElement(RefreshIcon, null)))))), /*#__PURE__*/React.createElement(Divider, {
    sx: {
      mt: 1
    }
  }));
};
export default DetailPageHeaderRow;