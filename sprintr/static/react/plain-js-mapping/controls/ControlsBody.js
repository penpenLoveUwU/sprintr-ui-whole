import { Grid } from "@mui/material";
import { Opacity as WaterUsageIcon, AppRegistration as OperationModeIcon } from "@mui/icons-material";
import { Capability, useRobotInformationQuery } from "../api";
import { useCapabilitiesSupported } from "../CapabilitiesProvider";
import BasicControls from "./BasicControls";
import PresetSelectionControl from "./PresetSelection";
import RobotStatus from "./RobotStatus";
import Dock from "./Dock";
import CurrentStatistics from "./CurrentStatistics";
import Attachments from "./Attachments";
import { FanSpeedIcon } from "../components/CustomIcons";
import React from "react";
const ControlsBody = () => {
  const [basicControls, fanSpeed, waterControl, operationMode, triggerEmptySupported, mopDockCleanTriggerSupported, mopDockDryTriggerSupported, currentStatistics] = useCapabilitiesSupported(Capability.BasicControl, Capability.FanSpeedControl, Capability.WaterUsageControl, Capability.OperationModeControl, Capability.AutoEmptyDockManualTrigger, Capability.MopDockCleanManualTrigger, Capability.MopDockDryManualTrigger, Capability.CurrentStatistics);
  const {
    data: robotInformation
  } = useRobotInformationQuery();
  return /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 2,
    direction: "column",
    sx: {
      userSelect: "none"
    }
  }, basicControls && /*#__PURE__*/React.createElement(BasicControls, null), /*#__PURE__*/React.createElement(RobotStatus, null), operationMode && /*#__PURE__*/React.createElement(PresetSelectionControl, {
    capability: Capability.OperationModeControl,
    label: "Mode",
    icon: /*#__PURE__*/React.createElement(OperationModeIcon, {
      fontSize: "small"
    })
  }), fanSpeed && /*#__PURE__*/React.createElement(PresetSelectionControl, {
    capability: Capability.FanSpeedControl,
    label: "Fan speed",
    icon: /*#__PURE__*/React.createElement(FanSpeedIcon, {
      fontSize: "small"
    })
  }), waterControl && /*#__PURE__*/React.createElement(PresetSelectionControl, {
    capability: Capability.WaterUsageControl,
    label: "Water usage",
    icon: /*#__PURE__*/React.createElement(WaterUsageIcon, {
      fontSize: "small"
    })
  }), (triggerEmptySupported || mopDockCleanTriggerSupported || mopDockDryTriggerSupported) && /*#__PURE__*/React.createElement(Dock, null), robotInformation && robotInformation.modelDetails.supportedAttachments.length > 0 && /*#__PURE__*/React.createElement(Attachments, null), currentStatistics && /*#__PURE__*/React.createElement(CurrentStatistics, null));
};
export default ControlsBody;