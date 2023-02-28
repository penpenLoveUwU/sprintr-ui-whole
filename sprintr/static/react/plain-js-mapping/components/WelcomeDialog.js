import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, Paper, Typography } from "@mui/material";
import React from "react";
import { useCapabilitiesSupported } from "../CapabilitiesProvider";
import { Capability, useBasicControlMutation, useDismissWelcomeDialogMutation } from "../api";
import { MappingPassButtonItem, PersistentMapSwitchListItem } from "../options/MapManagement";
import { ButtonListMenuItem } from "./list_menu/ButtonListMenuItem";
import { Layers as MappingPassIcon } from "@mui/icons-material";
const FullCleanupButtonItem = () => {
  const {
    mutate: executeBasicControlCommand,
    isLoading: basicControlIsExecuting
  } = useBasicControlMutation();
  return /*#__PURE__*/React.createElement(ButtonListMenuItem, {
    primaryLabel: "Full Cleanup",
    secondaryLabel: "Create a new map",
    icon: /*#__PURE__*/React.createElement(MappingPassIcon, null),
    buttonLabel: "Go",
    confirmationDialog: {
      title: "Start full cleanup?",
      body: "The robot needs to return to the dock on its own to save the newly created map. Do not interfere with the cleanup or else it won't be saved."
    },
    action: () => {
      executeBasicControlCommand("start");
    },
    actionLoading: basicControlIsExecuting
  });
};
const WelcomeDialog = ({
  open,
  hide
}) => {
  const [basicControlSupported, persistentMapControlSupported, mappingPassSupported] = useCapabilitiesSupported(Capability.BasicControl, Capability.PersistentMapControl, Capability.MappingPass);
  const {
    mutate: dismissWelcomeDialog
  } = useDismissWelcomeDialogMutation();
  return /*#__PURE__*/React.createElement(Dialog, {
    open: open
  }, /*#__PURE__*/React.createElement(DialogTitle, null, "Welcome to Valetudo"), /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement(DialogContentText, {
    style: {
      whiteSpace: "pre-wrap"
    },
    component: "span"
  }, /*#__PURE__*/React.createElement(Typography, null, "It looks like it might the first time that you're using Valetudo on this robot."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Typography, null, "The first step is usually to let the robot create a new map of your home. Depending on your firmware, the map will allow you to clean specific rooms, add virtual walls and more.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "There are some variations in the map creation process based on the model of robot. For example, some robots might require you to enable map persistence first, whereas others might offer a dedicated Mapping Pass."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Typography, {
    component: "span"
  }, "For the initial mapping, please ensure that:", /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "the robot is docked"), /*#__PURE__*/React.createElement("li", null, "all relevant doors are open"), /*#__PURE__*/React.createElement("li", null, "there are no loose cables lying around"), /*#__PURE__*/React.createElement("li", null, "all areas you don't want it to go are blocked off")), "With that done, here's what you'll need to let your robot create a new map:"), persistentMapControlSupported && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Paper, {
    elevation: 2,
    sx: {
      marginTop: "1rem"
    }
  }, /*#__PURE__*/React.createElement(PersistentMapSwitchListItem, null))), mappingPassSupported && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Paper, {
    elevation: 2,
    sx: {
      marginTop: "1rem"
    }
  }, /*#__PURE__*/React.createElement(MappingPassButtonItem, null))), basicControlSupported && !mappingPassSupported && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Paper, {
    elevation: 2,
    sx: {
      marginTop: "1rem"
    }
  }, /*#__PURE__*/React.createElement(FullCleanupButtonItem, null))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Typography, null, "While watching your robot zip around, you might want to ", /*#__PURE__*/React.createElement(Link, {
    href: "https://github.com/sponsors/Hypfer",
    target: "_blank",
    rel: "noopener"
  }, "consider donating"), ". If you'd rather decide later, the donation link can also be found hiding unobtrusively at the bottom of the sidebar menu.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "Now, please enjoy your cloud-free robot :)"))), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      hide();
    }
  }, "Hide"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      dismissWelcomeDialog();
    }
  }, "Do not show again")));
};
export default WelcomeDialog;