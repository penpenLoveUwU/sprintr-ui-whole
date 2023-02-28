import { Capability, useCleanSegmentsMutation, useMapSegmentationPropertiesQuery, useRobotStatusQuery } from "../../../api";
import React from "react";
import { Box, Button, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { ActionButton } from "../../Styled";
import IntegrationHelpDialog from "../../../components/IntegrationHelpDialog";
import { useLongPress } from "use-long-press";
import { IterationsIcon } from "../../../assets/icon_components/IterationsIcon";
const SegmentActions = (props) => {
    const { segments, onClear } = props;
    const [iterationCount, setIterationCount] = React.useState(1);
    const [integrationHelpDialogOpen, setIntegrationHelpDialogOpen] = React.useState(false);
    const [integrationHelpDialogPayload, setIntegrationHelpDialogPayload] = React.useState("");
    const { data: mapSegmentationProperties, isLoading: mapSegmentationPropertiesLoading, isError: mapSegmentationPropertiesLoadError, refetch: refetchMapSegmentationProperties, } = useMapSegmentationPropertiesQuery();
    const { data: status } = useRobotStatusQuery((state) => {
        return state.value;
    });
    const { mutate: executeSegmentAction, isLoading: segmentActionExecuting } = useCleanSegmentsMutation({
        onSuccess: onClear,
    });
    const canClean = status === "idle" || status === "docked" || status === "paused" || status === "returning" || status === "error";
    const didSelectSegments = segments.length > 0;
    const handleClick = React.useCallback(() => {
        if (!didSelectSegments || !canClean) {
            return;
        }
        executeSegmentAction({
            segment_ids: segments,
            iterations: iterationCount,
            customOrder: mapSegmentationProperties?.customOrderSupport
        });
    }, [canClean, didSelectSegments, executeSegmentAction, segments, iterationCount, mapSegmentationProperties]);
    const handleLongClick = React.useCallback(() => {
        setIntegrationHelpDialogPayload(JSON.stringify({
            action: "start_segment_action",
            segment_ids: segments,
            iterations: iterationCount ?? 1,
            customOrder: mapSegmentationProperties?.customOrderSupport ?? false
        }, null, 2));
        setIntegrationHelpDialogOpen(true);
    }, [segments, iterationCount, mapSegmentationProperties]);
    const setupClickHandlers = useLongPress(handleLongClick, {
        onCancel: (event) => {
            handleClick();
        },
        threshold: 500,
        captureEvent: true,
        cancelOnMovement: true,
    });
    const handleIterationToggle = React.useCallback(() => {
        if (mapSegmentationProperties) {
            setIterationCount(iterationCount % mapSegmentationProperties.iterationCount.max + 1);
        }
    }, [iterationCount, setIterationCount, mapSegmentationProperties]);
    if (mapSegmentationPropertiesLoadError) {
        return (<Container>
                <Typography color="error">
                    Error loading {Capability.MapSegmentation} properties
                </Typography>
                <Box m={1}/>
                <Button color="primary" variant="contained" onClick={() => {
                return refetchMapSegmentationProperties();
            }}>
                    Retry
                </Button>
            </Container>);
    }
    if (mapSegmentationProperties === undefined && mapSegmentationPropertiesLoading) {
        return (<Container>
                <CircularProgress />
            </Container>);
    }
    if (mapSegmentationProperties === undefined) {
        return (<Container>
                <Typography align="center">
                    No {Capability.MapSegmentation} properties
                </Typography>
                ;
            </Container>);
    }
    return (<>
            <Grid container spacing={1} direction="row-reverse" flexWrap="wrap-reverse">
                <Grid item>
                    <ActionButton disabled={!didSelectSegments || segmentActionExecuting || !canClean} color="inherit" size="medium" variant="extended" {...setupClickHandlers()}>
                        Clean {segments.length} segments
                        {segmentActionExecuting && (<CircularProgress color="inherit" size={18} style={{ marginLeft: 10 }}/>)}
                    </ActionButton>
                </Grid>
                {mapSegmentationProperties.iterationCount.max > 1 &&
            <Grid item>
                        <ActionButton color="inherit" size="medium" variant="extended" style={{
                    textTransform: "initial"
                }} onClick={handleIterationToggle} title="Iteration Count">
                            <IterationsIcon iterationCount={iterationCount}/>
                        </ActionButton>
                    </Grid>}
                {didSelectSegments &&
            <Grid item>
                        <ActionButton color="inherit" size="medium" variant="extended" onClick={onClear}>
                            Clear
                        </ActionButton>
                    </Grid>}
                {(didSelectSegments && !canClean) &&
            <Grid item>
                        <Typography variant="caption" color="textSecondary">
                            Cannot start segment cleaning while the robot is busy
                        </Typography>
                    </Grid>}
            </Grid>
            <IntegrationHelpDialog dialogOpen={integrationHelpDialogOpen} setDialogOpen={(open) => {
            setIntegrationHelpDialogOpen(open);
        }} coordinatesWarning={false} helperText={"To start a cleanup of the currently selected segments with the currently configured parameters via MQTT or REST, simply use this payload."} payload={integrationHelpDialogPayload}/>
        </>);
};
export default SegmentActions;
