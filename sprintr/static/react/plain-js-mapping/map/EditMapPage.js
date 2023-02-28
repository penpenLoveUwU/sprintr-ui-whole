import { Box, Button, CircularProgress, styled, Typography, useTheme } from "@mui/material";
import { Capability, useRobotMapQuery, useRobotStatusQuery } from "../api";
import { useCapabilitiesSupported } from "../CapabilitiesProvider";
import EditMap from "./EditMap";
import { SegmentEditHelp } from "./res/SegmentEditHelp";
import { VirtualRestrictionEditHelp } from "./res/VirtualRestrictionEditHelp";
import { useSnackbar } from "notistack";
const Container = styled(Box)({
  flex: "1",
  height: "100%",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center"
});
const EditMapPage = props => {
  const {
    data: mapData,
    isLoading: mapIsLoading,
    isError: mapLoadError,
    refetch: refetchMap
  } = useRobotMapQuery();
  const {
    data: robotStatus,
    isLoading: robotStatusLoading
  } = useRobotStatusQuery();
  const [combinedVirtualRestrictionsCapabilitySupported, mapSegmentEditCapabilitySupported, mapSegmentRenameCapabilitySupported] = useCapabilitiesSupported(Capability.CombinedVirtualRestrictions, Capability.MapSegmentEdit, Capability.MapSegmentRename);
  const theme = useTheme();
  const {
    enqueueSnackbar
  } = useSnackbar();
  let helpText = "";
  if (props.mode === "segments") {
    helpText = SegmentEditHelp;
  } else if (props.mode === "virtual_restrictions") {
    helpText = VirtualRestrictionEditHelp;
  }
  if (mapLoadError) {
    return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Typography, {
      color: "error"
    }, "Error loading map data"), /*#__PURE__*/React.createElement(Box, {
      m: 1
    }), /*#__PURE__*/React.createElement(Button, {
      color: "primary",
      variant: "contained",
      onClick: () => {
        return refetchMap();
      }
    }, "Retry"));
  }
  if (!mapData && mapIsLoading || !robotStatus && robotStatusLoading) {
    return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(CircularProgress, null));
  }
  if (!mapData) {
    return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Typography, {
      align: "center"
    }, "No map data"), ";");
  }
  if (!robotStatus) {
    return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Typography, {
      align: "center"
    }, "No robot status"), ";");
  }
  return /*#__PURE__*/React.createElement(EditMap, {
    rawMap: mapData,
    theme: theme,
    mode: props.mode,
    helpText: helpText,
    robotStatus: robotStatus,
    enqueueSnackbar: enqueueSnackbar,
    supportedCapabilities: {
      [Capability.CombinedVirtualRestrictions]: combinedVirtualRestrictionsCapabilitySupported,
      [Capability.MapSegmentEdit]: mapSegmentEditCapabilitySupported,
      [Capability.MapSegmentRename]: mapSegmentRenameCapabilitySupported
    }
  });
};
export default EditMapPage;