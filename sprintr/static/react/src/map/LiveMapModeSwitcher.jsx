import { Box, emphasize, SpeedDial, SpeedDialAction, styled } from "@mui/material";
import { CropSquare as ZoneModeIcon, Dashboard as SegmentModeIcon, Room as GoToModeIcon, QuestionMark as NoneModeIcon, } from "@mui/icons-material";
import React from "react";
const LiveMapModeButtonContainer = styled(Box)(({ theme }) => {
    return {
        position: "absolute",
        pointerEvents: "none",
        top: theme.spacing(2),
        right: theme.spacing(2),
    };
});
const StyledSpeedDial = styled(SpeedDial)(({ theme }) => {
    return {
        "& .MuiSpeedDial-fab": {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            "&:hover": {
                backgroundColor: emphasize(theme.palette.background.paper, 0.15),
            }
        },
        "& > .MuiSpeedDial-actions > .MuiSpeedDialAction-staticTooltip > .MuiSpeedDialAction-staticTooltipLabel": {
            transition: "none !important",
            WebkitTransition: "none !important",
            transitionDelay: "unset !important",
            userSelect: "none",
            whiteSpace: "nowrap"
        },
        "& > .MuiSpeedDial-actions > .MuiSpeedDialAction-staticTooltip > .MuiFab-root": {
            transition: "none !important",
            WebkitTransition: "none !important",
            transitionDelay: "unset !important",
            border: `1px solid ${theme.palette.divider}`,
        }
    };
});
const modeToIcon = {
    "segments": <SegmentModeIcon />,
    "zones": <ZoneModeIcon />,
    "goto": <GoToModeIcon />,
    "none": <NoneModeIcon />
};
const modeToLabel = {
    "segments": "Segments",
    "zones": "Zones",
    "goto": "Go To",
    "none": "None"
};
/* eslint-disable react/display-name */
export const NoTransition = React.forwardRef(({ children }, ref) => {
    return <>{children}</>;
});
export const LiveMapModeSwitcher = ({ supportedModes, currentMode, setMode }) => {
    const [open, setOpen] = React.useState(false);
    return (<LiveMapModeButtonContainer>
            <StyledSpeedDial open={open} onClick={() => {
            setOpen(!open);
        }} icon={modeToIcon[currentMode]} title="Map Mode Selector" FabProps={{ size: "small" }} ariaLabel="Map Mode Selector" direction="down" TransitionComponent={NoTransition}>
                {supportedModes.map((mode) => (<SpeedDialAction key={mode} tooltipOpen tooltipTitle={modeToLabel[mode]} icon={modeToIcon[mode]} onClick={() => {
                setMode(mode);
                setOpen(false);
            }}/>))}
            </StyledSpeedDial>
        </LiveMapModeButtonContainer>);
};
