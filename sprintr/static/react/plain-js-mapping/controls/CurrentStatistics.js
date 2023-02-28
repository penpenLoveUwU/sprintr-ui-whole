import { useCurrentStatisticsQuery } from "../api";
import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { Equalizer as StatisticsIcon } from "@mui/icons-material";
import React from "react";
import LoadingFade from "../components/LoadingFade";
import { getFriendlyStatName, getHumanReadableStatValue } from "../utils";
const CurrentStatistics = () => {
  const {
    data: currentStatistics,
    isLoading: statisticsLoading,
    isError: statisticsLoadError
  } = useCurrentStatisticsQuery();
  const body = React.useMemo(() => {
    if (statisticsLoading) {
      return /*#__PURE__*/React.createElement(Grid, {
        item: true
      }, /*#__PURE__*/React.createElement(CircularProgress, {
        size: 20
      }));
    }
    if (statisticsLoadError || !Array.isArray(currentStatistics)) {
      return /*#__PURE__*/React.createElement(Paper, null, /*#__PURE__*/React.createElement(Box, {
        p: 1
      }, /*#__PURE__*/React.createElement(Typography, {
        color: "error"
      }, "Error loading current statistics")));
    }
    return currentStatistics.map((stat, i) => {
      return /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: true,
        container: true,
        direction: "column",
        key: i
      }, /*#__PURE__*/React.createElement(Grid, {
        item: true
      }, /*#__PURE__*/React.createElement(Typography, {
        variant: "subtitle2"
      }, getFriendlyStatName(stat))), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        style: {
          maxHeight: "2rem"
        }
      }, getHumanReadableStatValue(stat)));
    });
  }, [statisticsLoading, statisticsLoadError, currentStatistics]);
  return /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Paper, null, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "column"
  }, /*#__PURE__*/React.createElement(Box, {
    px: 2,
    pt: 1
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    container: true,
    alignItems: "center",
    spacing: 1
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(StatisticsIcon, null)), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "subtitle1"
  }, "Current Statistics")), /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(LoadingFade, {
    in: statisticsLoading,
    transitionDelay: statisticsLoading ? "500ms" : "0ms",
    size: 20
  }))), /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "row",
    sx: {
      paddingBottom: "8px",
      paddingTop: "8px",
      maxHeight: "4em"
    }
  }, body)))));
};
export default CurrentStatistics;