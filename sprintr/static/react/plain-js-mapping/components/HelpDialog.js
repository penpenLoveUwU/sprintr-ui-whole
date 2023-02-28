import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Button, Dialog, DialogActions, styled } from "@mui/material";
import style from "./HelpDialog.module.css";
const StyledDialog = styled(Dialog)(({
  theme
}) => {
  return {
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2)
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1)
    }
  };
});
const HelpDialog = ({
  dialogOpen,
  setDialogOpen,
  helpText
}) => {
  return /*#__PURE__*/React.createElement(StyledDialog, {
    onClose: () => {
      setDialogOpen(false);
    },
    open: dialogOpen
  }, /*#__PURE__*/React.createElement(ReactMarkdown, {
    remarkPlugins: [gfm],
    rehypePlugins: [rehypeRaw],
    className: style.reactMarkDown
  }, helpText), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    autoFocus: true,
    onClick: () => {
      setDialogOpen(false);
    }
  }, "OK")));
};
export default HelpDialog;