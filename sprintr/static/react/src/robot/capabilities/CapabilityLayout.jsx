import React from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import ReloadableCard from "../../components/ReloadableCard";
const useWideLayout = () => {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.up("md"));
};
export const CapabilityContainer = ({ children }) => {
    const wideLayout = useWideLayout();
    if (wideLayout && children) {
        return (<Masonry columns={3} spacing={2}>
                {children}
            </Masonry>);
    }
    else {
        return (<Grid container spacing={2}>
                {children}
            </Grid>);
    }
};
export const CapabilityItem = ({ children, title, onReload, loading = false, helpText }) => {
    const wideLayout = useWideLayout();
    const content = (<ReloadableCard title={title} onReload={onReload} loading={loading} boxShadow={3} helpText={helpText}>
            {children}
        </ReloadableCard>);
    if (wideLayout) {
        return content;
    }
    else {
        return (<Grid item xs={12} sm={6} md={4}>
                {content}
            </Grid>);
    }
};
