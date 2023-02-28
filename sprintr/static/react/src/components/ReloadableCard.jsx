import { Card, CardContent, Divider, Grid, IconButton, styled, Typography } from "@mui/material";
import React from "react";
import { Help as HelpIcon, Refresh as RefreshIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import HelpDialog from "./HelpDialog";
const TopRightIconButton = styled(LoadingButton)(({ theme }) => {
    return {
        marginTop: -theme.spacing(1),
        minWidth: 0
    };
});
const ReloadableCard = ({ title, onReload, reloadButton, children, loading = false, divider = true, boxShadow, helpText, }) => {
    const [helpDialogOpen, setHelpDialogOpen] = React.useState(false);
    return (<>
            <Card sx={{ boxShadow: boxShadow }}>
                <CardContent>
                    <Grid container spacing={4} alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h6" gutterBottom>
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container>
                                {helpText && (<Grid item style={{ marginTop: "-0.125rem" }} //:(
        >
                                        <IconButton onClick={() => {
                return setHelpDialogOpen(true);
            }} title="Help">
                                            <HelpIcon />
                                        </IconButton>
                                    </Grid>)}
                                {reloadButton || (onReload && (<Grid item>
                                        <TopRightIconButton loading={loading} onClick={onReload} title="Refresh">
                                            <RefreshIcon />
                                        </TopRightIconButton>
                                    </Grid>))}
                            </Grid>
                        </Grid>
                    </Grid>
                    {divider && <Divider sx={{ mb: 1 }}/>}
                    {children}
                </CardContent>
            </Card>
            {helpText &&
            <HelpDialog dialogOpen={helpDialogOpen} setDialogOpen={(open) => {
                    setHelpDialogOpen(open);
                }} helpText={helpText}/>}
        </>);
};
export default ReloadableCard;
