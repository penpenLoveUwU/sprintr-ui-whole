import { Capability, RobotAttributeClass, useAutoEmptyDockManualTriggerMutation, useMopDockCleanManualTriggerMutation, useMopDockDryManualTriggerMutation, useRobotAttributeQuery, useRobotStatusQuery } from "../api";
import { useCapabilitiesSupported } from "../CapabilitiesProvider";
import { Box, Button, Grid, Icon, Paper, styled, Typography } from "@mui/material";
import { RestoreFromTrash as EmptyIcon, Water as CleanMopIcon, WindPower as DryMopIcon } from "@mui/icons-material";
import React from "react";
import LoadingFade from "../components/LoadingFade";
const Dock = () => {
  const {
    data: robotStatus,
    isLoading: isRobotStatusLoading
  } = useRobotStatusQuery();
  const {
    data: dockStatus,
    isLoading: isDockStatusLoading
  } = useRobotAttributeQuery(RobotAttributeClass.DockStatusState);
  const {
    data: attachments,
    isLoading: isAttachmentLoading
  } = useRobotAttributeQuery(RobotAttributeClass.AttachmentState);
  const isLoading = isRobotStatusLoading || isDockStatusLoading || isAttachmentLoading;
  const StyledIcon = styled(Icon)(({
    theme
  }) => {
    return {
      marginRight: theme.spacing(1),
      marginLeft: -theme.spacing(1)
    };
  });
  const [triggerEmptySupported, mopDockCleanTriggerSupported, mopDockDryTriggerSupported] = useCapabilitiesSupported(Capability.AutoEmptyDockManualTrigger, Capability.MopDockCleanManualTrigger, Capability.MopDockDryManualTrigger);
  const {
    mutate: triggerDockEmpty,
    isLoading: emptyIsExecuting
  } = useAutoEmptyDockManualTriggerMutation();
  const {
    mutate: triggerMopDockCleanCommand,
    isLoading: mopDockCleanCommandExecuting
  } = useMopDockCleanManualTriggerMutation();
  const {
    mutate: triggerMopDockDryCommand,
    isLoading: mopDockDryCommandExecuting
  } = useMopDockDryManualTriggerMutation();
  const dockStatusIsRelevant = mopDockCleanTriggerSupported || mopDockDryTriggerSupported;
  const commandIsExecuting = emptyIsExecuting || mopDockCleanCommandExecuting || mopDockDryCommandExecuting;
  const mopAttachmentAttached = attachments?.find(a => {
    return a.type === "mop";
  })?.attached === true;
  if (isLoading) {
    return /*#__PURE__*/React.createElement(Grid, {
      item: true
    }, /*#__PURE__*/React.createElement(Paper, null, /*#__PURE__*/React.createElement(Box, {
      p: 1
    }, /*#__PURE__*/React.createElement(LoadingFade, null))));
  }
  if (robotStatus === undefined || dockStatusIsRelevant && dockStatus?.length !== 1) {
    return /*#__PURE__*/React.createElement(Grid, {
      item: true
    }, /*#__PURE__*/React.createElement(Paper, null, /*#__PURE__*/React.createElement(Box, {
      p: 1
    }, /*#__PURE__*/React.createElement(Typography, {
      color: "error"
    }, "Error loading dock controls"))));
  }
  const {
    value: robotState
  } = robotStatus;
  const {
    value: dockState
  } = dockStatus?.[0] ?? {
    value: "idle"
  };
  return /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Paper, null, /*#__PURE__*/React.createElement(Box, {
    px: 2,
    py: 1
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "column"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "subtitle1"
  }, "Dock")), /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "row",
    alignItems: "center",
    spacing: 1,
    sx: {
      paddingTop: "8px"
    }
  }, mopDockCleanTriggerSupported && /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true
  }, /*#__PURE__*/React.createElement(Button, {
    disabled: commandIsExecuting || !["idle", "cleaning", "pause"].includes(dockState) || robotState !== "docked" || !mopAttachmentAttached,
    variant: "outlined",
    size: "medium",
    color: "inherit",
    onClick: () => {
      const command = dockState === "cleaning" ? "stop" : "start";
      triggerMopDockCleanCommand(command);
    },
    sx: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(StyledIcon, {
    as: CleanMopIcon
  }), " ", dockState === "cleaning" ? "Stop" : "Clean")), mopDockDryTriggerSupported && /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true
  }, /*#__PURE__*/React.createElement(Button, {
    disabled: commandIsExecuting || !["idle", "drying", "pause"].includes(dockState) || robotState !== "docked" || !mopAttachmentAttached,
    variant: "outlined",
    size: "medium",
    color: "inherit",
    onClick: () => {
      const command = dockState === "drying" ? "stop" : "start";
      triggerMopDockDryCommand(command);
    },
    sx: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(StyledIcon, {
    as: DryMopIcon
  }), " ", dockState === "drying" ? "Stop" : "Dry")), triggerEmptySupported && /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true
  }, /*#__PURE__*/React.createElement(Button, {
    disabled: commandIsExecuting || robotState !== "docked",
    variant: "outlined",
    size: "medium",
    color: "inherit",
    onClick: () => {
      triggerDockEmpty();
    },
    sx: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(StyledIcon, {
    as: EmptyIcon
  }), " Empty")))))));
};
export default Dock;