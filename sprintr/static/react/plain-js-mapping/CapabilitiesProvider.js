import { Backdrop, Button, styled, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { useCapabilitiesQuery } from "./api";
import ValetudoSplash from "./components/ValetudoSplash";
const StyledBackdrop = styled(Backdrop)(({
  theme
}) => {
  return {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    display: "flex",
    flexFlow: "column"
  };
});
const Context = /*#__PURE__*/React.createContext([]);
const CapabilitiesProvider = props => {
  const {
    children
  } = props;
  const {
    isError: capabilitiesLoadError,
    isLoading: capabilitiesLoading,
    data: capabilities,
    refetch: refetchCapabilities
  } = useCapabilitiesQuery();
  const {
    enqueueSnackbar,
    closeSnackbar
  } = useSnackbar();
  const snackbarKey = React.useRef();
  // console.log("capabilitiesLoadError: " + capabilitiesLoadError);
  React.useEffect(() => {
    if (capabilitiesLoadError || snackbarKey.current === undefined) {
      return;
    }
    closeSnackbar(snackbarKey.current);
  }, [closeSnackbar, capabilitiesLoadError]);
  React.useEffect(() => {
    if (!capabilitiesLoadError) {
      return;
    }
    const SnackbarAction = () => {
      return /*#__PURE__*/React.createElement(Button, {
        onClick: () => {
          refetchCapabilities({
            throwOnError: true
          }).then(() => {
            return enqueueSnackbar("Successfully loaded capabilities!", {
              variant: "success"
            });
          });
        }
      }, "Retry");
    };
    if (snackbarKey.current) {
      closeSnackbar(snackbarKey.current);
    }
    snackbarKey.current = enqueueSnackbar("Error while loading capabilities", {
      variant: "error",
      action: SnackbarAction,
      persist: true
    });
  }, [closeSnackbar, enqueueSnackbar, capabilitiesLoadError, refetchCapabilities]);
  return /*#__PURE__*/React.createElement(Context.Provider, {
    value: capabilities ?? []
  }, /*#__PURE__*/React.createElement(StyledBackdrop, {
    open: capabilitiesLoading,
    style: {
      transitionDelay: capabilitiesLoading ? "800ms" : "0ms"
    },
    unmountOnExit: true
  }, /*#__PURE__*/React.createElement(ValetudoSplash, null), /*#__PURE__*/React.createElement(Typography, {
    variant: "caption"
  }, "Loading capabilities...")), capabilities && children);
};
export const useCapabilitiesSupported = (...capabilities) => {
  const supportedCapabilities = React.useContext(Context);
  return capabilities.map(capability => {
    return supportedCapabilities.includes(capability);
  });
};
export default CapabilitiesProvider;