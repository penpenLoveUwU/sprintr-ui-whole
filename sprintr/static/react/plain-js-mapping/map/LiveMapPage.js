import { Box, Button, CircularProgress, styled, Typography, useTheme } from "@mui/material";
import { Capability, useMapSegmentationPropertiesQuery, useRobotMapQuery } from "../api";
import LiveMap from "./LiveMap";
import { useCapabilitiesSupported } from "../CapabilitiesProvider";
const Container = styled(Box)({
  flex: "1",
  height: "100%",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center"
});
const LiveMapPage = props => {
  const {
    data: mapData,
    isLoading: mapIsLoading,
    isError: mapLoadError,
    refetch: refetchMap
  } = useRobotMapQuery();
  const [goToLocationCapabilitySupported, mapSegmentationCapabilitySupported, zoneCleaningCapabilitySupported] = useCapabilitiesSupported(Capability.GoToLocation, Capability.MapSegmentation, Capability.ZoneCleaning, Capability.Locate);
  const {
    data: mapSegmentationProperties,
    isLoading: mapSegmentationPropertiesLoading
  } = useMapSegmentationPropertiesQuery(mapSegmentationCapabilitySupported);
  const theme = useTheme();
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
  if (!mapData && mapIsLoading || mapSegmentationCapabilitySupported && !mapSegmentationProperties && mapSegmentationPropertiesLoading) {
    return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(CircularProgress, null));
  }
  if (!mapData) {
    return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Typography, {
      align: "center"
    }, "No map data"), ";");
  }
  return /*#__PURE__*/React.createElement(LiveMap, {
    rawMap: mapData,
    theme: theme,
    trackSegmentSelectionOrder: mapSegmentationProperties ? mapSegmentationProperties.customOrderSupport : false,
    supportedCapabilities: {
      [Capability.MapSegmentation]: mapSegmentationCapabilitySupported,
      [Capability.ZoneCleaning]: zoneCleaningCapabilitySupported,
      [Capability.GoToLocation]: goToLocationCapabilitySupported
    }
  });
};
export default LiveMapPage;