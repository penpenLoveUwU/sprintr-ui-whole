import { Route, Switch } from "react-router";
import { useRouteMatch } from "react-router-dom";
import MapManagement from "./MapManagement";
import EditMapPage from "../map/EditMapPage";
import { useCapabilitiesSupported } from "../CapabilitiesProvider";
import { Capability } from "../api";
import MQTTConnectivity from "./connectivity/MQTTConnectivity";
import ConnectivityOptions from "./connectivity/ConnectivityOptions";
import NTPConnectivity from "./connectivity/NTPConnectivity";
import AuthSettings from "./connectivity/AuthSettings";
import WifiConnectivity from "./connectivity/WifiConnectivity";
import NetworkAdvertisementSettings from "./connectivity/NetworkAdvertisementSettings";
import RobotCoverageMapPage from "../map/RobotCoverageMapPage";
import ValetudoOptions from "./ValetudoOptions";
import React from "react";
import RobotOptions from "../robot/RobotOptions";
import MiscRobotOptions from "../robot/capabilities/MiscRobotOptions";
import Quirks from "../robot/capabilities/Quirks";
const OptionsRouter = () => {
  const {
    path
  } = useRouteMatch();
  const [wifiConfigurationCapabilitySupported, combinedVirtualRestrictionsCapabilitySupported, mapSegmentEditCapabilitySupported, mapSegmentRenameCapabilitySupported] = useCapabilitiesSupported(Capability.WifiConfiguration, Capability.CombinedVirtualRestrictions, Capability.MapSegmentEdit, Capability.MapSegmentRename);
  return /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: path + "/map_management"
  }, /*#__PURE__*/React.createElement(MapManagement, null)), (mapSegmentEditCapabilitySupported || mapSegmentRenameCapabilitySupported) && /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: path + "/map_management/segments"
  }, /*#__PURE__*/React.createElement(EditMapPage, {
    mode: "segments"
  })), combinedVirtualRestrictionsCapabilitySupported && /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: path + "/map_management/virtual_restrictions"
  }, /*#__PURE__*/React.createElement(EditMapPage, {
    mode: "virtual_restrictions"
  })), /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: path + "/map_management/robot_coverage"
  }, /*#__PURE__*/React.createElement(RobotCoverageMapPage, null)), /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: path + "/connectivity"
  }, /*#__PURE__*/React.createElement(ConnectivityOptions, null)), /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: path + "/connectivity/auth"
  }, /*#__PURE__*/React.createElement(AuthSettings, null)), /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: path + "/connectivity/mqtt"
  }, /*#__PURE__*/React.createElement(MQTTConnectivity, null)), /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: path + "/connectivity/networkadvertisement"
  }, /*#__PURE__*/React.createElement(NetworkAdvertisementSettings, null)), /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: path + "/connectivity/ntp"
  }, /*#__PURE__*/React.createElement(NTPConnectivity, null)), wifiConfigurationCapabilitySupported && /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: path + "/connectivity/wifi"
  }, /*#__PURE__*/React.createElement(WifiConnectivity, null)), /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: path + "/robot"
  }, /*#__PURE__*/React.createElement(RobotOptions, null)), /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: path + "/robot/misc"
  }, /*#__PURE__*/React.createElement(MiscRobotOptions, null)), /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: path + "/robot/quirks"
  }, /*#__PURE__*/React.createElement(Quirks, null)), /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: path + "/valetudo"
  }, /*#__PURE__*/React.createElement(ValetudoOptions, null)), /*#__PURE__*/React.createElement(Route, {
    path: "*"
  }, /*#__PURE__*/React.createElement("h3", null, "Unknown route")));
};
export default OptionsRouter;