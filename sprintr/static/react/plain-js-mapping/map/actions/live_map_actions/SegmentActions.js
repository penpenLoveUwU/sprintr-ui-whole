function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { Capability, useCleanSegmentsMutation, useMapSegmentationPropertiesQuery, useRobotStatusQuery } from "../../../api";
import React from "react";
import { Box, Button, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { ActionButton } from "../../Styled";
import IntegrationHelpDialog from "../../../components/IntegrationHelpDialog";
import { useLongPress } from "use-long-press";
import { IterationsIcon } from "../../../assets/icon_components/IterationsIcon";
const SegmentActions = props => {
  const {
    segments,
    onClear
  } = props;
  const [iterationCount, setIterationCount] = React.useState(1);
  const [integrationHelpDialogOpen, setIntegrationHelpDialogOpen] = React.useState(false);
  const [integrationHelpDialogPayload, setIntegrationHelpDialogPayload] = React.useState("");
  const {
    data: mapSegmentationProperties,
    isLoading: mapSegmentationPropertiesLoading,
    isError: mapSegmentationPropertiesLoadError,
    refetch: refetchMapSegmentationProperties
  } = useMapSegmentationPropertiesQuery();
  const {
    data: status
  } = useRobotStatusQuery(state => {
    return state.value;
  });
  const {
    mutate: executeSegmentAction,
    isLoading: segmentActionExecuting
  } = useCleanSegmentsMutation({
    onSuccess: onClear
  });
  const canClean = status === "idle" || status === "docked" || status === "paused" || status === "returning" || status === "error";
  const didSelectSegments = segments.length > 0;
  const handleClick = React.useCallback(() => {
    if (!didSelectSegments || !canClean) {
      return;
    }
    executeSegmentAction({
      segment_ids: segments,
      iterations: iterationCount,
      customOrder: mapSegmentationProperties?.customOrderSupport
    });
  }, [canClean, didSelectSegments, executeSegmentAction, segments, iterationCount, mapSegmentationProperties]);
  const handleLongClick = React.useCallback(() => {
    setIntegrationHelpDialogPayload(JSON.stringify({
      action: "start_segment_action",
      segment_ids: segments,
      iterations: iterationCount ?? 1,
      customOrder: mapSegmentationProperties?.customOrderSupport ?? false
    }, null, 2));
    setIntegrationHelpDialogOpen(true);
  }, [segments, iterationCount, mapSegmentationProperties]);
  const setupClickHandlers = useLongPress(handleLongClick, {
    onCancel: event => {
      handleClick();
    },
    threshold: 500,
    captureEvent: true,
    cancelOnMovement: true
  });
  const handleIterationToggle = React.useCallback(() => {
    if (mapSegmentationProperties) {
      setIterationCount(iterationCount % mapSegmentationProperties.iterationCount.max + 1);
    }
  }, [iterationCount, setIterationCount, mapSegmentationProperties]);
  if (mapSegmentationPropertiesLoadError) {
    return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Typography, {
      color: "error"
    }, "Error loading ", Capability.MapSegmentation, " properties"), /*#__PURE__*/React.createElement(Box, {
      m: 1
    }), /*#__PURE__*/React.createElement(Button, {
      color: "primary",
      variant: "contained",
      onClick: () => {
        return refetchMapSegmentationProperties();
      }
    }, "Retry"));
  }
  if (mapSegmentationProperties === undefined && mapSegmentationPropertiesLoading) {
    return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(CircularProgress, null));
  }
  if (mapSegmentationProperties === undefined) {
    return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Typography, {
      align: "center"
    }, "No ", Capability.MapSegmentation, " properties"), ";");
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 1,
    direction: "row-reverse",
    flexWrap: "wrap-reverse"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ActionButton, _extends({
    disabled: !didSelectSegments || segmentActionExecuting || !canClean,
    color: "inherit",
    size: "medium",
    variant: "extended"
  }, setupClickHandlers()), "Clean ", segments.length, " segments", segmentActionExecuting && /*#__PURE__*/React.createElement(CircularProgress, {
    color: "inherit",
    size: 18,
    style: {
      marginLeft: 10
    }
  }))), mapSegmentationProperties.iterationCount.max > 1 && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ActionButton, {
    color: "inherit",
    size: "medium",
    variant: "extended",
    style: {
      textTransform: "initial"
    },
    onClick: handleIterationToggle,
    title: "Iteration Count"
  }, /*#__PURE__*/React.createElement(IterationsIcon, {
    iterationCount: iterationCount
  }))), didSelectSegments && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ActionButton, {
    color: "inherit",
    size: "medium",
    variant: "extended",
    onClick: onClear
  }, "Clear")), didSelectSegments && !canClean && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "caption",
    color: "textSecondary"
  }, "Cannot start segment cleaning while the robot is busy"))), /*#__PURE__*/React.createElement(IntegrationHelpDialog, {
    dialogOpen: integrationHelpDialogOpen,
    setDialogOpen: open => {
      setIntegrationHelpDialogOpen(open);
    },
    coordinatesWarning: false,
    helperText: "To start a cleanup of the currently selected segments with the currently configured parameters via MQTT or REST, simply use this payload.",
    payload: integrationHelpDialogPayload
  }));
};
export default SegmentActions;