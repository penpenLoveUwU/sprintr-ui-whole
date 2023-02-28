import { Box, Checkbox, Divider, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useNTPClientConfigurationMutation, useNTPClientConfigurationQuery, useNTPClientStateQuery } from "../../api";
import LoadingFade from "../../components/LoadingFade";
import { LoadingButton } from "@mui/lab";
import { AccessTime as NTPIcon, Sync as SyncEnabledIcon, SyncDisabled as SyncDisabledIcon, SyncLock as SyncSuccessfulIcon, SyncProblem as SyncErrorIcon } from "@mui/icons-material";
import InfoBox from "../../components/InfoBox";
import PaperContainer from "../../components/PaperContainer";
import DetailPageHeaderRow from "../../components/DetailPageHeaderRow";
const NTPClientStateComponent = ({
  state,
  stateLoading,
  stateError
}) => {
  if (stateLoading || !state) {
    return /*#__PURE__*/React.createElement(LoadingFade, null);
  }
  if (stateError) {
    return /*#__PURE__*/React.createElement(Typography, {
      color: "error"
    }, "Error loading NTPClient state");
  }
  const getIconForState = () => {
    switch (state.__class) {
      case "ValetudoNTPClientEnabledState":
        return /*#__PURE__*/React.createElement(SyncEnabledIcon, {
          sx: {
            fontSize: "4rem"
          }
        });
      case "ValetudoNTPClientDisabledState":
        return /*#__PURE__*/React.createElement(SyncDisabledIcon, {
          sx: {
            fontSize: "4rem"
          }
        });
      case "ValetudoNTPClientSyncedState":
        return /*#__PURE__*/React.createElement(SyncSuccessfulIcon, {
          sx: {
            fontSize: "4rem"
          }
        });
      case "ValetudoNTPClientErrorState":
        return /*#__PURE__*/React.createElement(SyncErrorIcon, {
          sx: {
            fontSize: "4rem"
          }
        });
    }
  };
  const getContentForState = () => {
    switch (state.__class) {
      case "ValetudoNTPClientErrorState":
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Typography, {
          variant: "h5",
          color: "red"
        }, "Error: ", state.type), /*#__PURE__*/React.createElement(Typography, {
          color: "red"
        }, state.message));
      case "ValetudoNTPClientEnabledState":
        return /*#__PURE__*/React.createElement(Typography, {
          variant: "h5"
        }, "Time sync enabled");
      case "ValetudoNTPClientDisabledState":
        return /*#__PURE__*/React.createElement(Typography, {
          variant: "h5"
        }, "Time sync disabled");
      case "ValetudoNTPClientSyncedState":
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Typography, {
          variant: "h5"
        }, "Time sync successful"), /*#__PURE__*/React.createElement(Typography, null, "Offset: ", state.offset, " ms"));
    }
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
  }, getContentForState())));
};
const NTPConnectivity = () => {
  const {
    data: ntpClientState,
    isLoading: ntpClientStateLoading,
    isFetching: ntpClientStateFetching,
    isError: ntpClientStateError,
    refetch: refetchNtpClientState
  } = useNTPClientStateQuery();
  const {
    data: ntpClientConfig,
    isLoading: ntpClientConfigLoading,
    isError: ntpClientConfigError
  } = useNTPClientConfigurationQuery();
  const {
    mutate: updateConfiguration,
    isLoading: configurationUpdating
  } = useNTPClientConfigurationMutation();
  const [enabled, setEnabled] = React.useState(false);
  const [server, setServer] = React.useState("");
  const [port, setPort] = React.useState(0);
  const [ntpInterval, setNtpInterval] = React.useState(0);
  const [ntpTimeout, setNtpTimeout] = React.useState(0);
  const [configurationModified, setConfigurationModified] = React.useState(false);
  React.useEffect(() => {
    if (ntpClientConfig) {
      setEnabled(ntpClientConfig.enabled);
      setServer(ntpClientConfig.server);
      setPort(ntpClientConfig.port);
      setNtpInterval(ntpClientConfig.interval);
      setNtpTimeout(ntpClientConfig.timeout);
    }
  }, [ntpClientConfig]);
  if (ntpClientStateLoading || ntpClientConfigLoading) {
    return /*#__PURE__*/React.createElement(LoadingFade, null);
  }
  if (ntpClientStateError || ntpClientConfigError || !ntpClientState || !ntpClientConfig) {
    return /*#__PURE__*/React.createElement(Typography, {
      color: "error"
    }, "Error loading NTP Client configuration");
  }
  return /*#__PURE__*/React.createElement(PaperContainer, null, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "row"
  }, /*#__PURE__*/React.createElement(Box, {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(DetailPageHeaderRow, {
    title: "NTP Connectivity",
    icon: /*#__PURE__*/React.createElement(NTPIcon, null),
    onRefreshClick: () => {
      refetchNtpClientState().catch(() => {
        /* intentional */
      });
    },
    isRefreshing: ntpClientStateFetching
  }), /*#__PURE__*/React.createElement(NTPClientStateComponent, {
    state: ntpClientState,
    stateLoading: ntpClientStateLoading,
    stateError: ntpClientStateError
  }), /*#__PURE__*/React.createElement(Divider, {
    sx: {
      mt: 1
    },
    style: {
      marginBottom: "1rem"
    }
  }), /*#__PURE__*/React.createElement(FormControlLabel, {
    control: /*#__PURE__*/React.createElement(Checkbox, {
      checked: enabled,
      onChange: e => {
        setEnabled(e.target.checked);
        setConfigurationModified(true);
      }
    }),
    label: "NTP enabled",
    sx: {
      mb: 1
    }
  }), /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 1,
    sx: {
      mb: 2
    }
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
    label: "Server",
    value: server,
    disabled: !enabled,
    variant: "standard",
    onChange: e => {
      setServer(e.target.value);
      setConfigurationModified(true);
    }
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: "auto",
    style: {
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    style: {
      width: "100%"
    },
    label: "Port",
    value: port,
    disabled: !enabled,
    type: "number",
    inputProps: {
      min: 1,
      max: 65535
    },
    variant: "standard",
    onChange: e => {
      setPort(parseInt(e.target.value));
      setConfigurationModified(true);
    }
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: "auto",
    style: {
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    style: {
      width: "100%"
    },
    label: "Interval (hours)",
    value: ntpInterval / 3600000,
    sx: {
      minWidth: 100
    },
    disabled: !enabled,
    type: "number",
    inputProps: {
      min: 1,
      max: 24
    },
    variant: "standard",
    onChange: e => {
      setNtpInterval(3600000 * parseInt(e.target.value));
      setConfigurationModified(true);
    }
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: "auto",
    style: {
      flexGrow: 1
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    style: {
      width: "100%"
    },
    label: "Timeout (seconds)",
    value: ntpTimeout / 1000,
    sx: {
      minWidth: 150
    },
    disabled: !enabled,
    type: "number",
    inputProps: {
      min: 5,
      max: 60
    },
    variant: "standard",
    onChange: e => {
      setNtpTimeout(1000 * parseInt(e.target.value));
      setConfigurationModified(true);
    }
  }))), /*#__PURE__*/React.createElement(InfoBox, {
    boxShadow: 5,
    style: {
      marginTop: "3rem",
      marginBottom: "2rem"
    }
  }, /*#__PURE__*/React.createElement(Typography, {
    color: "info"
  }, "Valetudo needs a synchronized clock for timers to work and the log timestamps to make sense. Furthermore, the integrated updater may not work if the clock is set wrongly due to SSL certificates usually only being valid within a particular period of time.")), /*#__PURE__*/React.createElement(Divider, {
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
        server,
        port,
        interval: ntpInterval,
        timeout: ntpTimeout
      });
      setConfigurationModified(false);
    }
  }, "Save configuration"))))));
};
export default NTPConnectivity;