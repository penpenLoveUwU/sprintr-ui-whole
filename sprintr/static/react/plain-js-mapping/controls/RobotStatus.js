import { Box, CircularProgress, Grid, LinearProgress, linearProgressClasses, Paper, styled, Typography } from "@mui/material";
import { green, red, yellow } from "@mui/material/colors";
import React from "react";
import { RobotAttributeClass, useRobotAttributeQuery, useRobotStatusQuery } from "../api";
const batteryLevelColors = {
  red: red[500],
  yellow: yellow[700],
  green: green[500]
};
const getBatteryColor = level => {
  if (level > 60) {
    return "green";
  }
  if (level > 20) {
    return "yellow";
  }
  return "red";
};
const BatteryProgress = styled(LinearProgress)(({
  theme,
  value
}) => {
  return {
    marginTop: -theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === "light" ? 200 : 700]
    },
    [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: getBatteryColor(value ?? 0)
    }
  };
});
const RobotStatus = () => {
  const {
    data: status,
    isLoading: isStatusLoading,
    isError: isStatusError
  } = useRobotStatusQuery();
  const {
    data: batteries,
    isLoading: isBatteryLoading,
    isError: isBatteryError
  } = useRobotAttributeQuery(RobotAttributeClass.BatteryState);
  const isLoading = isStatusLoading || isBatteryLoading;
  const stateDetails = React.useMemo(() => {
    if (isStatusError) {
      return /*#__PURE__*/React.createElement(Typography, {
        color: "error"
      }, "Error loading robot state");
    }
    if (isLoading) {
      return /*#__PURE__*/React.createElement(Grid, {
        item: true
      }, /*#__PURE__*/React.createElement(CircularProgress, {
        color: "inherit",
        size: "1rem"
      }));
    }
    if (status === undefined) {
      return null;
    }
    return /*#__PURE__*/React.createElement(Typography, {
      variant: "overline",
      color: "textSecondary"
    }, status.value, status.flag !== "none" ? /*#__PURE__*/React.createElement(React.Fragment, null, " \u2013 ", status.flag) : "");
  }, [isStatusError, status, isLoading]);
  const batteriesDetails = React.useMemo(() => {
    if (isBatteryError) {
      return /*#__PURE__*/React.createElement(Typography, {
        color: "error"
      }, "Error loading battery state");
    }
    if (batteries === undefined) {
      return null;
    }
    if (batteries.length === 0) {
      return /*#__PURE__*/React.createElement(Typography, {
        color: "textSecondary"
      }, "No batteries found");
    }
    return batteries.map((battery, index) => {
      return /*#__PURE__*/React.createElement(Grid, {
        container: true,
        key: index.toString(),
        direction: "column",
        spacing: 1
      }, /*#__PURE__*/React.createElement(Grid, {
        item: true,
        container: true,
        spacing: 1
      }), /*#__PURE__*/React.createElement(Grid, {
        item: true
      }, /*#__PURE__*/React.createElement(Box, {
        display: "flex",
        alignItems: "center"
      }, /*#__PURE__*/React.createElement(Box, {
        width: "100%",
        mr: 1
      }, /*#__PURE__*/React.createElement(BatteryProgress, {
        value: battery.level,
        variant: "determinate"
      })), /*#__PURE__*/React.createElement(Typography, {
        variant: "overline",
        style: {
          color: batteryLevelColors[getBatteryColor(battery.level)]
        }
      }, Math.round(battery.level), "%"))));
    });
  }, [batteries, isBatteryError]);
  return /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Paper, null, /*#__PURE__*/React.createElement(Box, {
    p: 1
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 2,
    direction: "column"
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    container: true
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true,
    container: true,
    direction: "column",
    sx: {
      paddingLeft: "8px"
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "subtitle2"
  }, "State")), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    style: {
      maxHeight: "2rem"
    }
  }, stateDetails)), batteries !== undefined && batteries.length > 0 && /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: true,
    container: true,
    direction: "column",
    sx: {
      paddingRight: "8px"
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "subtitle2"
  }, "Battery")), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, batteriesDetails)))))));
};
export default RobotStatus;