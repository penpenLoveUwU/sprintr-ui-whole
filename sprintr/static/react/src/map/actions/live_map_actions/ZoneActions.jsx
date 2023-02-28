import { Capability, useCleanTemporaryZonesMutation, useRobotStatusQuery, useZonePropertiesQuery, } from "../../../api";
import React from "react";
import { Box, Button, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useLongPress } from "use-long-press";
import { ActionButton } from "../../Styled";
import IntegrationHelpDialog from "../../../components/IntegrationHelpDialog";
import { IterationsIcon } from "../../../assets/icon_components/IterationsIcon";
const ZoneActions = (props) => {
    const { zones, convertPixelCoordinatesToCMSpace, onClear, onAdd } = props;
    const [iterationCount, setIterationCount] = React.useState(1);
    const [integrationHelpDialogOpen, setIntegrationHelpDialogOpen] = React.useState(false);
    const [integrationHelpDialogPayload, setIntegrationHelpDialogPayload] = React.useState("");
    const { data: status } = useRobotStatusQuery((state) => {
        return state.value;
    });
    const { mutate: cleanTemporaryZones, isLoading: cleanTemporaryZonesIsExecuting } = useCleanTemporaryZonesMutation({
        onSuccess: onClear,
    });
    const { data: zoneProperties, isLoading: zonePropertiesLoading, isError: zonePropertiesLoadError, refetch: refetchZoneProperties, } = useZonePropertiesQuery();
    const canClean = status === "idle" || status === "docked" || status === "paused" || status === "returning" || status === "error";
    const didSelectZones = zones.length > 0;
    const zonesForAPI = React.useMemo(() => {
        return zones.map((zone) => {
            return {
                iterations: iterationCount,
                points: {
                    pA: convertPixelCoordinatesToCMSpace({
                        x: zone.x0,
                        y: zone.y0
                    }),
                    pB: convertPixelCoordinatesToCMSpace({
                        x: zone.x1,
                        y: zone.y0
                    }),
                    pC: convertPixelCoordinatesToCMSpace({
                        x: zone.x1,
                        y: zone.y1
                    }),
                    pD: convertPixelCoordinatesToCMSpace({
                        x: zone.x0,
                        y: zone.y1
                    })
                }
            };
        });
    }, [zones, iterationCount, convertPixelCoordinatesToCMSpace]);
    const handleClick = React.useCallback(() => {
        if (!didSelectZones || !canClean) {
            return;
        }
        cleanTemporaryZones(zonesForAPI);
    }, [canClean, didSelectZones, zonesForAPI, cleanTemporaryZones]);
    const handleLongClick = React.useCallback(() => {
        setIntegrationHelpDialogPayload(JSON.stringify({
            action: "clean",
            zones: zonesForAPI
        }, null, 2));
        setIntegrationHelpDialogOpen(true);
    }, [zonesForAPI]);
    const setupClickHandlers = useLongPress(handleLongClick, {
        onCancel: (event) => {
            handleClick();
        },
        threshold: 500,
        captureEvent: true,
        cancelOnMovement: true,
    });
    const handleIterationToggle = React.useCallback(() => {
        if (zoneProperties) {
            setIterationCount(iterationCount % zoneProperties.iterationCount.max + 1);
        }
    }, [iterationCount, setIterationCount, zoneProperties]);
    if (zonePropertiesLoadError) {
        return (<Container>
                <Typography color="error">
                    Error loading {Capability.ZoneCleaning} properties
                </Typography>
                <Box m={1}/>
                <Button color="primary" variant="contained" onClick={() => {
                return refetchZoneProperties();
            }}>
                    Retry
                </Button>
            </Container>);
    }
    if (zoneProperties === undefined && zonePropertiesLoading) {
        return (<Container>
                <CircularProgress />
            </Container>);
    }
    if (zoneProperties === undefined) {
        return (<Container>
                <Typography align="center">
                    No {Capability.ZoneCleaning} properties
                </Typography>
                ;
            </Container>);
    }
    return (<>
            <Grid container spacing={1} direction="row-reverse" flexWrap="wrap-reverse">
                <Grid item>
                    <ActionButton disabled={!didSelectZones || cleanTemporaryZonesIsExecuting || !canClean} color="inherit" size="medium" variant="extended" {...setupClickHandlers()}>
                        Clean {zones.length} zones
                        {cleanTemporaryZonesIsExecuting && (<CircularProgress color="inherit" size={18} style={{ marginLeft: 10 }}/>)}
                    </ActionButton>
                </Grid>
                {zoneProperties.iterationCount.max > 1 &&
            <Grid item>
                        <ActionButton color="inherit" size="medium" variant="extended" style={{
                    textTransform: "initial"
                }} onClick={handleIterationToggle} title="Iteration Count">
                            <IterationsIcon iterationCount={iterationCount}/>
                        </ActionButton>
                    </Grid>}
                <Grid item>
                    <ActionButton disabled={zones.length === zoneProperties.zoneCount.max || cleanTemporaryZonesIsExecuting} color="inherit" size="medium" variant="extended" onClick={onAdd}>
                        Add ({zones.length}/{zoneProperties.zoneCount.max})
                    </ActionButton>
                </Grid>
                {didSelectZones &&
            <Grid item>
                        <ActionButton disabled={cleanTemporaryZonesIsExecuting} color="inherit" size="medium" variant="extended" onClick={onClear}>
                            Clear
                        </ActionButton>
                    </Grid>}
                {(didSelectZones && !canClean) &&
            <Grid item>
                        <Typography variant="caption" color="textSecondary">
                            Cannot start zone cleaning while the robot is busy
                        </Typography>
                    </Grid>}
            </Grid>
            <IntegrationHelpDialog dialogOpen={integrationHelpDialogOpen} setDialogOpen={(open) => {
            setIntegrationHelpDialogOpen(open);
        }} coordinatesWarning={true} helperText={"To start a cleanup of the currently drawn zones with the currently configured parameters via MQTT or REST, simply use this payload."} payload={integrationHelpDialogPayload}/>
        </>);
};
export default ZoneActions;
