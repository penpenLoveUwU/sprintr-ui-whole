import { Box, Checkbox, Divider, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useNetworkAdvertisementConfigurationMutation, useNetworkAdvertisementConfigurationQuery, useNetworkAdvertisementPropertiesQuery } from "../../api";
import LoadingFade from "../../components/LoadingFade";
import { LoadingButton } from "@mui/lab";
import InfoBox from "../../components/InfoBox";
import PaperContainer from "../../components/PaperContainer";
import { AutoFixHigh as NetworkAdvertisementIcon } from "@mui/icons-material";
import DetailPageHeaderRow from "../../components/DetailPageHeaderRow";
const NetworkAdvertisementSettings = () => {
  const {
    data: storedConfiguration,
    isLoading: configurationLoading,
    isError: configurationError
  } = useNetworkAdvertisementConfigurationQuery();
  const {
    data: properties,
    isLoading: propertiesLoading,
    isError: propertiesLoadError
  } = useNetworkAdvertisementPropertiesQuery();
  const {
    mutate: updateConfiguration,
    isLoading: configurationUpdating
  } = useNetworkAdvertisementConfigurationMutation();
  const [enabled, setEnabled] = React.useState(false);
  const [configurationModified, setConfigurationModified] = React.useState(false);
  React.useEffect(() => {
    if (storedConfiguration) {
      setEnabled(storedConfiguration.enabled);
    }
  }, [storedConfiguration]);
  if (configurationLoading || propertiesLoading) {
    return /*#__PURE__*/React.createElement(LoadingFade, null);
  }
  if (configurationError || propertiesLoadError || !storedConfiguration) {
    return /*#__PURE__*/React.createElement(Typography, {
      color: "error"
    }, "Error loading Network Advertisement configuration");
  }
  return /*#__PURE__*/React.createElement(PaperContainer, null, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "row"
  }, /*#__PURE__*/React.createElement(Box, {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(DetailPageHeaderRow, {
    title: "Network Advertisement",
    icon: /*#__PURE__*/React.createElement(NetworkAdvertisementIcon, null)
  }), /*#__PURE__*/React.createElement(FormControlLabel, {
    control: /*#__PURE__*/React.createElement(Checkbox, {
      checked: enabled,
      onChange: e => {
        setEnabled(e.target.checked);
        setConfigurationModified(true);
      }
    }),
    label: "Network Advertisement enabled",
    sx: {
      mb: 1,
      marginTop: "1rem",
      userSelect: "none"
    }
  }), /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 1,
    sx: {
      mb: 1,
      mt: "1rem"
    },
    direction: "row"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: "auto",
    style: {
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    style: {
      width: "100%"
    },
    label: "Zeroconf Hostname",
    value: properties?.zeroconfHostname ?? "",
    variant: "standard",
    disabled: true,
    InputProps: {
      readOnly: true
    }
  }))), /*#__PURE__*/React.createElement(InfoBox, {
    boxShadow: 5,
    style: {
      marginTop: "3rem",
      marginBottom: "2rem"
    }
  }, /*#__PURE__*/React.createElement(Typography, {
    color: "info"
  }, "When running Valetudo in embedded mode, it will advertise its presence on your local network via both Bonjour/mDNS and SSDP/UPnP to enable other software such as the android companion app or the windows explorer to discover it.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "Please note that disabling this feature ", /*#__PURE__*/React.createElement("em", null, "will break"), " the companion app as well as other things that may be able to auto-discover Valetudo instances on your network.")), /*#__PURE__*/React.createElement(Divider, {
    sx: {
      mt: 1
    },
    style: {
      marginBottom: "1rem"
    }
  }), /*#__PURE__*/React.createElement(Grid, {
    container: true
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    style: {
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(LoadingButton, {
    loading: configurationUpdating,
    color: "primary",
    variant: "outlined",
    disabled: !configurationModified,
    onClick: () => {
      updateConfiguration({
        enabled
      });
      setConfigurationModified(false);
    }
  }, "Save configuration"))))));
};
export default NetworkAdvertisementSettings;