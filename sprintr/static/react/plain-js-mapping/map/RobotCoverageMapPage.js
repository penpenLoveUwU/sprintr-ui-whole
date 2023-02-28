import { Box, Button, CircularProgress, styled, Typography, useTheme } from "@mui/material";
import { useRobotMapQuery, useRobotStatusQuery } from "../api";
import RobotCoverageMap from "./RobotCoverageMap";
import { RobotCoverageMapHelp } from "./res/RobotCoverageMapHelp";
const Container = styled(Box)({
  flex: "1",
  height: "100%",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center"
});
const RobotCoverageMapPage = () => {
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
  return /*#__PURE__*/React.createElement(RobotCoverageMap, {
    rawMap: mapData,
    theme: theme,
    helpText: RobotCoverageMapHelp
  });
};
export default RobotCoverageMapPage;