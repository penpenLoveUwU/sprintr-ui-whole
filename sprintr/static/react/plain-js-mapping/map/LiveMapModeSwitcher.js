import { Box, emphasize, SpeedDial, SpeedDialAction, styled } from "@mui/material";
import { CropSquare as ZoneModeIcon, Dashboard as SegmentModeIcon, Room as GoToModeIcon, QuestionMark as NoneModeIcon } from "@mui/icons-material";
import React from "react";
const LiveMapModeButtonContainer = styled(Box)(({
  theme
}) => {
  return {
    position: "absolute",
    pointerEvents: "none",
    top: theme.spacing(2),
    right: theme.spacing(2)
  };
});
const StyledSpeedDial = styled(SpeedDial)(({
  theme
}) => {
  return {
    "& .MuiSpeedDial-fab": {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      "&:hover": {
        backgroundColor: emphasize(theme.palette.background.paper, 0.15)
      }
    },
    "& > .MuiSpeedDial-actions > .MuiSpeedDialAction-staticTooltip > .MuiSpeedDialAction-staticTooltipLabel": {
      transition: "none !important",
      WebkitTransition: "none !important",
      transitionDelay: "unset !important",
      userSelect: "none",
      whiteSpace: "nowrap"
    },
    "& > .MuiSpeedDial-actions > .MuiSpeedDialAction-staticTooltip > .MuiFab-root": {
      transition: "none !important",
      WebkitTransition: "none !important",
      transitionDelay: "unset !important",
      border: `1px solid ${theme.palette.divider}`
    }
  };
});
const modeToIcon = {
  "segments": /*#__PURE__*/React.createElement(SegmentModeIcon, null),
  "zones": /*#__PURE__*/React.createElement(ZoneModeIcon, null),
  "goto": /*#__PURE__*/React.createElement(GoToModeIcon, null),
  "none": /*#__PURE__*/React.createElement(NoneModeIcon, null)
};
const modeToLabel = {
  "segments": "Segments",
  "zones": "Zones",
  "goto": "Go To",
  "none": "None"
};
/* eslint-disable react/display-name */
export const NoTransition = /*#__PURE__*/React.forwardRef(({
  children
}, ref) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, children);
});
export const LiveMapModeSwitcher = ({
  supportedModes,
  currentMode,
  setMode
}) => {
  const [open, setOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement(LiveMapModeButtonContainer, null, /*#__PURE__*/React.createElement(StyledSpeedDial, {
    open: open,
    onClick: () => {
      setOpen(!open);
    },
    icon: modeToIcon[currentMode],
    title: "Map Mode Selector",
    FabProps: {
      size: "small"
    },
    ariaLabel: "Map Mode Selector",
    direction: "down",
    TransitionComponent: NoTransition
  }, supportedModes.map(mode => /*#__PURE__*/React.createElement(SpeedDialAction, {
    key: mode,
    tooltipOpen: true,
    tooltipTitle: modeToLabel[mode],
    icon: modeToIcon[mode],
    onClick: () => {
      setMode(mode);
      setOpen(false);
    }
  }))));
};