import React from "react";
import { Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { Capability, useTotalStatisticsQuery } from "../api";
import { useCapabilitiesSupported } from "../CapabilitiesProvider";
import PaperContainer from "../components/PaperContainer";
import LoadingFade from "../components/LoadingFade";
import { adjustColorBrightness, getFriendlyStatName, getHumanReadableStatValue } from "../utils";
import { History as HistoryIcon } from "@mui/icons-material";
import { statisticsAchievements } from "./res/StatisticsAchievements";
import { useIsMobileView } from "../hooks";
const achievementColors = {
  light: {
    foreground: "#ffb922",
    text: "#ffb922",
    background: "#002990"
  },
  dark: {
    foreground: "",
    text: "",
    background: ""
  },
  noAchievement: {
    foreground: "#191919",
    text: "#191919",
    background: "#333333"
  }
};
achievementColors.dark = {
  foreground: adjustColorBrightness(achievementColors.light.foreground, -20),
  text: adjustColorBrightness(achievementColors.light.foreground, -5),
  background: adjustColorBrightness(achievementColors.light.background, -20)
};
const StatisticsGridItem = ({
  dataPoint
}) => {
  const [overviewDialogOpen, setOverviewDialogOpen] = React.useState(false);
  const mobileView = useIsMobileView();
  const mostRecentAchievement = statisticsAchievements[dataPoint.type].find(achievement => {
    return dataPoint.value >= achievement.value;
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 12,
    sm: 4,
    style: {
      userSelect: "none"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    style: {
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    style: {
      marginLeft: "auto",
      marginRight: "auto"
    }
  }, /*#__PURE__*/React.createElement(CardMedia, {
    component: StatisticsAward,
    achievement: mostRecentAchievement
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    style: {
      alignSelf: "flex-end",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(CardContent, {
    style: {
      paddingBottom: "16px"
    }
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "body1",
    mb: 2
  }, mostRecentAchievement?.description || "No achievement yet"), /*#__PURE__*/React.createElement(Grid, {
    container: true
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    style: {
      flexGrow: 3
    }
  }, /*#__PURE__*/React.createElement(Typography, {
    sx: {
      fontSize: 14
    },
    color: "text.secondary",
    gutterBottom: true
  }, getFriendlyStatName(dataPoint)), /*#__PURE__*/React.createElement(Typography, {
    variant: "h5",
    component: "div"
  }, getHumanReadableStatValue(dataPoint))), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    style: {
      marginTop: "auto"
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    onClick: () => {
      setOverviewDialogOpen(true);
    },
    title: "Achievement Overview"
  }, /*#__PURE__*/React.createElement(HistoryIcon, null))))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: overviewDialogOpen,
    onClose: () => {
      setOverviewDialogOpen(false);
    },
    fullScreen: mobileView
  }, /*#__PURE__*/React.createElement(DialogTitle, {
    style: {
      userSelect: "none"
    }
  }, getFriendlyStatName(dataPoint), " Achievements"), /*#__PURE__*/React.createElement(DialogContent, {
    dividers: true
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 2
  }, [...statisticsAchievements[dataPoint.type]].reverse().map((achievement, i) => {
    const notYetAchievedAchievement = {
      value: achievement.value,
      title: "?",
      description: "Not yet achieved"
    };
    const achievementToDisplay = dataPoint.value >= achievement.value ? achievement : notYetAchievedAchievement;
    return /*#__PURE__*/React.createElement(Grid, {
      item: true,
      xs: 12,
      sm: 4,
      style: {
        userSelect: "none"
      },
      key: `${dataPoint.type}_overview_${i}`
    }, /*#__PURE__*/React.createElement(Card, {
      style: {
        height: "100%"
      }
    }, /*#__PURE__*/React.createElement(Grid, {
      container: true,
      style: {
        height: "100%"
      }
    }, /*#__PURE__*/React.createElement(Grid, {
      item: true,
      style: {
        marginLeft: "auto",
        marginRight: "auto"
      }
    }, /*#__PURE__*/React.createElement(CardMedia, {
      component: StatisticsAward,
      achievement: achievementToDisplay,
      achieved: achievementToDisplay === achievement
    })), /*#__PURE__*/React.createElement(Grid, {
      item: true,
      style: {
        alignSelf: "flex-end",
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement(CardContent, {
      style: {
        paddingBottom: "16px"
      }
    }, /*#__PURE__*/React.createElement(Typography, {
      variant: "body1",
      mb: 2
    }, achievementToDisplay.description))))));
  }))), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      setOverviewDialogOpen(false);
    }
  }, "Close"))));
};
const StatisticsAward = ({
  achievement,
  achieved
}) => {
  const theme = useTheme();
  let foregroundColor;
  let textColor;
  let backgroundColor;
  let ribbonFill;
  if (achievement && achieved !== false) {
    ribbonFill = "url(#ribbonGradient)";
    if (theme.palette.mode === "light") {
      foregroundColor = achievementColors.light.foreground;
      textColor = achievementColors.light.text;
      backgroundColor = achievementColors.light.background;
    } else {
      foregroundColor = achievementColors.dark.foreground;
      textColor = achievementColors.dark.text;
      backgroundColor = achievementColors.dark.background;
    }
  } else {
    foregroundColor = achievementColors.noAchievement.foreground;
    textColor = achievementColors.noAchievement.text;
    backgroundColor = achievementColors.noAchievement.background;
    ribbonFill = "url(#ribbonGradientDisabled)";
  }
  let fontSize = 14;
  let textAnchorY = 54;
  if (achievement?.title) {
    if (achievement.title.length >= 14) {
      fontSize = 8;
      textAnchorY = 52.5;
    } else if (achievement.title.length >= 12) {
      fontSize = 10;
      textAnchorY = 53;
    } else if (achievement.title.length >= 10) {
      fontSize = 12;
      textAnchorY = 53.5;
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "1rem",
      userSelect: "none"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "300",
    height: "360",
    viewBox: "0 0 100 120",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      width: "100%",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "ribbonGradient",
    x1: "0%",
    y1: "0%",
    x2: "0%",
    y2: "100%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    style: {
      stopColor: "#000934",
      stopOpacity: 1
    }
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "80%",
    style: {
      stopColor: "#000b67",
      stopOpacity: 1
    }
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "ribbonGradientDisabled",
    x1: "0%",
    y1: "-50%",
    x2: "0%",
    y2: "100%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    style: {
      stopColor: "#111111",
      stopOpacity: 1
    }
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "80%",
    style: {
      stopColor: "#222222",
      stopOpacity: 1
    }
  }))), /*#__PURE__*/React.createElement("g", {
    transform: "matrix(.97692 0 0 .96031 -23.268 -4.3406)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m45.608 69.55h58.738v59.93l-29.369-15.115-29.369 15.115z",
    fill: ribbonFill
  }), /*#__PURE__*/React.createElement("path", {
    d: "m47.655 69.55h54.69v56.233l-27.345-14.182-27.345 14.182z",
    fill: "none",
    stroke: foregroundColor,
    strokeWidth: ".93469"
  })), /*#__PURE__*/React.createElement("g", {
    transform: "matrix(.97692 0 0 .97692 -23.269 -5.3921)",
    stroke: foregroundColor
  }, /*#__PURE__*/React.createElement("path", {
    d: "m75 106.08-8.67-5.792-10.226 2.033-5.793-8.668-10.226-2.035-2.035-10.226-8.669-5.793 2.033-10.226-5.792-8.67 5.792-8.67-2.033-10.226 8.669-5.793 2.035-10.226 10.226-2.035 5.793-8.669 10.226 2.033 8.67-5.792 8.67 5.792 10.226-2.033 5.793 8.669 10.226 2.035 2.035 10.226 8.668 5.793-2.033 10.226 5.792 8.67-5.792 8.67 2.033 10.226-8.668 5.793-2.035 10.226-10.226 2.035-5.793 8.668-10.226-2.033z",
    fill: backgroundColor,
    strokeWidth: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m75 101.51-7.8677-5.2561-9.2797 1.8449-5.2569-7.866-9.2797-1.8467-1.8467-9.2798-7.8668-5.257 1.8449-9.2798-5.256-7.8678 5.256-7.8678-1.8449-9.2798 7.8668-5.257 1.8467-9.2798 9.2797-1.8467 5.2569-7.8669 9.2797 1.8449 7.8677-5.2561 7.8677 5.2561 9.2797-1.8449 5.2569 7.8669 9.2797 1.8467 1.8467 9.2798 7.8659 5.257-1.8449 9.2798 5.256 7.8678-5.256 7.8678 1.8449 9.2798-7.8659 5.257-1.8467 9.2798-9.2797 1.8467-5.2569 7.866-9.2797-1.8449z",
    fill: "none",
    strokeWidth: ".90747"
  })), /*#__PURE__*/React.createElement("text", {
    x: "50",
    y: "50"
  }, /*#__PURE__*/React.createElement("tspan", {
    x: "50",
    y: textAnchorY,
    fill: textColor,
    fontSize: fontSize,
    textAnchor: "middle"
  }, achievement?.title))));
};
const TotalStatisticsInternal = () => {
  const {
    data: totalStatisticsState,
    isLoading: totalStatisticsLoading,
    isError: totalStatisticsError
  } = useTotalStatisticsQuery();
  return React.useMemo(() => {
    if (totalStatisticsLoading) {
      return /*#__PURE__*/React.createElement(LoadingFade, null);
    }
    if (totalStatisticsError || !totalStatisticsState) {
      return /*#__PURE__*/React.createElement(Typography, {
        color: "error"
      }, "Error loading statistics");
    }
    const statistics = totalStatisticsState.sort((a, b) => {
      const aMapped = SORT_ORDER[a.type] ?? 10;
      const bMapped = SORT_ORDER[b.type] ?? 10;
      if (aMapped < bMapped) {
        return -1;
      } else if (bMapped < aMapped) {
        return 1;
      } else {
        return 0;
      }
    }).map(dataPoint => {
      return /*#__PURE__*/React.createElement(StatisticsGridItem, {
        dataPoint: dataPoint,
        key: dataPoint.type
      });
    });
    return /*#__PURE__*/React.createElement(Grid, {
      container: true,
      spacing: 2
    }, statistics);
  }, [totalStatisticsError, totalStatisticsLoading, totalStatisticsState]);
};
const TotalStatistics = () => {
  const [supported] = useCapabilitiesSupported(Capability.TotalStatistics);
  return /*#__PURE__*/React.createElement(PaperContainer, null, supported ? /*#__PURE__*/React.createElement(TotalStatisticsInternal, null) : /*#__PURE__*/React.createElement(Typography, {
    color: "error"
  }, "This robot does not support total statistics."));
};
const SORT_ORDER = {
  "time": 1,
  "area": 2,
  "count": 3
};
export default TotalStatistics;