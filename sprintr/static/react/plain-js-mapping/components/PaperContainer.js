import React from "react";
import { Container, Paper } from "@mui/material";
import styles from "./PaperContainer.module.css";
const PaperContainer = props => {
  return /*#__PURE__*/React.createElement(Container, {
    className: styles.paperContainerContainer,
    style: props.containerStyle
  }, /*#__PURE__*/React.createElement(Paper, {
    className: styles.paperContainerPaper,
    style: props.paperStyle,
    sx: {
      boxShadow: props.paperBoxShadow
    }
  }, props.children));
};
export default PaperContainer;