import { RobotAttributeClass, useRobotAttributeQuery } from "../api";
import { Box, Grid, Paper, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import LoadingFade from "../components/LoadingFade";
const Attachments = () => {
  const {
    data: attachments,
    isLoading: isAttachmentLoading,
    isError: isAttachmentError
  } = useRobotAttributeQuery(RobotAttributeClass.AttachmentState);
  const attachmentDetails = React.useMemo(() => {
    if (isAttachmentError) {
      return /*#__PURE__*/React.createElement(Typography, {
        color: "error"
      }, "Error loading attachment state");
    }
    if (attachments === undefined) {
      return null;
    }
    if (attachments.length === 0) {
      return /*#__PURE__*/React.createElement(Typography, {
        color: "textSecondary"
      }, "No attachments found");
    }
    return /*#__PURE__*/React.createElement(ToggleButtonGroup, {
      size: "small",
      fullWidth: true
    }, attachments.map(({
      type,
      attached
    }) => {
      return /*#__PURE__*/React.createElement(ToggleButton, {
        disabled: true,
        selected: attached,
        key: type,
        value: type,
        fullWidth: true
      }, type);
    }));
  }, [attachments, isAttachmentError]);
  return /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Paper, null, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "column"
  }, /*#__PURE__*/React.createElement(Box, {
    px: 2,
    pt: 1
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    container: true,
    alignItems: "center",
    spacing: 1
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "subtitle1"
  }, "Attachments")), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(LoadingFade, {
    in: isAttachmentLoading,
    transitionDelay: isAttachmentLoading ? "500ms" : "0ms",
    size: 20
  }))), /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "row",
    sx: {
      paddingBottom: "8px",
      paddingTop: "8px",
      maxHeight: "4em"
    }
  }, attachmentDetails)))));
};
export default Attachments;