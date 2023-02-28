import { Box, Grid, styled } from "@mui/material";
import { useIsMobileView } from "./hooks";
import { FullHeightGrid } from "./components/FullHeightGrid";
import LiveMapPage from "./map/LiveMapPage";
import MobileControls from "./controls/MobileControls";
import React from "react";
const ScrollableGrid = styled(Grid)({
    overflow: "auto",
});
const HomePage = () => {
    const mobileView = useIsMobileView();
    const [mobileControlsOpen, setMobileControlsOpen] = React.useState(false);
    if (mobileView) {
        return (<Box sx={{
                height: "100%",
                width: "100%",
                overflow: "hidden"
            }}>
                <Box sx={{
                height: "calc(100% - 68px)",
                display: mobileControlsOpen ? "none" : "inherit"
            }}>
                    <LiveMapPage />
                </Box>
                <Box sx={{
                height: "5%",
                display: mobileControlsOpen ? "inherit" : "none"
            }}>
                    &nbsp;
                </Box>

                <MobileControls open={mobileControlsOpen} setOpen={setMobileControlsOpen}/>
            </Box>);
    }
    return (<FullHeightGrid container direction="row" justifyContent="space-evenly">
            <Grid item sm md lg xl>
                <LiveMapPage />
            </Grid>
            {/* <Divider orientation="vertical"/>
        <ScrollableGrid item sm={4} md={4} lg={4} xl={3}>
            <Box m={1}>
                <ControlsBody/>
            </Box>
        </ScrollableGrid> */}
        </FullHeightGrid>);
};
export default HomePage;
