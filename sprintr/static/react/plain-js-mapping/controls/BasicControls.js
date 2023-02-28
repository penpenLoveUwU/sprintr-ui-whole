import { Box, Button, ButtonGroup, DialogContentText, Grid, Paper, Typography } from "@mui/material";
import { useBasicControlMutation, useRobotStatusQuery } from "../api";
import { Home as HomeIcon, Pause as PauseIcon, PlayArrow as StartIcon, Stop as StopIcon } from "@mui/icons-material";
import React from "react";
import LoadingFade from "../components/LoadingFade";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { usePendingMapAction } from "../map/Map";
const StartStates = ["idle", "docked", "paused", "error"];
const PauseStates = ["cleaning", "returning", "moving"];
const BasicControls = () => {
  const [startConfirmationDialogOpen, setStartConfirmationDialogOpen] = React.useState(false);
  const {
    data: status,
    isLoading: statusLoading
  } = useRobotStatusQuery();
  const {
    mutate: executeBasicControlCommand,
    isLoading: basicControlIsExecuting
  } = useBasicControlMutation();
  const {
    hasPendingMapAction: hasPendingMapAction
  } = usePendingMapAction();
  const isLoading = basicControlIsExecuting;
  const sendCommand = command => {
    if (command === "start" && hasPendingMapAction) {
      setStartConfirmationDialogOpen(true);
    } else {
      executeBasicControlCommand(command);
    }
  };
  if (statusLoading) {
    return /*#__PURE__*/React.createElement(Grid, {
      item: true
    }, /*#__PURE__*/React.createElement(Paper, null, /*#__PURE__*/React.createElement(Box, {
      p: 1
    }, /*#__PURE__*/React.createElement(LoadingFade, null))));
  }
  if (status === undefined) {
    return /*#__PURE__*/React.createElement(Grid, {
      item: true
    }, /*#__PURE__*/React.createElement(Paper, null, /*#__PURE__*/React.createElement(Box, {
      p: 1
    }, /*#__PURE__*/React.createElement(Typography, {
      color: "error"
    }, "Error loading basic controls"))));
  }
  const {
    flag,
    value: state
  } = status;
  const buttons = [{
    command: "start",
    enabled: StartStates.includes(state),
    label: flag === "resumable" ? "Resume" : "Start",
    Icon: StartIcon
  }, {
    command: "pause",
    enabled: PauseStates.includes(state),
    Icon: PauseIcon,
    label: "Pause"
  }, {
    command: "stop",
    enabled: flag === "resumable" || state !== "idle" && state !== "docked",
    Icon: StopIcon,
    label: "Stop"
  }, {
    command: "home",
    enabled: state === "idle" || state === "error" || state === "paused",
    Icon: HomeIcon,
    label: "Dock"
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Paper, null, /*#__PURE__*/React.createElement(Box, {
    p: 1
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    container: true,
    direction: "column"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ButtonGroup, {
    fullWidth: true,
    variant: "outlined"
  }, buttons.map(({
    label,
    command,
    enabled,
    Icon
  }) => {
    return /*#__PURE__*/React.createElement(Button, {
      key: command,
      variant: "outlined",
      size: "medium",
      disabled: !enabled || isLoading,
      onClick: () => {
        sendCommand(command);
      },
      color: "inherit",
      style: {
        height: "3.5em",
        borderColor: "inherit"
      }
    }, /*#__PURE__*/React.createElement(Icon, null));
  }))))))), /*#__PURE__*/React.createElement(ConfirmationDialog, {
    title: "Are you sure you want to start a full cleanup?",
    open: startConfirmationDialogOpen,
    onClose: () => {
      setStartConfirmationDialogOpen(false);
    },
    onAccept: () => {
      executeBasicControlCommand("start");
    }
  }, /*#__PURE__*/React.createElement(DialogContentText, null, "You currently have a pending MapAction.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("strong", null, "Hint:"), /*#__PURE__*/React.createElement("br", null), "You might instead be looking for the button on the bottom right of the map.")));
};
export default BasicControls;