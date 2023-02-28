import { Divider, Grid, IconButton, styled, Typography } from "@mui/material";
import React from "react";
import { Help as HelpIcon, Refresh as RefreshIcon, } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import HelpDialog from "./HelpDialog";
const TopRightRefreshButton = styled(LoadingButton)(({ theme }) => {
    return {
        minWidth: 0
    };
});
const DetailPageHeaderRow = ({ title, icon, helpText, onRefreshClick, isRefreshing }) => {
    const [helpDialogOpen, setHelpDialogOpen] = React.useState(false);
    return (<>
            <Grid item container alignItems="center" spacing={1} justifyContent="space-between">
                <Grid item style={{ display: "flex" }}>
                    <Grid item style={{ paddingRight: "8px" }}>
                        {icon}
                    </Grid>
                    <Grid item>
                        <Typography>{title}</Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container>
                        {helpText !== undefined &&
            <>
                                <Grid item style={{ marginTop: "-0.125rem" }} //:(
            >
                                    <IconButton onClick={() => {
                    return setHelpDialogOpen(true);
                }} title="Help">
                                        <HelpIcon />
                                    </IconButton>
                                </Grid>

                                <HelpDialog dialogOpen={helpDialogOpen} setDialogOpen={(open) => {
                    setHelpDialogOpen(open);
                }} helpText={helpText}/>
                            </>}

                        {onRefreshClick !== undefined &&
            <Grid item>
                                <TopRightRefreshButton loading={isRefreshing ?? false} onClick={onRefreshClick} title="Refresh">
                                    <RefreshIcon />
                                </TopRightRefreshButton>
                            </Grid>}
                    </Grid>
                </Grid>
            </Grid>
            <Divider sx={{ mt: 1 }}/>
        </>);
};
export default DetailPageHeaderRow;
