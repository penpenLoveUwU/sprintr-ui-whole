import { Box, Checkbox, Divider, FormControl, FormControlLabel, Grid, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from "@mui/material";
import React from "react";
import { useHTTPBasicAuthConfigurationMutation, useHTTPBasicAuthConfigurationQuery } from "../../api";
import LoadingFade from "../../components/LoadingFade";
import { LoadingButton } from "@mui/lab";
import InfoBox from "../../components/InfoBox";
import PaperContainer from "../../components/PaperContainer";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, VpnKey as BasicAuthIcon } from "@mui/icons-material";
import DetailPageHeaderRow from "../../components/DetailPageHeaderRow";
const AuthSettings = () => {
  const {
    data: storedConfiguration,
    isLoading: configurationLoading,
    isError: configurationError
  } = useHTTPBasicAuthConfigurationQuery();
  const {
    mutate: updateConfiguration,
    isLoading: configurationUpdating
  } = useHTTPBasicAuthConfigurationMutation();
  const [enabled, setEnabled] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPasswordAsPlain, setShowPasswordAsPlain] = React.useState(false);
  const [configurationModified, setConfigurationModified] = React.useState(false);
  React.useEffect(() => {
    if (storedConfiguration) {
      setEnabled(storedConfiguration.enabled);
      setUsername(storedConfiguration.username);
      setPassword(storedConfiguration.password);
    }
  }, [storedConfiguration]);
  if (configurationLoading) {
    return /*#__PURE__*/React.createElement(LoadingFade, null);
  }
  if (configurationError || !storedConfiguration) {
    return /*#__PURE__*/React.createElement(Typography, {
      color: "error"
    }, "Error loading HTTP Basic Auth configuration");
  }
  return /*#__PURE__*/React.createElement(PaperContainer, null, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "row"
  }, /*#__PURE__*/React.createElement(Box, {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(DetailPageHeaderRow, {
    title: "HTTP Basic Auth",
    icon: /*#__PURE__*/React.createElement(BasicAuthIcon, null)
  }), /*#__PURE__*/React.createElement(FormControlLabel, {
    control: /*#__PURE__*/React.createElement(Checkbox, {
      checked: enabled,
      onChange: e => {
        setEnabled(e.target.checked);
        setConfigurationModified(true);
      }
    }),
    label: "HTTP Basic Auth enabled",
    sx: {
      mb: 1
    }
  }), /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 1,
    sx: {
      mb: 1
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
    label: "Username",
    value: username,
    variant: "standard",
    disabled: !enabled,
    onChange: e => {
      setUsername(e.target.value);
      setConfigurationModified(true);
    }
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: "auto",
    style: {
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement(FormControl, {
    style: {
      width: "100%"
    },
    variant: "standard"
  }, /*#__PURE__*/React.createElement(InputLabel, {
    htmlFor: "standard-adornment-password"
  }, "Password"), /*#__PURE__*/React.createElement(Input, {
    type: showPasswordAsPlain ? "text" : "password",
    fullWidth: true,
    value: password,
    disabled: !enabled,
    endAdornment: /*#__PURE__*/React.createElement(InputAdornment, {
      position: "end"
    }, /*#__PURE__*/React.createElement(IconButton, {
      "aria-label": "toggle password visibility",
      onClick: () => {
        setShowPasswordAsPlain(!showPasswordAsPlain);
      },
      onMouseDown: e => {
        e.preventDefault();
      },
      edge: "end"
    }, showPasswordAsPlain ? /*#__PURE__*/React.createElement(VisibilityOffIcon, null) : /*#__PURE__*/React.createElement(VisibilityIcon, null))),
    onChange: e => {
      setPassword(e.target.value);
      setConfigurationModified(true);
    }
  })))), /*#__PURE__*/React.createElement(InfoBox, {
    boxShadow: 5,
    style: {
      marginTop: "3rem",
      marginBottom: "2rem"
    }
  }, /*#__PURE__*/React.createElement(Typography, {
    color: "info"
  }, "Valetudo will by default try to block access from public-routable IP addresses for your safety and convenience.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "If you want to allow external access to your Valetudo instance, consider using a VPN such as WireGuard or OpenVPN to ensure the safety of your network.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "If you don't want to use a VPN, usage of a reverse proxy in front of Valetudo and all of your other IoT things and network services is strongly recommended, as a recent version of a proper WebServer such as nginx, the Apache HTTP Server or similar will likely be more secure than Valetudo itself.", /*#__PURE__*/React.createElement("br", null), "Moreover, this approach will group all access logs to all services in a single place. It's also much easier to implement some kind of Single sign-on that way.")), /*#__PURE__*/React.createElement(Divider, {
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
        enabled,
        username,
        password
      });
      setConfigurationModified(false);
    }
  }, "Save configuration"))))));
};
export default AuthSettings;