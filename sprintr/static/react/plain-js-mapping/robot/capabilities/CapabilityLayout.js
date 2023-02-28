import React from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import ReloadableCard from "../../components/ReloadableCard";
const useWideLayout = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up("md"));
};
export const CapabilityContainer = ({
  children
}) => {
  const wideLayout = useWideLayout();
  if (wideLayout && children) {
    return /*#__PURE__*/React.createElement(Masonry, {
      columns: 3,
      spacing: 2
    }, children);
  } else {
    return /*#__PURE__*/React.createElement(Grid, {
      container: true,
      spacing: 2
    }, children);
  }
};
export const CapabilityItem = ({
  children,
  title,
  onReload,
  loading = false,
  helpText
}) => {
  const wideLayout = useWideLayout();
  const content = /*#__PURE__*/React.createElement(ReloadableCard, {
    title: title,
    onReload: onReload,
    loading: loading,
    boxShadow: 3,
    helpText: helpText
  }, children);
  if (wideLayout) {
    return content;
  } else {
    return /*#__PURE__*/React.createElement(Grid, {
      item: true,
      xs: 12,
      sm: 6,
      md: 4
    }, content);
  }
};