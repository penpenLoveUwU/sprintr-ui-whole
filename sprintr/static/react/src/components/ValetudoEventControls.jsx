import React from "react";
import { Button, ButtonGroup, Stack, styled, Typography } from "@mui/material";
import { getConsumableName } from "../utils";
import { formatRelative } from "date-fns";
const EventRow = styled("div")({
    flex: "1",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "auto",
    marginTop: 2,
    marginBottom: 2,
});
const EventTimestamp = ({ timestamp }) => {
    return (<Typography variant="caption">
            {formatRelative(new Date(timestamp), new Date())}
        </Typography>);
};
const ConsumableDepletedEventControl = ({ event, interact }) => {
    const color = event.processed ? "textSecondary" : "textPrimary";
    const textStyle = event.processed ? { textDecoration: "line-through" } : {};
    if (!event.type || !event.subType) {
        return (<Typography color={"error"}>
                    Consumable without type/subType depleted
                </Typography>);
    }
    return (<EventRow>
                <Stack>
                    <EventTimestamp timestamp={event.timestamp}/>
                    <Typography color={color} style={textStyle} sx={{ mr: 1 }}>
                        The consumable <em>{getConsumableName(event.type, event.subType)}</em> is depleted
                    </Typography>
                </Stack>
                <Button size="small" variant={"contained"} disabled={event.processed} onClick={() => {
            interact({
                interaction: "reset"
            });
        }} color="warning">
                    Reset
                </Button>
            </EventRow>);
};
const ErrorEventControl = ({ event, interact }) => {
    const color = event.processed ? "textSecondary" : "error";
    const textStyle = event.processed ? { textDecoration: "line-through" } : {};
    return (<EventRow>
                <Stack>
                    <EventTimestamp timestamp={event.timestamp}/>
                    <Typography color={color} style={textStyle} sx={{ mr: 1 }}>
                        An error occurred: {event.message || "Unknown error"}
                    </Typography>
                </Stack>
                <Button size="small" variant={"contained"} disabled={event.processed} onClick={() => {
            interact({
                interaction: "ok"
            });
        }} color="error">
                    Dismiss
                </Button>
            </EventRow>);
};
const PendingMapChangeEventControl = ({ event, interact }) => {
    const color = event.processed ? "textSecondary" : "textPrimary";
    const textStyle = event.processed ? { textDecoration: "line-through" } : {};
    return (<EventRow>
                <Stack>
                    <EventTimestamp timestamp={event.timestamp}/>
                    <Typography color={color} style={textStyle} sx={{ mr: 1 }}>
                        A map change is pending. Do you want to accept the new map?
                    </Typography>
                </Stack>
                <ButtonGroup size="small" variant="contained" color="success">
                    <Button disabled={event.processed} onClick={() => {
            interact({
                interaction: "yes"
            });
        }} color="success">
                        Yes
                    </Button>
                    <Button disabled={event.processed} onClick={() => {
            interact({
                interaction: "no"
            });
        }} color="error">
                        No
                    </Button>
                </ButtonGroup>
            </EventRow>);
};
const CreateDismissableEventControl = (message) => {
    return function DismissableEventControl({ event, interact }) {
        const color = event.processed ? "textSecondary" : "textPrimary";
        const textStyle = event.processed ? { textDecoration: "line-through" } : {};
        return (<EventRow>
                <Stack>
                    <EventTimestamp timestamp={event.timestamp}/>
                    <Typography color={color} style={textStyle} sx={{ mr: 1 }}>
                        {message}
                    </Typography>
                </Stack>
                <Button size="small" variant={"contained"} disabled={event.processed} onClick={() => {
                interact({
                    interaction: "ok"
                });
            }} color="info">
                    Dismiss
                </Button>
            </EventRow>);
    };
};
const UnknownEventControl = ({ event }) => {
    return (<Typography color={"error"}>
                Unknown event type: ${event.__class}
            </Typography>);
};
export const eventControls = {
    ConsumableDepletedValetudoEvent: ConsumableDepletedEventControl,
    ErrorStateValetudoEvent: ErrorEventControl,
    PendingMapChangeValetudoEvent: PendingMapChangeEventControl,
    DustBinFullValetudoEvent: CreateDismissableEventControl("The dust bin is full. Please empty it."),
    MopAttachmentReminderValetudoEvent: CreateDismissableEventControl("The mop is still attached to the robot."),
    Default: UnknownEventControl,
};
