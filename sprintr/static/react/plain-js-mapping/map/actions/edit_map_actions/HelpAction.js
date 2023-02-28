import React from "react";
import { Box, styled } from "@mui/material";
import { ActionButton } from "../../Styled";
import { Help as HelpIcon } from "@mui/icons-material";
const HelpButtonContainer = styled(Box)(({
  theme
}) => {
  return {
    position: "absolute",
    pointerEvents: "none",
    top: theme.spacing(2),
    right: theme.spacing(2)
  };
});
const ModeSwitchAction = ({
  helpDialogOpen,
  setHelpDialogOpen
}) => {
  return /*#__PURE__*/React.createElement(HelpButtonContainer, null, /*#__PURE__*/React.createElement(ActionButton, {
    color: "inherit",
    size: "medium",
    variant: "extended",
    onClick: () => {
      setHelpDialogOpen(true);
    },
    title: "Help"
  }, /*#__PURE__*/React.createElement(HelpIcon, null)));
};
export default ModeSwitchAction;