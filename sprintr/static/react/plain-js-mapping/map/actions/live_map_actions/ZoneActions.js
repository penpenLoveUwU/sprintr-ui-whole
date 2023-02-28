function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { Capability, useCleanTemporaryZonesMutation, useRobotStatusQuery, useZonePropertiesQuery } from "../../../api";
import React from "react";
import { Box, Button, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useLongPress } from "use-long-press";
import { ActionButton } from "../../Styled";
import IntegrationHelpDialog from "../../../components/IntegrationHelpDialog";
import { IterationsIcon } from "../../../assets/icon_components/IterationsIcon";
const ZoneActions = props => {
  const {
    zones,
    convertPixelCoordinatesToCMSpace,
    onClear,
    onAdd
  } = props;
  const [iterationCount, setIterationCount] = React.useState(1);
  const [integrationHelpDialogOpen, setIntegrationHelpDialogOpen] = React.useState(false);
  const [integrationHelpDialogPayload, setIntegrationHelpDialogPayload] = React.useState("");
  const {
    data: status
  } = useRobotStatusQuery(state => {
    return state.value;
  });
  const {
    mutate: cleanTemporaryZones,
    isLoading: cleanTemporaryZonesIsExecuting
  } = useCleanTemporaryZonesMutation({
    onSuccess: onClear
  });
  const {
    data: zoneProperties,
    isLoading: zonePropertiesLoading,
    isError: zonePropertiesLoadError,
    refetch: refetchZoneProperties
  } = useZonePropertiesQuery();
  const canClean = status === "idle" || status === "docked" || status === "paused" || status === "returning" || status === "error";
  const didSelectZones = zones.length > 0;
  const zonesForAPI = React.useMemo(() => {
    return zones.map(zone => {
      return {
        iterations: iterationCount,
        points: {
          pA: convertPixelCoordinatesToCMSpace({
            x: zone.x0,
            y: zone.y0
          }),
          pB: convertPixelCoordinatesToCMSpace({
            x: zone.x1,
            y: zone.y0
          }),
          pC: convertPixelCoordinatesToCMSpace({
            x: zone.x1,
            y: zone.y1
          }),
          pD: convertPixelCoordinatesToCMSpace({
            x: zone.x0,
            y: zone.y1
          })
        }
      };
    });
  }, [zones, iterationCount, convertPixelCoordinatesToCMSpace]);
  const handleClick = React.useCallback(() => {
    if (!didSelectZones || !canClean) {
      return;
    }
    cleanTemporaryZones(zonesForAPI);
  }, [canClean, didSelectZones, zonesForAPI, cleanTemporaryZones]);
  const handleLongClick = React.useCallback(() => {
    setIntegrationHelpDialogPayload(JSON.stringify({
      action: "clean",
      zones: zonesForAPI
    }, null, 2));
    setIntegrationHelpDialogOpen(true);
  }, [zonesForAPI]);
  const setupClickHandlers = useLongPress(handleLongClick, {
    onCancel: event => {
      handleClick();
    },
    threshold: 500,
    captureEvent: true,
    cancelOnMovement: true
  });
  const handleIterationToggle = React.useCallback(() => {
    if (zoneProperties) {
      setIterationCount(iterationCount % zoneProperties.iterationCount.max + 1);
    }
  }, [iterationCount, setIterationCount, zoneProperties]);
  if (zonePropertiesLoadError) {
    return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Typography, {
      color: "error"
    }, "Error loading ", Capability.ZoneCleaning, " properties"), /*#__PURE__*/React.createElement(Box, {
      m: 1
    }), /*#__PURE__*/React.createElement(Button, {
      color: "primary",
      variant: "contained",
      onClick: () => {
        return refetchZoneProperties();
      }
    }, "Retry"));
  }
  if (zoneProperties === undefined && zonePropertiesLoading) {
    return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(CircularProgress, null));
  }
  if (zoneProperties === undefined) {
    return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Typography, {
      align: "center"
    }, "No ", Capability.ZoneCleaning, " properties"), ";");
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 1,
    direction: "row-reverse",
    flexWrap: "wrap-reverse"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ActionButton, _extends({
    disabled: !didSelectZones || cleanTemporaryZonesIsExecuting || !canClean,
    color: "inherit",
    size: "medium",
    variant: "extended"
  }, setupClickHandlers()), "Clean ", zones.length, " zones", cleanTemporaryZonesIsExecuting && /*#__PURE__*/React.createElement(CircularProgress, {
    color: "inherit",
    size: 18,
    style: {
      marginLeft: 10
    }
  }))), zoneProperties.iterationCount.max > 1 && /*#__PURE__*/React.createElement(Grid, {
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
  }))), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ActionButton, {
    disabled: zones.length === zoneProperties.zoneCount.max || cleanTemporaryZonesIsExecuting,
    color: "inherit",
    size: "medium",
    variant: "extended",
    onClick: onAdd
  }, "Add (", zones.length, "/", zoneProperties.zoneCount.max, ")")), didSelectZones && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ActionButton, {
    disabled: cleanTemporaryZonesIsExecuting,
    color: "inherit",
    size: "medium",
    variant: "extended",
    onClick: onClear
  }, "Clear")), didSelectZones && !canClean && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "caption",
    color: "textSecondary"
  }, "Cannot start zone cleaning while the robot is busy"))), /*#__PURE__*/React.createElement(IntegrationHelpDialog, {
    dialogOpen: integrationHelpDialogOpen,
    setDialogOpen: open => {
      setIntegrationHelpDialogOpen(open);
    },
    coordinatesWarning: true,
    helperText: "To start a cleanup of the currently drawn zones with the currently configured parameters via MQTT or REST, simply use this payload.",
    payload: integrationHelpDialogPayload
  }));
};
export default ZoneActions;