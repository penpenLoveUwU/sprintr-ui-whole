function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { useGoToMutation, useRobotStatusQuery } from "../../../api";
import React from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { ActionButton } from "../../Styled";
import IntegrationHelpDialog from "../../../components/IntegrationHelpDialog";
import { useLongPress } from "use-long-press";
import { floorObject } from "../../../api/utils";
const GoToActions = props => {
  const {
    goToTarget,
    convertPixelCoordinatesToCMSpace,
    onClear
  } = props;
  const [integrationHelpDialogOpen, setIntegrationHelpDialogOpen] = React.useState(false);
  const [integrationHelpDialogPayload, setIntegrationHelpDialogPayload] = React.useState("");
  const {
    data: status
  } = useRobotStatusQuery(state => {
    return state.value;
  });
  const {
    mutate: goTo,
    isLoading: goToIsExecuting
  } = useGoToMutation({
    onSuccess: onClear
  });
  const canGo = status === "idle" || status === "docked" || status === "paused" || status === "returning" || status === "error";
  const handleClick = React.useCallback(() => {
    if (!canGo || !goToTarget) {
      return;
    }
    goTo(convertPixelCoordinatesToCMSpace({
      x: goToTarget.x0,
      y: goToTarget.y0
    }));
  }, [canGo, goToTarget, goTo, convertPixelCoordinatesToCMSpace]);
  const handleLongClick = React.useCallback(() => {
    if (!goToTarget) {
      return;
    }
    setIntegrationHelpDialogPayload(JSON.stringify({
      action: "goto",
      coordinates: floorObject(convertPixelCoordinatesToCMSpace({
        x: goToTarget.x0,
        y: goToTarget.y0
      }))
    }, null, 2));
    setIntegrationHelpDialogOpen(true);
  }, [goToTarget, convertPixelCoordinatesToCMSpace]);
  const setupClickHandlers = useLongPress(handleLongClick, {
    onCancel: event => {
      handleClick();
    },
    threshold: 500,
    captureEvent: true,
    cancelOnMovement: true
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 1,
    direction: "row-reverse",
    flexWrap: "wrap-reverse"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ActionButton, _extends({
    disabled: goToIsExecuting || !canGo || !goToTarget,
    color: "inherit",
    size: "medium",
    variant: "extended"
  }, setupClickHandlers()), "Go To Location", goToIsExecuting && /*#__PURE__*/React.createElement(CircularProgress, {
    color: "inherit",
    size: 18,
    style: {
      marginLeft: 10
    }
  }))), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ActionButton, {
    color: "inherit",
    size: "medium",
    variant: "extended",
    onClick: onClear
  }, "Clear")), !canGo && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "caption",
    color: "textSecondary"
  }, "Cannot go to point while the robot is busy"))), /*#__PURE__*/React.createElement(IntegrationHelpDialog, {
    dialogOpen: integrationHelpDialogOpen,
    setDialogOpen: open => {
      setIntegrationHelpDialogOpen(open);
    },
    helperText: "To trigger a \"Go To\" to the currently selected location via MQTT or REST, simply use this payload.",
    coordinatesWarning: true,
    payload: integrationHelpDialogPayload
  }));
};
export default GoToActions;