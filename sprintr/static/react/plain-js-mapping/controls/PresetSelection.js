import { Box, CircularProgress, Grid, Icon, Paper, Slider, sliderClasses, styled, Typography } from "@mui/material";
import React from "react";
import { Capability, capabilityToPresetType, RobotAttributeClass, usePresetSelectionMutation, usePresetSelectionsQuery, useRobotAttributeQuery } from "../api";
import { ExpandLess as CloseIcon, ExpandMore as OpenIcon } from "@mui/icons-material";
import LoadingFade from "../components/LoadingFade";
import { useCommittingSlider } from "../hooks/useCommittingSlider";
const StyledIcon = styled(Icon)(({
  theme
}) => {
  return {};
});
const DiscreteSlider = styled(Slider)(({
  theme
}) => {
  return {
    [`& .${sliderClasses.track}`]: {
      height: 2
    },
    [`& .${sliderClasses.rail}`]: {
      opacity: 0.5,
      color: theme.palette.grey[400]
    },
    [`& .${sliderClasses.mark}`]: {
      color: theme.palette.grey[600],
      height: 8,
      width: 1,
      margintop: -3
    },
    [`& .${sliderClasses.markActive}`]: {
      opacity: 1,
      backgroundColor: "currentcolor"
    }
  };
});
const order = ["off", "min", "low", "medium", "high", "max", "turbo", "vacuum", "vacuum_and_mop", "mop"];
const sortPresets = presets => {
  return [...presets].sort((a, b) => {
    return order.indexOf(a) - order.indexOf(b);
  });
};
const friendlyNames = {
  "off": "Off",
  "min": "Min",
  "low": "Low",
  "medium": "Medium",
  "high": "High",
  "max": "Max",
  "turbo": "Turbo",
  "custom": "Custom",
  "vacuum_and_mop": "Vacuum & Mop",
  "vacuum": "Vacuum",
  "mop": "Mop"
};
const PresetSelectionControl = props => {
  const [presetSelectionSliderOpen, setPresetSelectionSliderOpen] = React.useState(false);
  const {
    capability,
    label,
    icon
  } = props;
  const {
    data: preset
  } = useRobotAttributeQuery(RobotAttributeClass.PresetSelectionState, attributes => {
    return attributes.filter(attribute => {
      return attribute.type === capabilityToPresetType[capability];
    })[0];
  });
  const {
    isLoading: presetsLoading,
    isError: presetLoadError,
    data: presets
  } = usePresetSelectionsQuery(capability);
  const {
    mutate: selectPreset,
    isLoading: selectPresetIsLoading
  } = usePresetSelectionMutation(capability);
  const filteredPresets = React.useMemo(() => {
    return sortPresets(presets?.filter(x => {
      return x !== "custom";
    }) ?? []);
  }, [presets]);
  const presetSliderValue = filteredPresets.indexOf(preset?.value || filteredPresets[0]);
  const [sliderValue, onChange, onCommit] = useCommittingSlider(presetSliderValue !== -1 ? presetSliderValue : 0, value => {
    const level = filteredPresets[value];
    if (level !== preset?.value) {
      selectPreset(level);
    }
  });
  const marks = React.useMemo(() => {
    return filteredPresets.map((preset, index) => {
      return {
        value: index,
        label: friendlyNames[preset]
      };
    });
  }, [filteredPresets]);
  const body = React.useMemo(() => {
    if (presetsLoading) {
      return /*#__PURE__*/React.createElement(Grid, {
        item: true
      }, /*#__PURE__*/React.createElement(CircularProgress, {
        size: 20
      }));
    }
    if (presetLoadError || preset === undefined) {
      return /*#__PURE__*/React.createElement(Grid, {
        item: true
      }, /*#__PURE__*/React.createElement(Typography, {
        color: "error"
      }, "Error loading ", capability));
    }
    return /*#__PURE__*/React.createElement(Box, {
      px: 2.5
    }, /*#__PURE__*/React.createElement(DiscreteSlider, {
      "aria-labelledby": `${capability}-slider-label`,
      step: null,
      value: sliderValue,
      valueLabelDisplay: "off",
      onChange: onChange,
      onChangeCommitted: onCommit,
      min: 0,
      max: marks.length - 1,
      marks: marks,
      track: capability !== Capability.OperationModeControl ? "normal" : false
    }));
  }, [capability, onChange, onCommit, preset, presetLoadError, presetsLoading, marks, sliderValue]);
  return /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Paper, {
    sx: {
      minHeight: "2.5em"
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "column"
  }, /*#__PURE__*/React.createElement(Box, {
    px: 2,
    pt: 1
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    container: true,
    alignItems: "center",
    spacing: 1,
    onClick: () => {
      setPresetSelectionSliderOpen(!presetSelectionSliderOpen);
    },
    style: {
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, icon), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    sx: {
      marginTop: "-8px" /* ugh */
    }
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "subtitle1",
    id: `${capability}-slider-label`
  }, label)), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(LoadingFade, {
    in: selectPresetIsLoading,
    transitionDelay: selectPresetIsLoading ? "500ms" : "0ms",
    size: 20
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    sx: {
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true
  }, !selectPresetIsLoading && /*#__PURE__*/React.createElement(Grid, {
    item: true,
    sx: {
      marginTop: "-2px" /* ugh */
    }
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "subtitle1",
    sx: {
      paddingRight: "8px"
    }
  }, preset?.value ? friendlyNames[preset.value] : "")), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    sx: {
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(StyledIcon, {
    as: presetSelectionSliderOpen ? CloseIcon : OpenIcon
  }))))), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    sx: {
      display: presetSelectionSliderOpen ? "inherit" : "none"
    }
  }, body)))));
};
export default PresetSelectionControl;