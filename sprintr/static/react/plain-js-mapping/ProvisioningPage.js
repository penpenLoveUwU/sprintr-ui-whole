import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { ReactComponent as Logo } from "./assets/icons/valetudo_logo_with_name.svg";
import React from "react";
import { Refresh as RefreshIcon, Wifi as SignalWifiUnknown, SignalWifi4Bar, SignalWifi3Bar, SignalWifi2Bar, SignalWifi1Bar, SignalWifi0Bar, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from "@mui/icons-material";
import { Capability, useRobotInformationQuery, useValetudoVersionQuery, useWifiConfigurationMutation, useWifiScanQuery } from "./api";
import LoadingFade from "./components/LoadingFade";
import { LoadingButton } from "@mui/lab";
import ConfirmationDialog from "./components/ConfirmationDialog";
import { useCapabilitiesSupported } from "./CapabilitiesProvider";
const SCAN_RESULT_BATCH_SIZE = 5;
const SignalStrengthIcon = ({
  signal
}) => {
  //Adapted from https://android.stackexchange.com/a/176325 Android 7.1.2
  if (signal === undefined) {
    return /*#__PURE__*/React.createElement(SignalWifiUnknown, null);
  } else if (signal >= -55) {
    return /*#__PURE__*/React.createElement(SignalWifi4Bar, null);
  } else if (signal >= -66) {
    return /*#__PURE__*/React.createElement(SignalWifi3Bar, null);
  } else if (signal >= -77) {
    return /*#__PURE__*/React.createElement(SignalWifi2Bar, null);
  } else if (signal >= -88) {
    return /*#__PURE__*/React.createElement(SignalWifi1Bar, null);
  } else {
    return /*#__PURE__*/React.createElement(SignalWifi0Bar, null);
  }
};
const WifiScan = ({
  onSelect
}) => {
  const {
    data: wifiScanResult,
    isFetching: wifiScanFetching,
    refetch: triggerWifiScan
  } = useWifiScanQuery();
  const [resultLimit, setResultLimit] = React.useState(SCAN_RESULT_BATCH_SIZE);
  const foundNetworkListItems = React.useMemo(() => {
    if (!wifiScanResult) {
      return [];
    }
    const deduplicationMap = new Map();
    wifiScanResult.forEach(network => {
      if (network.details.ssid) {
        deduplicationMap.set(network.details.ssid, {
          ssid: network.details.ssid,
          signal: network.details.signal
        });
      }
    });
    const deduplicatedArray = Array.from(deduplicationMap.values());
    deduplicatedArray.sort((a, b) => {
      return (b.signal ?? -999) - (a.signal ?? -999);
    });
    const items = deduplicatedArray.map(network => {
      return /*#__PURE__*/React.createElement(ListItem, {
        key: network.ssid,
        sx: {
          paddingTop: "0.25rem",
          paddingBottom: "0.25rem"
        }
      }, /*#__PURE__*/React.createElement(ListItemButton, {
        onClick: () => {
          onSelect(network.ssid);
        }
      }, /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(SignalStrengthIcon, {
        signal: network.signal
      })), /*#__PURE__*/React.createElement(ListItemText, {
        primaryTypographyProps: {
          style: {
            fontSize: "0.95rem"
          }
        },
        primary: network.ssid,
        secondary: `${network.signal ?? "unknown"} dBm`
      })));
    });
    if (items.length > 0) {
      if (items.length > resultLimit) {
        return [...items.slice(0, resultLimit), /*#__PURE__*/React.createElement(ListItem, {
          key: "more_results"
        }, /*#__PURE__*/React.createElement(ListItemButton, {
          onClick: () => {
            setResultLimit(resultLimit + SCAN_RESULT_BATCH_SIZE);
          }
        }, /*#__PURE__*/React.createElement(ListItemText, {
          sx: {
            textAlign: "center"
          },
          primary: "See more results"
        })))];
      } else {
        return items;
      }
    } else {
      return [/*#__PURE__*/React.createElement(ListItem, {
        key: "no_networks_found"
      }, /*#__PURE__*/React.createElement(ListItemText, {
        sx: {
          textAlign: "center"
        },
        secondary: "No Wi-Fi networks found or background network scan still active"
      }))];
    }
  }, [wifiScanResult, resultLimit, onSelect]);
  return /*#__PURE__*/React.createElement(List, {
    sx: {
      paddingRight: "1rem",
      wordBreak: "break-word"
    }
  }, foundNetworkListItems, /*#__PURE__*/React.createElement(ListItem, {
    sx: {
      paddingTop: "1rem"
    }
  }, /*#__PURE__*/React.createElement(ListItemButton, {
    onClick: () => {
      if (!wifiScanFetching) {
        triggerWifiScan().catch(() => {
          /* intentional */
        });
      }
    }
  }, /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(RefreshIcon, null)), /*#__PURE__*/React.createElement(ListItemText, {
    primary: wifiScanFetching ? "Scanning..." : "Press to scan for Wi-Fi networks"
  }))));
};
const ProvisioningPage = () => {
  const [wifiScanSupported] = useCapabilitiesSupported(Capability.WifiScan);
  const {
    data: robotInformation,
    isLoading: robotInformationLoading
  } = useRobotInformationQuery();
  const {
    data: version,
    isLoading: versionLoading
  } = useValetudoVersionQuery();
  const {
    mutate: updateWifiConfiguration,
    isLoading: wifiConfigurationUpdating
  } = useWifiConfigurationMutation({
    onSuccess: () => {
      setFinalDialogOpen(true);
    }
  });
  const [newSSID, setNewSSID] = React.useState("");
  const [newPSK, setNewPSK] = React.useState("");
  const [showPasswordAsPlain, setShowPasswordAsPlain] = React.useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = React.useState(false);
  const [finalDialogOpen, setFinalDialogOpen] = React.useState(false);
  const robotInformationElement = React.useMemo(() => {
    if (robotInformationLoading || versionLoading) {
      return /*#__PURE__*/React.createElement(LoadingFade, null);
    }
    if (!robotInformation || !version) {
      return /*#__PURE__*/React.createElement(Typography, {
        color: "error"
      }, "No robot information");
    }
    const items = [["Valetudo", version.release], ["Manufacturer", robotInformation.manufacturer], ["Model", robotInformation.modelName]];
    return /*#__PURE__*/React.createElement(Grid, {
      container: true,
      direction: "row",
      sx: {
        padding: "1rem",
        justifyContent: "space-around"
      }
    }, items.map(([header, body]) => {
      return /*#__PURE__*/React.createElement(Grid, {
        item: true,
        key: header
      }, /*#__PURE__*/React.createElement(Typography, {
        variant: "caption",
        color: "textSecondary"
      }, header), /*#__PURE__*/React.createElement(Typography, {
        variant: "body2"
      }, body));
    }));
  }, [robotInformation, robotInformationLoading, version, versionLoading]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Paper, {
    sx: {
      width: "90%",
      height: "90%",
      margin: "auto",
      marginTop: "5%",
      marginBottom: "5%",
      maxWidth: "600px"
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "row"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Box, {
    px: 2,
    pt: 2,
    pb: 1
  }, /*#__PURE__*/React.createElement(Logo, {
    style: {
      width: "90%",
      marginLeft: "5%"
    }
  })))), /*#__PURE__*/React.createElement(Typography, {
    variant: "body1",
    style: {
      paddingLeft: "1rem",
      paddingRight: "1rem",
      paddingBottom: "1rem"
    },
    align: "center"
  }, "Please join the robot to your Wi-Fi network to start using Valetudo"), /*#__PURE__*/React.createElement(Divider, null), robotInformationElement, /*#__PURE__*/React.createElement(Divider, null), wifiScanSupported && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WifiScan, {
    onSelect: ssid => {
      setNewSSID(ssid);
    }
  }), /*#__PURE__*/React.createElement(Divider, null)), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    container: true,
    sx: {
      padding: "1rem"
    },
    direction: "column"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    sx: {
      paddingLeft: "1rem",
      paddingRight: "1rem"
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "SSID/Wi-Fi name",
    variant: "standard",
    fullWidth: true,
    value: newSSID,
    sx: {
      mb: 1
    },
    onChange: e => {
      setNewSSID(e.target.value);
    }
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    sx: {
      paddingLeft: "1rem",
      paddingRight: "1rem"
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
    }
  }))), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    sx: {
      marginLeft: "auto",
      marginTop: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement(LoadingButton, {
    loading: wifiConfigurationUpdating,
    variant: "outlined",
    color: "success",
    disabled: !newSSID || !newPSK,
    onClick: () => {
      setConfirmationDialogOpen(true);
    }
  }, "Apply")))), /*#__PURE__*/React.createElement(ConfirmationDialog, {
    title: "Apply Wi-Fi configuration?",
    text: "",
    open: confirmationDialogOpen,
    onClose: () => {
      setConfirmationDialogOpen(false);
    },
    onAccept: () => {
      updateWifiConfiguration({
        ssid: newSSID,
        credentials: {
          type: "wpa2_psk",
          typeSpecificSettings: {
            password: newPSK
          }
        }
      });
    }
  }, /*#__PURE__*/React.createElement(DialogContentText, null, "Are you sure you want to apply the Wi-Fi settings?", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("strong", null, "Hint:"), /*#__PURE__*/React.createElement("br", null), "You can always revert back to the integrated Wifi Hotspot. Check the documentation supplied with your robot for instructions on how to do so.")), /*#__PURE__*/React.createElement(Dialog, {
    open: finalDialogOpen
  }, /*#__PURE__*/React.createElement(DialogTitle, null, "Wi-Fi configuration is applying"), /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement(DialogContentText, null, "If you've entered your Wi-Fi credentials correctly, the robot should now join your network.", /*#__PURE__*/React.createElement("br", null), "You can now close this page."))));
};
export default ProvisioningPage;