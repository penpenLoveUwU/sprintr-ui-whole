import { useMediaQuery, useTheme } from "@mui/material";
export const useIsMobileView = () => {
  const theme = useTheme();
  const largeView = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true
  });
  return !largeView;
};