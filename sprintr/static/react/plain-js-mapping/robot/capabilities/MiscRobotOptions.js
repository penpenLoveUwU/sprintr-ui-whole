import React from "react";
import Speaker from "./Speaker";
import VoicePackManagement from "./VoicePackManagement";
import DoNotDisturb from "./DoNotDisturb";
import { CapabilityContainer } from "./CapabilityLayout";
import PaperContainer from "../../components/PaperContainer";
const MiscRobotOptions = () => {
  const components = [Speaker, VoicePackManagement, DoNotDisturb];
  return /*#__PURE__*/React.createElement(PaperContainer, null, /*#__PURE__*/React.createElement(CapabilityContainer, null, components.map((Component, idx) => {
    return /*#__PURE__*/React.createElement(Component, {
      key: idx
    });
  })));
};
export default MiscRobotOptions;