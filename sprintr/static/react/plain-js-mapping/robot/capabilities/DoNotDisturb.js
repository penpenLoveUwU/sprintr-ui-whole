import React from "react";
import { Checkbox, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import { Capability, useDoNotDisturbConfigurationQuery, useDoNotDisturbConfigurationMutation } from "../../api";
import { useCapabilitiesSupported } from "../../CapabilitiesProvider";
import { LoadingButton, TimePicker } from "@mui/lab";
import { deepCopy } from "../../utils";
import { CapabilityItem } from "./CapabilityLayout";
import { DoNotDisturbHelp } from "./res/DoNotDisturbHelp";
const formatTime = value => {
  if (!value) {
    return "??:??";
  }
  return `${value.hour.toString().padStart(2, "0")}:${value.minute.toString().padStart(2, "0")}`;
};
const DoNotDisturbControl = () => {
  const {
    data: dndConfiguration,
    isFetching: dndConfigurationFetching,
    isError: dndConfigurationError
  } = useDoNotDisturbConfigurationQuery();
  const [editConfig, setEditConfig] = React.useState(null);
  React.useEffect(() => {
    if (dndConfiguration) {
      setEditConfig(deepCopy(dndConfiguration));
    }
  }, [dndConfiguration]);
  const {
    mutate: updateDndConfiguration,
    isLoading: dndConfigurationUpdating
  } = useDoNotDisturbConfigurationMutation();
  const startTimeValue = React.useMemo(() => {
    const date = new Date();
    date.setUTCHours(editConfig?.start.hour ?? 0, editConfig?.start.minute ?? 0, 0, 0);
    return date;
  }, [editConfig]);
  const endTimeValue = React.useMemo(() => {
    const date = new Date();
    date.setUTCHours(editConfig?.end.hour ?? 0, editConfig?.end.minute ?? 0, 0, 0);
    return date;
  }, [editConfig]);
  const dndConfigurationContent = React.useMemo(() => {
    if (dndConfigurationError) {
      return /*#__PURE__*/React.createElement(Typography, {
        color: "error"
      }, "Error loading DND configuration.");
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormControlLabel, {
      control: /*#__PURE__*/React.createElement(Checkbox, {
        checked: editConfig?.enabled || false,
        onChange: e => {
          if (editConfig) {
            const newConfig = deepCopy(editConfig);
            newConfig.enabled = e.target.checked;
            setEditConfig(newConfig);
          }
        }
      }),
      label: "Enabled"
    }), /*#__PURE__*/React.createElement(Stack, {
      direction: "row",
      spacing: 1,
      sx: {
        mt: 1,
        mb: 1
      }
    }, /*#__PURE__*/React.createElement(TimePicker, {
      label: "Start time",
      value: startTimeValue,
      ampm: false,
      disabled: !editConfig?.enabled || false,
      onChange: newValue => {
        if (editConfig && newValue) {
          const date = new Date(newValue);
          const newConfig = deepCopy(editConfig);
          newConfig.start.hour = date.getUTCHours();
          newConfig.start.minute = date.getUTCMinutes();
          setEditConfig(newConfig);
        }
      },
      renderInput: params => {
        return /*#__PURE__*/React.createElement(TextField, params);
      }
    }), /*#__PURE__*/React.createElement(TimePicker, {
      label: "End time",
      value: endTimeValue,
      ampm: false,
      disabled: !editConfig?.enabled || false,
      onChange: newValue => {
        if (editConfig && newValue) {
          const date = new Date(newValue);
          const newConfig = deepCopy(editConfig);
          newConfig.end.hour = date.getUTCHours();
          newConfig.end.minute = date.getUTCMinutes();
          setEditConfig(newConfig);
        }
      },
      renderInput: params => {
        return /*#__PURE__*/React.createElement(TextField, params);
      }
    })), /*#__PURE__*/React.createElement(Typography, {
      variant: "subtitle2",
      color: "textSecondary",
      sx: {
        mb: 2
      }
    }, "UTC: ", formatTime(editConfig?.start), " \u2014 ", formatTime(editConfig?.end)), /*#__PURE__*/React.createElement(LoadingButton, {
      loading: dndConfigurationUpdating,
      variant: "outlined",
      color: "success",
      onClick: () => {
        if (editConfig) {
          updateDndConfiguration(editConfig);
        }
      }
    }, "Apply"));
  }, [editConfig, startTimeValue, endTimeValue, dndConfigurationError, dndConfigurationUpdating, updateDndConfiguration]);
  const loading = dndConfigurationUpdating || dndConfigurationFetching || !dndConfiguration;
  return /*#__PURE__*/React.createElement(CapabilityItem, {
    title: "Do not disturb",
    loading: loading,
    helpText: DoNotDisturbHelp
  }, dndConfigurationContent);
};
const DoNotDisturb = () => {
  const [doNotDisturb] = useCapabilitiesSupported(Capability.DoNotDisturb);
  if (!doNotDisturb) {
    return null;
  }
  return /*#__PURE__*/React.createElement(DoNotDisturbControl, null);
};
export default DoNotDisturb;