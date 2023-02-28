import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, TextField, Typography, useTheme } from "@mui/material";
import React from "react";
import { useWifiConfigurationMutation, useWifiConfigurationPropertiesQuery, useWifiStatusQuery } from "../../api";
import LoadingFade from "../../components/LoadingFade";
import { LoadingButton } from "@mui/lab";
import { Wifi as WifiIcon, Wifi as WifiStateUnknownIcon, SignalWifiOff as WifiStateNotConnectedIcon, SignalWifi4Bar as WifiStateConnected4BarIcon, SignalWifi3Bar as WifiStateConnected3BarIcon, SignalWifi2Bar as WifiStateConnected2BarIcon, SignalWifi1Bar as WifiStateConnected1BarIcon, SignalWifi0Bar as WifiStateConnected0BarIcon, VisibilityOff as VisibilityOffIcon, Visibility as VisibilityIcon } from "@mui/icons-material";
import PaperContainer from "../../components/PaperContainer";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import InfoBox from "../../components/InfoBox";
import DetailPageHeaderRow from "../../components/DetailPageHeaderRow";
const WifiStatusComponent = ({
  status,
  statusLoading,
  statusError
}) => {
  const theme = useTheme();
  if (statusLoading || !status) {
    return /*#__PURE__*/React.createElement(LoadingFade, null);
  }
  if (statusError) {
    return /*#__PURE__*/React.createElement(Typography, {
      color: "error"
    }, "Error loading Wi-Fi status");
  }
  const getIconForState = () => {
    switch (status.state) {
      case "not_connected":
        return /*#__PURE__*/React.createElement(WifiStateNotConnectedIcon, {
          sx: {
            fontSize: "4rem"
          }
        });
      case "unknown":
        return /*#__PURE__*/React.createElement(WifiStateUnknownIcon, {
          sx: {
            fontSize: "4rem"
          }
        });
      case "connected":
        //Adapted from https://android.stackexchange.com/a/176325 Android 7.1.2
        if (status.details.signal === undefined || status.details.signal >= -55) {
          return /*#__PURE__*/React.createElement(WifiStateConnected4BarIcon, {
            sx: {
              fontSize: "4rem"
            }
          });
        } else if (status.details.signal >= -66) {
          return /*#__PURE__*/React.createElement(WifiStateConnected3BarIcon, {
            sx: {
              fontSize: "4rem"
            }
          });
        } else if (status.details.signal >= -77) {
          return /*#__PURE__*/React.createElement(WifiStateConnected2BarIcon, {
            sx: {
              fontSize: "4rem"
            }
          });
        } else if (status.details.signal >= -88) {
          return /*#__PURE__*/React.createElement(WifiStateConnected1BarIcon, {
            sx: {
              fontSize: "4rem"
            }
          });
        } else {
          return /*#__PURE__*/React.createElement(WifiStateConnected0BarIcon, {
            sx: {
              fontSize: "4rem"
            }
          });
        }
    }
  };
  const getContentForState = () => {
    switch (status.state) {
      case "not_connected":
        return /*#__PURE__*/React.createElement(Typography, {
          variant: "h5"
        }, "Not connected");
      case "unknown":
        return /*#__PURE__*/React.createElement(Typography, {
          variant: "h5"
        }, "Unknown");
      case "connected":
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Typography, {
          variant: "h5"
        }, status.details.ssid ?? "Unknown SSID"), status.details.signal !== undefined && /*#__PURE__*/React.createElement(Typography, {
          variant: "subtitle2",
          style: {
            marginTop: "0.5rem",
            color: theme.palette.grey[theme.palette.mode === "light" ? 400 : 700]
          }
        }, status.details.signal, " dBm"), status.details.ips !== undefined && /*#__PURE__*/React.createElement(Typography, {
          variant: "subtitle2",
          style: {
            marginTop: "0.5rem",
            color: theme.palette.grey[theme.palette.mode === "light" ? 400 : 700],
            userSelect: "text"
          }
        }, status.details.ips.map(ip => {
          return /*#__PURE__*/React.createElement("span", {
            key: ip
          }, ip, /*#__PURE__*/React.createElement("br", null));
        })));
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
const WifiConnectivity = () => {
  const {
    data: wifiStatus,
    isLoading: wifiStatusLoading,
    isFetching: wifiStatusFetching,
    isError: wifiStatusLoadError,
    refetch: refetchWifiStatus
  } = useWifiStatusQuery();
  const {
    data: properties,
    isLoading: propertiesLoading,
    isError: propertiesLoadError
  } = useWifiConfigurationPropertiesQuery();
  const {
    mutate: updateConfiguration,
    isLoading: configurationUpdating
  } = useWifiConfigurationMutation({
    onSuccess: () => {
      setFinalDialogOpen(true);
    }
  });
  const [newSSID, setNewSSID] = React.useState("");
  const [newPSK, setNewPSK] = React.useState("");
  const [showPasswordAsPlain, setShowPasswordAsPlain] = React.useState(false);
  const [configurationModified, setConfigurationModified] = React.useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = React.useState(false);
  const [finalDialogOpen, setFinalDialogOpen] = React.useState(false);
  if (wifiStatusLoading || propertiesLoading) {
    return /*#__PURE__*/React.createElement(LoadingFade, null);
  }
  if (wifiStatusLoadError || !wifiStatus || propertiesLoadError || !properties) {
    return /*#__PURE__*/React.createElement(Typography, {
      color: "error"
    }, "Error loading Wi-Fi Status");
  }
  return /*#__PURE__*/React.createElement(PaperContainer, null, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "row"
  }, /*#__PURE__*/React.createElement(Box, {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(DetailPageHeaderRow, {
    title: "Wi-Fi Connectivity",
    icon: /*#__PURE__*/React.createElement(WifiIcon, null),
    onRefreshClick: () => {
      refetchWifiStatus().catch(() => {
        /* intentional */
      });
    },
    isRefreshing: wifiStatusFetching
  }), /*#__PURE__*/React.createElement(WifiStatusComponent, {
    status: wifiStatus,
    statusLoading: wifiStatusLoading,
    statusError: wifiStatusLoadError
  }), /*#__PURE__*/React.createElement(Divider, {
    sx: {
      mt: 1
    },
    style: {
      marginBottom: "1rem"
    }
  }), /*#__PURE__*/React.createElement(Typography, {
    variant: "h6",
    style: {
      marginBottom: "0.5rem"
    }
  }, "Change Wi-Fi configuration"), properties.provisionedReconfigurationSupported && /*#__PURE__*/React.createElement(Grid, {
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
    label: "SSID/Wi-Fi name",
    value: newSSID,
    variant: "standard",
    onChange: e => {
      setNewSSID(e.target.value);
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
  }, "PSK/Password"), /*#__PURE__*/React.createElement(Input, {
    type: showPasswordAsPlain ? "text" : "password",
    fullWidth: true,
    value: newPSK,
    sx: {
      mb: 1
    },
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
      setNewPSK(e.target.value);
      setConfigurationModified(true);
    }
  })))), !properties.provisionedReconfigurationSupported && /*#__PURE__*/React.createElement(InfoBox, {
    boxShadow: 5,
    style: {
      marginTop: "2rem",
      marginBottom: "2rem"
    }
  }, /*#__PURE__*/React.createElement(Typography, {
    color: "info"
  }, "To connect your robot to a different Wi-Fi network, you need to do a Wi-Fi reset.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "Note that the procedure is different depending on your model of robot, so please refer to the relevant documentation to figure out how to do that. After having done that, simply connect to the Wi-Fi AP provided by the robot and then either use the Valetudo Webinterface or the Companion app to enter new Wi-Fi credentials.")), /*#__PURE__*/React.createElement(Divider, {
    sx: {
      mt: 1
    },
    style: {
      marginTop: "1rem",
      marginBottom: "1rem"
    }
  }), properties.provisionedReconfigurationSupported && /*#__PURE__*/React.createElement(Grid, {
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
    disabled: !(configurationModified && newSSID && newPSK),
    onClick: () => {
      setConfirmationDialogOpen(true);
    }
  }, "Save configuration"))))), /*#__PURE__*/React.createElement(ConfirmationDialog, {
    title: "Apply new Wi-Fi configuration?",
    text: "",
    open: confirmationDialogOpen,
    onClose: () => {
      setConfirmationDialogOpen(false);
    },
    onAccept: () => {
      updateConfiguration({
        ssid: newSSID,
        credentials: {
          type: "wpa2_psk",
          typeSpecificSettings: {
            password: newPSK
          }
        }
      });
    }
  }, /*#__PURE__*/React.createElement(DialogContentText, null, "Are you sure you want to apply the new Wifi settings?", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("strong", null, "Hint:"), /*#__PURE__*/React.createElement("br", null), "You can always revert back to the integrated Wifi Hotspot. Check the documentation supplied with your robot for instructions on how to do so.")), /*#__PURE__*/React.createElement(Dialog, {
    open: finalDialogOpen
  }, /*#__PURE__*/React.createElement(DialogTitle, null, "New Wifi configuration is applying"), /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement(DialogContentText, null, "After pressing OK the page will refresh. However, you will most likely need to change the URL since the robot will connect to a new Wifi.")), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      window.location.reload();
    },
    autoFocus: true
  }, "OK"))));
};
export default WifiConnectivity;