import React from "react";
import { Slider, Stack, Typography } from "@mui/material";
import { Capability, useSpeakerTestTriggerTriggerMutation, useSpeakerVolumeMutation, useSpeakerVolumeStateQuery } from "../../api";
import { useCapabilitiesSupported } from "../../CapabilitiesProvider";
import { VolumeDown as VolumeDownIcon, VolumeUp as VolumeUpIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useCommittingSlider } from "../../hooks/useCommittingSlider";
import { CapabilityItem } from "./CapabilityLayout";
const SpeakerControl = () => {
  const {
    data: speakerVolume,
    isFetching: speakerVolumeLoading,
    isError: speakerVolumeError
  } = useSpeakerVolumeStateQuery();
  const {
    mutate: changeSpeakerVolume,
    isLoading: speakerVolumeChanging
  } = useSpeakerVolumeMutation();
  const {
    mutate: testSpeaker,
    isLoading: speakerTesting
  } = useSpeakerTestTriggerTriggerMutation();
  const [sliderValue, onChange, onCommit] = useCommittingSlider(speakerVolume?.volume || 0, changeSpeakerVolume);
  const speakerVolumeContent = React.useMemo(() => {
    if (speakerVolumeError) {
      return /*#__PURE__*/React.createElement(Typography, {
        color: "error"
      }, "Error loading speaker state.");
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Stack, {
      spacing: 2,
      direction: "row",
      sx: {
        mb: 1
      },
      alignItems: "center"
    }, /*#__PURE__*/React.createElement(VolumeDownIcon, null), /*#__PURE__*/React.createElement(Slider, {
      min: 0,
      max: 100,
      value: sliderValue,
      disabled: speakerVolumeLoading,
      onChange: onChange,
      onChangeCommitted: onCommit,
      valueLabelDisplay: "auto"
    }), /*#__PURE__*/React.createElement(VolumeUpIcon, null)), /*#__PURE__*/React.createElement(LoadingButton, {
      loading: speakerTesting,
      variant: "outlined",
      color: "success",
      onClick: () => {
        return testSpeaker();
      }
    }, "Test sound volume"));
  }, [onChange, onCommit, sliderValue, speakerTesting, speakerVolumeError, speakerVolumeLoading, testSpeaker]);
  const loading = speakerVolumeChanging || speakerVolumeLoading || !speakerVolume;
  return /*#__PURE__*/React.createElement(CapabilityItem, {
    title: "Speaker",
    loading: loading
  }, speakerVolumeContent);
};
const Speaker = () => {
  const [speakerVolumeControl, speakerTest] = useCapabilitiesSupported(Capability.SpeakerVolumeControl, Capability.SpeakerTest);
  if (!speakerVolumeControl || !speakerTest) {
    // These only make sense together.
    return null;
  }
  return /*#__PURE__*/React.createElement(SpeakerControl, null);
};
export default Speaker;