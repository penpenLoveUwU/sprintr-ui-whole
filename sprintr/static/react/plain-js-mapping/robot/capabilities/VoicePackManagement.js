import React from "react";
import { Collapse, LinearProgress, TextField, Typography } from "@mui/material";
import { Capability, useVoicePackManagementMutation, useVoicePackManagementStateQuery } from "../../api";
import { useCapabilitiesSupported } from "../../CapabilitiesProvider";
import { LoadingButton } from "@mui/lab";
import { CapabilityItem } from "./CapabilityLayout";
import { VoicepackHelp } from "./res/VoicepackHelp";
const VoicePackControl = () => {
  const {
    data: voicePack,
    isFetching: voicePackFetching,
    isError: voicePackError,
    refetch: voicePackRefetch
  } = useVoicePackManagementStateQuery();
  const [url, setUrl] = React.useState("");
  const [languageCode, setLanguageCode] = React.useState("");
  const [hash, setHash] = React.useState("");
  const {
    mutate: sendVoicePackCommand,
    isLoading: voicePackMutating
  } = useVoicePackManagementMutation();
  const intervalRef = React.useRef();
  React.useEffect(() => {
    const operationType = voicePack?.operationStatus.type;
    if (operationType === "downloading" || operationType === "installing") {
      intervalRef.current = setInterval(() => {
        return voicePackRefetch();
      }, 1000);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [voicePack, voicePackRefetch]);
  const voicePackContent = React.useMemo(() => {
    if (voicePackError) {
      return /*#__PURE__*/React.createElement(Typography, {
        color: "error"
      }, "Error loading voice pack management state.");
    }
    const statusType = voicePack?.operationStatus.type;
    const isError = statusType === "error";
    const isDownloading = statusType === "downloading";
    const isInstalling = statusType === "installing";
    const isWorking = isDownloading || isInstalling;
    const commandDisabled = !voicePack || isDownloading || isInstalling;
    const progressValue = voicePack?.operationStatus.progress;
    const progressVariant = progressValue ? "determinate" : "indeterminate";
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Typography, {
      variant: "body1",
      sx: {
        mb: 1
      }
    }, "Current language: ", voicePack?.currentLanguage), isError && /*#__PURE__*/React.createElement(Typography, {
      color: "error"
    }, "Error installing voice pack. Check the log for details."), /*#__PURE__*/React.createElement(Collapse, {
      in: isWorking
    }, /*#__PURE__*/React.createElement(Typography, {
      variant: "subtitle1"
    }, isDownloading ? "Downloading..." : "Installing..."), /*#__PURE__*/React.createElement(LinearProgress, {
      color: isDownloading ? "success" : "secondary",
      variant: progressVariant,
      value: progressValue,
      sx: {
        mb: 1
      }
    })), /*#__PURE__*/React.createElement(TextField, {
      label: "URL",
      value: url,
      onChange: e => {
        setUrl(e.target.value);
      },
      variant: "standard",
      placeholder: "https://",
      disabled: commandDisabled,
      fullWidth: true,
      sx: {
        mb: 0.3
      }
    }), /*#__PURE__*/React.createElement(TextField, {
      label: "Language code",
      value: languageCode,
      onChange: e => {
        setLanguageCode(e.target.value);
      },
      variant: "standard",
      placeholder: "VA",
      disabled: commandDisabled,
      fullWidth: true,
      sx: {
        mb: 0.3
      }
    }), /*#__PURE__*/React.createElement(TextField, {
      label: "Hash",
      value: hash,
      onChange: e => {
        setHash(e.target.value);
      },
      variant: "standard",
      disabled: commandDisabled,
      fullWidth: true,
      sx: {
        mb: 1
      }
    }), /*#__PURE__*/React.createElement(LoadingButton, {
      loading: voicePackMutating || commandDisabled,
      loadingPosition: "center",
      variant: "outlined",
      onClick: () => {
        const command = {
          action: "download",
          url: url,
          hash: hash,
          language: languageCode
        };
        sendVoicePackCommand(command);
      }
    }, "Set voice pack"));
  }, [sendVoicePackCommand, voicePack, voicePackError, voicePackMutating, hash, languageCode, url]);
  const loading = voicePackFetching || voicePackMutating || !voicePack;
  return /*#__PURE__*/React.createElement(CapabilityItem, {
    title: "Voice packs",
    loading: loading,
    helpText: VoicepackHelp
  }, voicePackContent);
};
const VoicePackManagement = () => {
  const [voicePackManagement] = useCapabilitiesSupported(Capability.VoicePackManagement);
  if (!voicePackManagement) {
    return null;
  }
  return /*#__PURE__*/React.createElement(VoicePackControl, null);
};
export default VoicePackManagement;