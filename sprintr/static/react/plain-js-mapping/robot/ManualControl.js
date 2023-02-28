import React from "react";
import { Box, Button, Collapse, FormControlLabel, Grid, LinearProgress, Stack, Switch, Typography, styled } from "@mui/material";
import { Capability, useManualControlInteraction, useManualControlPropertiesQuery, useManualControlStateQuery } from "../api";
import { useCapabilitiesSupported } from "../CapabilitiesProvider";
import { FullHeightGrid } from "../components/FullHeightGrid";
import { ArrowDownward as ArrowDownwardIcon, ArrowUpward as ArrowUpwardIcon, RotateLeft as RotateLeftIcon, RotateRight as RotateRightIcon } from "@mui/icons-material";
import PaperContainer from "../components/PaperContainer";
const SideButton = styled(Button)({
  width: "30%",
  height: "100%"
});
const CenterButton = styled(Button)({
  width: "100%"
});
const ManualControlInternal = () => {
  const {
    data: manualControlState,
    isLoading: manualControlStateLoading,
    isError: manualControlStateError
  } = useManualControlStateQuery();
  const {
    data: manualControlProperties,
    isLoading: manualControlPropertiesLoading,
    isError: manualControlPropertiesError
  } = useManualControlPropertiesQuery();
  const {
    mutate: sendInteraction,
    isLoading: interacting
  } = useManualControlInteraction();
  const loading = manualControlPropertiesLoading || manualControlStateLoading;
  const controls = React.useMemo(() => {
    if (manualControlPropertiesError || manualControlStateError || !manualControlProperties || !manualControlState) {
      return /*#__PURE__*/React.createElement(Typography, {
        color: "error"
      }, "Error loading manual controls");
    }
    const controlsEnabled = !loading && manualControlState.enabled && !interacting;
    const forwardEnabled = controlsEnabled && manualControlProperties.supportedMovementCommands.includes("forward");
    const backwardEnabled = controlsEnabled && manualControlProperties.supportedMovementCommands.includes("backward");
    const rotateCwEnabled = controlsEnabled && manualControlProperties.supportedMovementCommands.includes("rotate_clockwise");
    const rotateCcwEnabled = controlsEnabled && manualControlProperties.supportedMovementCommands.includes("rotate_counterclockwise");
    const sendMoveCommand = command => {
      sendInteraction({
        action: "move",
        movementCommand: command
      });
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormControlLabel, {
      control: /*#__PURE__*/React.createElement(Switch, {
        checked: manualControlState.enabled,
        disabled: loading || interacting,
        onChange: e => {
          sendInteraction({
            action: e.target.checked ? "enable" : "disable"
          });
        }
      }),
      label: "Enable manual control",
      style: {
        marginLeft: 0
      }
    }), /*#__PURE__*/React.createElement(Box, null), /*#__PURE__*/React.createElement(Stack, {
      direction: "row",
      sx: {
        width: "100%",
        height: "30vh"
      },
      justifyContent: "center",
      alignItems: "center"
    }, /*#__PURE__*/React.createElement(SideButton, {
      variant: "outlined",
      disabled: !rotateCcwEnabled,
      onClick: () => {
        sendMoveCommand("rotate_counterclockwise");
      }
    }, /*#__PURE__*/React.createElement(RotateLeftIcon, null)), /*#__PURE__*/React.createElement(Stack, {
      sx: {
        width: "40%",
        height: "100%",
        ml: 1,
        mr: 1
      },
      justifyContent: "space-between"
    }, /*#__PURE__*/React.createElement(CenterButton, {
      sx: {
        height: "65%"
      },
      variant: "outlined",
      disabled: !forwardEnabled,
      onClick: () => {
        sendMoveCommand("forward");
      }
    }, /*#__PURE__*/React.createElement(ArrowUpwardIcon, null)), /*#__PURE__*/React.createElement(CenterButton, {
      sx: {
        height: "30%"
      },
      variant: "outlined",
      disabled: !backwardEnabled,
      onClick: () => {
        sendMoveCommand("backward");
      }
    }, /*#__PURE__*/React.createElement(ArrowDownwardIcon, null))), /*#__PURE__*/React.createElement(SideButton, {
      variant: "outlined",
      disabled: !rotateCwEnabled,
      onClick: () => {
        sendMoveCommand("rotate_clockwise");
      }
    }, /*#__PURE__*/React.createElement(RotateRightIcon, null))));
  }, [loading, manualControlProperties, manualControlPropertiesError, manualControlState, manualControlStateError, sendInteraction, interacting]);
  return React.useMemo(() => {
    return /*#__PURE__*/React.createElement(FullHeightGrid, {
      container: true,
      direction: "column"
    }, /*#__PURE__*/React.createElement(Grid, {
      item: true,
      flexGrow: 1
    }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Collapse, {
      in: loading
    }, /*#__PURE__*/React.createElement(LinearProgress, null)), controls)));
  }, [loading, controls]);
};
const ManualControl = () => {
  const [supported] = useCapabilitiesSupported(Capability.ManualControl);
  return /*#__PURE__*/React.createElement(PaperContainer, null, supported ? /*#__PURE__*/React.createElement(ManualControlInternal, null) : /*#__PURE__*/React.createElement(Typography, {
    color: "error"
  }, "This robot does not support the manual control."));
};
export default ManualControl;