import { useCapabilitiesSupported } from "../CapabilitiesProvider";
import { Capability, useAutoEmptyDockAutoEmptyControlMutation, useAutoEmptyDockAutoEmptyControlQuery, useCarpetModeStateMutation, useCarpetModeStateQuery, useKeyLockStateMutation, useKeyLockStateQuery, useLocateMutation } from "../api";
import React from "react";
import { ListMenu } from "../components/list_menu/ListMenu";
import { ToggleSwitchListMenuItem } from "../components/list_menu/ToggleSwitchListMenuItem";
import { NotListedLocation as LocateIcon, Lock as KeyLockIcon, Sensors as CarpetModeIcon, AutoDelete as AutoEmptyControlIcon, MiscellaneousServices as MiscIcon, Star as QuirksIcon } from "@mui/icons-material";
import { SpacerListMenuItem } from "../components/list_menu/SpacerListMenuItem";
import { LinkListMenuItem } from "../components/list_menu/LinkListMenuItem";
import PaperContainer from "../components/PaperContainer";
import { ButtonListMenuItem } from "../components/list_menu/ButtonListMenuItem";
const LocateButtonListMenuItem = () => {
  const {
    mutate: locate,
    isLoading: locateIsExecuting
  } = useLocateMutation();
  return /*#__PURE__*/React.createElement(ButtonListMenuItem, {
    primaryLabel: "Locate Robot",
    secondaryLabel: "The robot will play a sound to announce its location",
    icon: /*#__PURE__*/React.createElement(LocateIcon, null),
    buttonLabel: "Go",
    action: () => {
      locate();
    },
    actionLoading: locateIsExecuting
  });
};
const KeyLockCapabilitySwitchListMenuItem = () => {
  const {
    data: data,
    isFetching: isFetching,
    isError: isError
  } = useKeyLockStateQuery();
  const {
    mutate: mutate,
    isLoading: isChanging
  } = useKeyLockStateMutation();
  const loading = isFetching || isChanging;
  const disabled = loading || isChanging || isError;
  return /*#__PURE__*/React.createElement(ToggleSwitchListMenuItem, {
    value: data?.enabled ?? false,
    setValue: value => {
      mutate(value);
    },
    disabled: disabled,
    loadError: isError,
    primaryLabel: "Lock keys",
    secondaryLabel: "Prevents the robot from being operated using its physical buttons.",
    icon: /*#__PURE__*/React.createElement(KeyLockIcon, null)
  });
};
const CarpetModeControlCapabilitySwitchListMenuItem = () => {
  const {
    data: data,
    isFetching: isFetching,
    isError: isError
  } = useCarpetModeStateQuery();
  const {
    mutate: mutate,
    isLoading: isChanging
  } = useCarpetModeStateMutation();
  const loading = isFetching || isChanging;
  const disabled = loading || isChanging || isError;
  return /*#__PURE__*/React.createElement(ToggleSwitchListMenuItem, {
    value: data?.enabled ?? false,
    setValue: value => {
      mutate(value);
    },
    disabled: disabled,
    loadError: isError,
    primaryLabel: "Carpet mode",
    secondaryLabel: "When enabled, the vacuum will recognize carpets automatically and increase the suction.",
    icon: /*#__PURE__*/React.createElement(CarpetModeIcon, null)
  });
};
const AutoEmptyDockAutoEmptyControlCapabilitySwitchListMenuItem = () => {
  const {
    data: data,
    isFetching: isFetching,
    isError: isError
  } = useAutoEmptyDockAutoEmptyControlQuery();
  const {
    mutate: mutate,
    isLoading: isChanging
  } = useAutoEmptyDockAutoEmptyControlMutation();
  const loading = isFetching || isChanging;
  const disabled = loading || isChanging || isError;
  return /*#__PURE__*/React.createElement(ToggleSwitchListMenuItem, {
    value: data?.enabled ?? false,
    setValue: value => {
      mutate(value);
    },
    disabled: disabled,
    loadError: isError,
    primaryLabel: "Auto-Empty Dock",
    secondaryLabel: "Enables automatic emptying of the robot into the dock. The interval between empties is robot-specific.",
    icon: /*#__PURE__*/React.createElement(AutoEmptyControlIcon, null)
  });
};
const RobotOptions = () => {
  const [locateCapabilitySupported, keyLockControlCapabilitySupported, carpetModeControlCapabilitySupported, autoEmptyDockAutoEmptyControlCapabilitySupported, speakerVolumeControlCapabilitySupported, speakerTestCapabilitySupported, voicePackManagementCapabilitySupported, doNotDisturbCapabilitySupported, quirksCapabilitySupported] = useCapabilitiesSupported(Capability.Locate, Capability.KeyLock, Capability.CarpetModeControl, Capability.AutoEmptyDockAutoEmptyControl, Capability.SpeakerVolumeControl, Capability.SpeakerTest, Capability.VoicePackManagement, Capability.DoNotDisturb, Capability.Quirks);
  const listItems = React.useMemo(() => {
    const items = [];
    if (locateCapabilitySupported) {
      items.push( /*#__PURE__*/React.createElement(LocateButtonListMenuItem, {
        key: "locateAction"
      }));
      items.push( /*#__PURE__*/React.createElement(SpacerListMenuItem, {
        key: "spacer0"
      }));
    }
    if (keyLockControlCapabilitySupported) {
      items.push( /*#__PURE__*/React.createElement(KeyLockCapabilitySwitchListMenuItem, {
        key: "keyLockControl"
      }));
    }
    if (carpetModeControlCapabilitySupported) {
      items.push( /*#__PURE__*/React.createElement(CarpetModeControlCapabilitySwitchListMenuItem, {
        key: "carpetModeControl"
      }));
    }
    if (autoEmptyDockAutoEmptyControlCapabilitySupported) {
      items.push( /*#__PURE__*/React.createElement(AutoEmptyDockAutoEmptyControlCapabilitySwitchListMenuItem, {
        key: "autoEmptyControl"
      }));
    }
    if (speakerVolumeControlCapabilitySupported || speakerTestCapabilitySupported || voicePackManagementCapabilitySupported || doNotDisturbCapabilitySupported || quirksCapabilitySupported) {
      if (items.length > 0) {
        items.push( /*#__PURE__*/React.createElement(SpacerListMenuItem, {
          key: "spacer1"
        }));
      }
      if (speakerVolumeControlCapabilitySupported && speakerTestCapabilitySupported || voicePackManagementCapabilitySupported || doNotDisturbCapabilitySupported) {
        const label = [];
        if (voicePackManagementCapabilitySupported) {
          label.push("Voice packs");
        }
        if (doNotDisturbCapabilitySupported) {
          label.push("Do not disturb");
        }
        if (speakerVolumeControlCapabilitySupported && speakerTestCapabilitySupported) {
          label.push("Speaker settings");
        }
        items.push( /*#__PURE__*/React.createElement(LinkListMenuItem, {
          key: "miscRobotSettings",
          url: "/options/robot/misc",
          primaryLabel: "Misc Options",
          secondaryLabel: label.join(", "),
          icon: /*#__PURE__*/React.createElement(MiscIcon, null)
        }));
      }
      if (quirksCapabilitySupported) {
        items.push( /*#__PURE__*/React.createElement(LinkListMenuItem, {
          key: "quirks",
          url: "/options/robot/quirks",
          primaryLabel: "Quirks",
          secondaryLabel: "Configure firmware-specific quirks",
          icon: /*#__PURE__*/React.createElement(QuirksIcon, null)
        }));
      }
    }
    return items;
  }, [locateCapabilitySupported, keyLockControlCapabilitySupported, carpetModeControlCapabilitySupported, autoEmptyDockAutoEmptyControlCapabilitySupported, speakerVolumeControlCapabilitySupported, speakerTestCapabilitySupported, voicePackManagementCapabilitySupported, doNotDisturbCapabilitySupported, quirksCapabilitySupported]);
  return /*#__PURE__*/React.createElement(PaperContainer, null, /*#__PURE__*/React.createElement(ListMenu, {
    primaryHeader: "Robot Options",
    secondaryHeader: "Tunables and actions provided by the robot's firmware",
    listItems: listItems
  }));
};
export default RobotOptions;