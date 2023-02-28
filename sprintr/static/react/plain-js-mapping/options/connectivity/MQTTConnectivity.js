function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { Box, Card, CardContent, Checkbox, Collapse, Container, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, IconButton, Input, InputAdornment, InputLabel, Popper, Switch, Typography, useTheme } from "@mui/material";
import { ArrowUpward, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, LinkOff as MQTTDisconnectedIcon, Link as MQTTConnectedIcon, Sync as MQTTConnectingIcon, Warning as MQTTErrorIcon } from "@mui/icons-material";
import React from "react";
import { useMQTTConfigurationMutation, useMQTTConfigurationQuery, useMQTTPropertiesQuery, useMQTTStatusQuery } from "../../api";
import { getIn, setIn } from "../../api/utils";
import { convertBytesToHumans, deepCopy } from "../../utils";
import LoadingFade from "../../components/LoadingFade";
import InfoBox from "../../components/InfoBox";
import PaperContainer from "../../components/PaperContainer";
import { MQTTIcon } from "../../components/CustomIcons";
import { LoadingButton } from "@mui/lab";
import TextInformationGrid from "../../components/TextInformationGrid";
import DetailPageHeaderRow from "../../components/DetailPageHeaderRow";
const MQTTStatusComponent = ({
  status,
  statusLoading,
  statusError
}) => {
  if (statusLoading || !status) {
    return /*#__PURE__*/React.createElement(LoadingFade, null);
  }
  if (statusError) {
    return /*#__PURE__*/React.createElement(Typography, {
      color: "error"
    }, "Error loading MQTT status");
  }
  const getIconForState = () => {
    switch (status.state) {
      case "disconnected":
        return /*#__PURE__*/React.createElement(MQTTDisconnectedIcon, {
          sx: {
            fontSize: "4rem"
          }
        });
      case "ready":
        return /*#__PURE__*/React.createElement(MQTTConnectedIcon, {
          sx: {
            fontSize: "4rem"
          }
        });
      case "init":
        return /*#__PURE__*/React.createElement(MQTTConnectingIcon, {
          sx: {
            fontSize: "4rem"
          }
        });
      case "lost":
      case "alert":
        return /*#__PURE__*/React.createElement(MQTTErrorIcon, {
          sx: {
            fontSize: "4rem"
          }
        });
    }
  };
  const getContentForState = () => {
    switch (status.state) {
      case "disconnected":
        return /*#__PURE__*/React.createElement(Typography, {
          variant: "h5"
        }, "Disconnected");
      case "ready":
        return /*#__PURE__*/React.createElement(Typography, {
          variant: "h5"
        }, "Connected");
      case "init":
        return /*#__PURE__*/React.createElement(Typography, {
          variant: "h5"
        }, "Connecting/Reconfiguring");
      case "lost":
      case "alert":
        return /*#__PURE__*/React.createElement(Typography, {
          variant: "h5"
        }, "Connection error");
    }
  };
  const getMessageStats = () => {
    const items = [{
      header: "Messages Sent",
      body: status.stats.messages.count.sent.toString()
    }, {
      header: "Bytes Sent",
      body: convertBytesToHumans(status.stats.messages.bytes.sent)
    }, {
      header: "Messages Received",
      body: status.stats.messages.count.received.toString()
    }, {
      header: "Bytes Received",
      body: convertBytesToHumans(status.stats.messages.bytes.received)
    }];
    return /*#__PURE__*/React.createElement(TextInformationGrid, {
      items: items
    });
  };
  const getConnectionStats = () => {
    const items = [{
      header: "Connects",
      body: status.stats.connection.connects.toString()
    }, {
      header: "Disconnects",
      body: status.stats.connection.disconnects.toString()
    }, {
      header: "Reconnects",
      body: status.stats.connection.reconnects.toString()
    }, {
      header: "Errors",
      body: status.stats.connection.errors.toString()
    }];
    return /*#__PURE__*/React.createElement(TextInformationGrid, {
      items: items
    });
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    alignItems: "center",
    direction: "column",
    style: {
      paddingBottom: "1rem"
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    style: {
      marginTop: "1rem"
    }
  }, getIconForState()), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    sx: {
      maxWidth: "100% !important",
      wordWrap: "break-word",
      textAlign: "center",
      userSelect: "none"
    }
  }, getContentForState()), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    container: true,
    direction: "row",
    style: {
      marginTop: "1rem"
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    style: {
      flexGrow: 1
    },
    p: 1
  }, /*#__PURE__*/React.createElement(Card, {
    sx: {
      boxShadow: 3
    }
  }, /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(Typography, {
    variant: "h6",
    gutterBottom: true
  }, "Message Statistics"), /*#__PURE__*/React.createElement(Divider, null), getMessageStats()))), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    style: {
      flexGrow: 1
    },
    p: 1
  }, /*#__PURE__*/React.createElement(Card, {
    sx: {
      boxShadow: 3
    }
  }, /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(Typography, {
    variant: "h6",
    gutterBottom: true
  }, "Connection Statistics"), /*#__PURE__*/React.createElement(Divider, null), getConnectionStats()))))));
};
const GroupBox = props => {
  let title = /*#__PURE__*/React.createElement(Typography, {
    variant: "subtitle1",
    sx: {
      marginBottom: 0
    }
  }, props.title);
  if (props.onChange) {
    title = /*#__PURE__*/React.createElement(FormControlLabel, {
      control: /*#__PURE__*/React.createElement(Checkbox, {
        checked: props.checked,
        disabled: props.disabled,
        onChange: props.onChange
      }),
      disableTypography: true,
      label: title
    });
  }
  return /*#__PURE__*/React.createElement(Container, {
    sx: {
      m: 0.2
    }
  }, title, /*#__PURE__*/React.createElement(Collapse, {
    in: props.checked || !props.onChange,
    appear: false
  }, /*#__PURE__*/React.createElement("div", null, props.children)), /*#__PURE__*/React.createElement(Box, {
    pt: 1
  }));
};
const MQTTInput = ({
  mqttConfiguration,
  modifyMQTTConfig,
  disabled,
  title,
  helperText,
  required,
  configPath,
  additionalProps,
  inputPostProcessor
}) => {
  const idBase = "mqtt-config-" + configPath.join("-");
  const inputId = idBase + "-input";
  const helperId = idBase + "-helper";
  const value = getIn(mqttConfiguration, configPath);
  const error = required && !value;
  return /*#__PURE__*/React.createElement(FormControl, {
    required: required,
    error: error,
    component: "fieldset",
    sx: {
      ml: 1,
      mt: 2
    },
    disabled: disabled
  }, /*#__PURE__*/React.createElement(InputLabel, {
    htmlFor: inputId,
    disabled: disabled
  }, title), /*#__PURE__*/React.createElement(Input, _extends({
    id: inputId,
    value: value,
    onChange: e => {
      let newValue = additionalProps?.type === "number" ? parseInt(e.target.value) : e.target.value;
      if (inputPostProcessor) {
        newValue = inputPostProcessor(newValue);
      }
      modifyMQTTConfig(newValue, configPath);
    },
    "aria-describedby": helperId,
    disabled: disabled
  }, additionalProps)), /*#__PURE__*/React.createElement(FormHelperText, {
    id: helperId,
    disabled: disabled
  }, helperText));
};
const MQTTSwitch = ({
  mqttConfiguration,
  modifyMQTTConfig,
  disabled,
  title,
  configPath
}) => {
  const value = getIn(mqttConfiguration, configPath);
  return /*#__PURE__*/React.createElement(FormControlLabel, {
    control: /*#__PURE__*/React.createElement(Switch, {
      checked: value,
      onChange: e => {
        modifyMQTTConfig(e.target.checked, configPath);
      }
    }),
    disabled: disabled,
    label: title
  });
};
const MQTTOptionalExposedCapabilitiesEditor = ({
  mqttConfiguration,
  modifyMQTTConfig,
  disabled,
  configPath,
  exposableCapabilities
}) => {
  let selection = getIn(mqttConfiguration, configPath);
  return /*#__PURE__*/React.createElement(Container, {
    sx: {
      m: 0.2
    }
  }, /*#__PURE__*/React.createElement(FormGroup, null, exposableCapabilities.map(capabilityName => {
    return /*#__PURE__*/React.createElement(FormControlLabel, {
      key: capabilityName,
      control: /*#__PURE__*/React.createElement(Checkbox, {
        checked: selection.includes(capabilityName),
        onChange: e => {
          if (e.target.checked) {
            selection.push(capabilityName);
          } else {
            selection = selection.filter(e => {
              return e !== capabilityName;
            });
          }
          modifyMQTTConfig(selection, configPath);
        }
      }),
      disabled: disabled,
      label: capabilityName
    });
  })));
};
const sanitizeStringForMQTT = (value, allowSlashes = false) => {
  /*
    This rather limited set of characters is unfortunately required by Home Assistant
    Without Home Assistant, it would be enough to replace [\s+#/]
      See also: https://www.home-assistant.io/docs/mqtt/discovery/#discovery-topic
   */
  return value.replace(allowSlashes ? /[^a-zA-Z0-9_\-/]/g : /[^a-zA-Z0-9_-]/g, "");
};
const sanitizeTopicPrefix = value => {
  return value.replace(/^\//, "").replace(/\/$/, "");
};
const sanitizeConfigBeforeSaving = mqttConfiguration => {
  mqttConfiguration.customizations.topicPrefix = sanitizeTopicPrefix(mqttConfiguration.customizations.topicPrefix);
};
const MQTTConnectivity = () => {
  const theme = useTheme();
  const [anchorElement, setAnchorElement] = React.useState(null);
  const identifierElement = React.useRef(null);
  const topicElement = React.useRef(null);
  const {
    data: storedMQTTConfiguration,
    isLoading: mqttConfigurationLoading,
    isError: mqttConfigurationError
  } = useMQTTConfigurationQuery();
  const {
    data: mqttStatus,
    isLoading: mqttStatusLoading,
    isFetching: mqttStatusFetching,
    isError: mqttStatusError,
    refetch: refetchMqttStatus
  } = useMQTTStatusQuery();
  const {
    data: mqttProperties,
    isLoading: mqttPropertiesLoading,
    isError: mqttPropertiesError
  } = useMQTTPropertiesQuery();
  const {
    mutate: updateMQTTConfiguration,
    isLoading: mqttConfigurationUpdating
  } = useMQTTConfigurationMutation();
  const [mqttConfiguration, setMQTTConfiguration] = React.useState(null);
  const [configurationModified, setConfigurationModified] = React.useState(false);
  const [showMQTTAuthPasswordAsPlain, setShowMQTTAuthPasswordAsPlain] = React.useState(false);
  React.useEffect(() => {
    if (storedMQTTConfiguration && !configurationModified && !mqttConfigurationUpdating) {
      setMQTTConfiguration(deepCopy(storedMQTTConfiguration));
      setConfigurationModified(false);
    }
  }, [storedMQTTConfiguration, configurationModified, mqttConfigurationUpdating]);
  const modifyMQTTConfig = React.useCallback((value, configPath) => {
    if (!mqttConfiguration) {
      return;
    }
    const newConfig = deepCopy(mqttConfiguration);
    setIn(newConfig, value, configPath);
    setMQTTConfiguration(newConfig);
    setConfigurationModified(true);
  }, [mqttConfiguration]);
  if (mqttConfigurationLoading || mqttPropertiesLoading || !mqttConfiguration) {
    return /*#__PURE__*/React.createElement(LoadingFade, null);
  }
  if (mqttConfigurationError || mqttPropertiesError || !storedMQTTConfiguration || !mqttProperties) {
    return /*#__PURE__*/React.createElement(Typography, {
      color: "error"
    }, "Error loading MQTT configuration");
  }
  const disabled = !mqttConfiguration.enabled;
  return /*#__PURE__*/React.createElement(PaperContainer, null, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "row"
  }, /*#__PURE__*/React.createElement(Box, {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(DetailPageHeaderRow, {
    title: "MQTT Connectivity",
    icon: /*#__PURE__*/React.createElement(MQTTIcon, null),
    onRefreshClick: () => {
      refetchMqttStatus().catch(() => {
        /* intentional */
      });
    },
    isRefreshing: mqttStatusFetching
  }), /*#__PURE__*/React.createElement(MQTTStatusComponent, {
    status: mqttStatus,
    statusLoading: mqttStatusLoading,
    statusError: mqttStatusError
  }), /*#__PURE__*/React.createElement(Divider, {
    sx: {
      mt: 1
    },
    style: {
      marginBottom: "1rem"
    }
  }), /*#__PURE__*/React.createElement(FormControlLabel, {
    control: /*#__PURE__*/React.createElement(Checkbox, {
      checked: mqttConfiguration.enabled,
      onChange: e => {
        modifyMQTTConfig(e.target.checked, ["enabled"]);
      }
    }),
    label: "MQTT enabled"
  }), /*#__PURE__*/React.createElement(GroupBox, {
    title: "Connection"
  }, /*#__PURE__*/React.createElement(MQTTInput, {
    mqttConfiguration: mqttConfiguration,
    modifyMQTTConfig: modifyMQTTConfig,
    disabled: disabled,
    title: "Host",
    helperText: "The MQTT Broker hostname",
    required: true,
    configPath: ["connection", "host"]
  }), /*#__PURE__*/React.createElement(MQTTInput, {
    mqttConfiguration: mqttConfiguration,
    modifyMQTTConfig: modifyMQTTConfig,
    disabled: disabled,
    title: "Port",
    helperText: "The MQTT Broker port",
    required: true,
    configPath: ["connection", "port"],
    additionalProps: {
      type: "number"
    }
  }), /*#__PURE__*/React.createElement(GroupBox, {
    title: "TLS",
    checked: mqttConfiguration.connection.tls.enabled,
    disabled: disabled,
    onChange: e => {
      modifyMQTTConfig(e.target.checked, ["connection", "tls", "enabled"]);
    }
  }, /*#__PURE__*/React.createElement(MQTTInput, {
    mqttConfiguration: mqttConfiguration,
    modifyMQTTConfig: modifyMQTTConfig,
    disabled: disabled,
    title: "CA",
    helperText: "The optional Certificate Authority to verify the connection with",
    required: false,
    configPath: ["connection", "tls", "ca"],
    additionalProps: {
      multiline: true,
      minRows: 3,
      maxRows: 10
    }
  })), /*#__PURE__*/React.createElement(GroupBox, {
    title: "Authentication"
  }, /*#__PURE__*/React.createElement(GroupBox, {
    title: "Credentials",
    disabled: disabled,
    checked: mqttConfiguration.connection.authentication.credentials.enabled,
    onChange: e => {
      modifyMQTTConfig(e.target.checked, ["connection", "authentication", "credentials", "enabled"]);
    }
  }, /*#__PURE__*/React.createElement(MQTTInput, {
    mqttConfiguration: mqttConfiguration,
    modifyMQTTConfig: modifyMQTTConfig,
    disabled: disabled,
    title: "Username",
    helperText: "Username for authentication",
    required: true,
    configPath: ["connection", "authentication", "credentials", "username"]
  }), /*#__PURE__*/React.createElement(MQTTInput, {
    mqttConfiguration: mqttConfiguration,
    modifyMQTTConfig: modifyMQTTConfig,
    disabled: disabled,
    title: "Password",
    helperText: "Password for authentication",
    required: false,
    configPath: ["connection", "authentication", "credentials", "password"],
    additionalProps: {
      type: showMQTTAuthPasswordAsPlain ? "text" : "password",
      endAdornment: /*#__PURE__*/React.createElement(InputAdornment, {
        position: "end"
      }, /*#__PURE__*/React.createElement(IconButton, {
        "aria-label": "toggle password visibility",
        onClick: () => {
          setShowMQTTAuthPasswordAsPlain(!showMQTTAuthPasswordAsPlain);
        },
        onMouseDown: e => {
          e.preventDefault();
        },
        edge: "end"
      }, showMQTTAuthPasswordAsPlain ? /*#__PURE__*/React.createElement(VisibilityOffIcon, null) : /*#__PURE__*/React.createElement(VisibilityIcon, null)))
    }
  })), /*#__PURE__*/React.createElement(GroupBox, {
    title: "Client certificate",
    disabled: disabled,
    checked: mqttConfiguration.connection.authentication.clientCertificate.enabled,
    onChange: e => {
      modifyMQTTConfig(e.target.checked, ["connection", "authentication", "clientCertificate", "enabled"]);
    }
  }, /*#__PURE__*/React.createElement(MQTTInput, {
    mqttConfiguration: mqttConfiguration,
    modifyMQTTConfig: modifyMQTTConfig,
    disabled: disabled,
    title: "Certificate",
    helperText: "The full certificate as a multi-line string",
    required: true,
    configPath: ["connection", "authentication", "clientCertificate", "certificate"],
    additionalProps: {
      multiline: true,
      minRows: 3,
      maxRows: 10
    }
  }), /*#__PURE__*/React.createElement(MQTTInput, {
    mqttConfiguration: mqttConfiguration,
    modifyMQTTConfig: modifyMQTTConfig,
    disabled: disabled,
    title: "Key",
    helperText: "The full key as a multi-line string",
    required: true,
    configPath: ["connection", "authentication", "clientCertificate", "key"],
    additionalProps: {
      multiline: true,
      minRows: 3,
      maxRows: 10
    }
  })))), /*#__PURE__*/React.createElement(GroupBox, {
    title: "Customizations",
    disabled: disabled
  }, /*#__PURE__*/React.createElement(MQTTInput, {
    mqttConfiguration: mqttConfiguration,
    modifyMQTTConfig: modifyMQTTConfig,
    disabled: disabled,
    title: "Topic prefix",
    helperText: "MQTT topic prefix",
    required: false,
    configPath: ["customizations", "topicPrefix"],
    additionalProps: {
      placeholder: mqttProperties.defaults.customizations.topicPrefix,
      color: "warning",
      onFocus: () => {
        setAnchorElement(topicElement.current);
      },
      onBlur: () => {
        setAnchorElement(null);
      }
    },
    inputPostProcessor: value => {
      return sanitizeStringForMQTT(value, true).replace(/\/\//g, "/");
    }
  }), /*#__PURE__*/React.createElement(MQTTInput, {
    mqttConfiguration: mqttConfiguration,
    modifyMQTTConfig: modifyMQTTConfig,
    disabled: disabled,
    title: "Identifier",
    helperText: "The machine-readable name of the robot",
    required: false,
    configPath: ["identity", "identifier"],
    additionalProps: {
      placeholder: mqttProperties.defaults.identity.identifier,
      color: "secondary",
      onFocus: () => {
        setAnchorElement(identifierElement.current);
      },
      onBlur: () => {
        setAnchorElement(null);
      }
    },
    inputPostProcessor: value => {
      return sanitizeStringForMQTT(value, false);
    }
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Typography, {
    variant: "subtitle2",
    sx: {
      mt: "0.5rem",
      mb: "2rem"
    },
    noWrap: false
  }, "The MQTT Topic structure will look like this:", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "\"JetBrains Mono\",monospace",
      fontWeight: 200,
      overflowWrap: "anywhere"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.palette.warning.main
    },
    ref: topicElement
  }, sanitizeTopicPrefix(mqttConfiguration.customizations.topicPrefix) || mqttProperties.defaults.customizations.topicPrefix), "/", /*#__PURE__*/React.createElement("wbr", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: theme.palette.secondary.main
    },
    ref: identifierElement
  }, mqttConfiguration.identity.identifier || mqttProperties.defaults.identity.identifier), "/", /*#__PURE__*/React.createElement("wbr", null), "BatteryStateAttribute/", /*#__PURE__*/React.createElement("wbr", null), "level")), /*#__PURE__*/React.createElement(MQTTSwitch, {
    mqttConfiguration: mqttConfiguration,
    modifyMQTTConfig: modifyMQTTConfig,
    disabled: disabled,
    title: "Provide map data",
    configPath: ["customizations", "provideMapData"]
  })), /*#__PURE__*/React.createElement(GroupBox, {
    title: "Interfaces",
    disabled: disabled
  }, /*#__PURE__*/React.createElement(GroupBox, {
    title: "Homie",
    checked: mqttConfiguration.interfaces.homie.enabled,
    disabled: disabled,
    onChange: e => {
      modifyMQTTConfig(e.target.checked, ["interfaces", "homie", "enabled"]);
    }
  }, /*#__PURE__*/React.createElement(FormControl, {
    component: "fieldset",
    variant: "standard"
  }, /*#__PURE__*/React.createElement(FormLabel, {
    component: "legend"
  }, "Select the options for Homie integration"), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(MQTTSwitch, {
    mqttConfiguration: mqttConfiguration,
    modifyMQTTConfig: modifyMQTTConfig,
    disabled: disabled,
    title: "Provide autodiscovery for \"I Can't Believe It's Not Valetudo\" map",
    configPath: ["interfaces", "homie", "addICBINVMapProperty"]
  }), /*#__PURE__*/React.createElement(MQTTSwitch, {
    mqttConfiguration: mqttConfiguration,
    modifyMQTTConfig: modifyMQTTConfig,
    disabled: disabled,
    title: "Delete autodiscovery on shutdown",
    configPath: ["interfaces", "homie", "cleanAttributesOnShutdown"]
  })))), /*#__PURE__*/React.createElement(GroupBox, {
    title: "Home Assistant",
    checked: mqttConfiguration.interfaces.homeassistant.enabled,
    disabled: disabled,
    onChange: e => {
      modifyMQTTConfig(e.target.checked, ["interfaces", "homeassistant", "enabled"]);
    }
  }, /*#__PURE__*/React.createElement(FormControl, {
    component: "fieldset",
    variant: "standard"
  }, /*#__PURE__*/React.createElement(FormLabel, {
    component: "legend"
  }, "Select the options for Home Assistant integration"), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(MQTTSwitch, {
    mqttConfiguration: mqttConfiguration,
    modifyMQTTConfig: modifyMQTTConfig,
    disabled: disabled,
    title: "Delete autodiscovery on shutdown",
    configPath: ["interfaces", "homeassistant", "cleanAutoconfOnShutdown"]
  }))))), mqttProperties.optionalExposableCapabilities.length > 0 && /*#__PURE__*/React.createElement(GroupBox, {
    title: "Optional exposable capabilities",
    disabled: disabled
  }, /*#__PURE__*/React.createElement(MQTTOptionalExposedCapabilitiesEditor, {
    mqttConfiguration: mqttConfiguration,
    modifyMQTTConfig: modifyMQTTConfig,
    disabled: disabled,
    configPath: ["optionalExposedCapabilities"],
    exposableCapabilities: mqttProperties.optionalExposableCapabilities
  })), /*#__PURE__*/React.createElement(Popper, {
    open: Boolean(anchorElement),
    anchorEl: anchorElement
  }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(ArrowUpward, {
    fontSize: "large",
    color: "info"
  }))), /*#__PURE__*/React.createElement(InfoBox, {
    boxShadow: 5,
    style: {
      marginTop: "2rem",
      marginBottom: "2rem"
    }
  }, /*#__PURE__*/React.createElement(Typography, {
    color: "info"
  }, "Valetudo recommends the use of the Eclipse Mosquitto MQTT Broker, which is FOSS, has a tiny resource footprint and is part of basically every GNU/Linux distribution. You can also install it as a container via the container management solution of your choice.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "If you're experiencing problems regarding MQTT, make sure to try Mosquitto since some other MQTT brokers only implement a subset of the MQTT spec, which often leads to issues when used with Valetudo.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "If you're using Mosquitto but still experience issues, make sure that your ACLs (if any) are correct and you're also using the correct login credentials for those. Valetudo will not receive any feedback from the broker if publishing fails due to ACL restrictions as such feedback simply isn't part of the MQTT v3.1.1 spec. MQTT v5 fixes this issue but isn't widely available just yet.")), /*#__PURE__*/React.createElement(Divider, {
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
    disabled: !configurationModified,
    loading: mqttConfigurationUpdating,
    color: "primary",
    variant: "outlined",
    onClick: () => {
      sanitizeConfigBeforeSaving(mqttConfiguration);
      updateMQTTConfiguration(mqttConfiguration);
      setConfigurationModified(false);
    }
  }, "Save configuration"))))));
};
export default MQTTConnectivity;