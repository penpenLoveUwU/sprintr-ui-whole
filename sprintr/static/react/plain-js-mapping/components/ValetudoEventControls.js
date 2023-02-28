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
  marginBottom: 2
});
const EventTimestamp = ({
  timestamp
}) => {
  return /*#__PURE__*/React.createElement(Typography, {
    variant: "caption"
  }, formatRelative(new Date(timestamp), new Date()));
};
const ConsumableDepletedEventControl = ({
  event,
  interact
}) => {
  const color = event.processed ? "textSecondary" : "textPrimary";
  const textStyle = event.processed ? {
    textDecoration: "line-through"
  } : {};
  if (!event.type || !event.subType) {
    return /*#__PURE__*/React.createElement(Typography, {
      color: "error"
    }, "Consumable without type/subType depleted");
  }
  return /*#__PURE__*/React.createElement(EventRow, null, /*#__PURE__*/React.createElement(Stack, null, /*#__PURE__*/React.createElement(EventTimestamp, {
    timestamp: event.timestamp
  }), /*#__PURE__*/React.createElement(Typography, {
    color: color,
    style: textStyle,
    sx: {
      mr: 1
    }
  }, "The consumable ", /*#__PURE__*/React.createElement("em", null, getConsumableName(event.type, event.subType)), " is depleted")), /*#__PURE__*/React.createElement(Button, {
    size: "small",
    variant: "contained",
    disabled: event.processed,
    onClick: () => {
      interact({
        interaction: "reset"
      });
    },
    color: "warning"
  }, "Reset"));
};
const ErrorEventControl = ({
  event,
  interact
}) => {
  const color = event.processed ? "textSecondary" : "error";
  const textStyle = event.processed ? {
    textDecoration: "line-through"
  } : {};
  return /*#__PURE__*/React.createElement(EventRow, null, /*#__PURE__*/React.createElement(Stack, null, /*#__PURE__*/React.createElement(EventTimestamp, {
    timestamp: event.timestamp
  }), /*#__PURE__*/React.createElement(Typography, {
    color: color,
    style: textStyle,
    sx: {
      mr: 1
    }
  }, "An error occurred: ", event.message || "Unknown error")), /*#__PURE__*/React.createElement(Button, {
    size: "small",
    variant: "contained",
    disabled: event.processed,
    onClick: () => {
      interact({
        interaction: "ok"
      });
    },
    color: "error"
  }, "Dismiss"));
};
const PendingMapChangeEventControl = ({
  event,
  interact
}) => {
  const color = event.processed ? "textSecondary" : "textPrimary";
  const textStyle = event.processed ? {
    textDecoration: "line-through"
  } : {};
  return /*#__PURE__*/React.createElement(EventRow, null, /*#__PURE__*/React.createElement(Stack, null, /*#__PURE__*/React.createElement(EventTimestamp, {
    timestamp: event.timestamp
  }), /*#__PURE__*/React.createElement(Typography, {
    color: color,
    style: textStyle,
    sx: {
      mr: 1
    }
  }, "A map change is pending. Do you want to accept the new map?")), /*#__PURE__*/React.createElement(ButtonGroup, {
    size: "small",
    variant: "contained",
    color: "success"
  }, /*#__PURE__*/React.createElement(Button, {
    disabled: event.processed,
    onClick: () => {
      interact({
        interaction: "yes"
      });
    },
    color: "success"
  }, "Yes"), /*#__PURE__*/React.createElement(Button, {
    disabled: event.processed,
    onClick: () => {
      interact({
        interaction: "no"
      });
    },
    color: "error"
  }, "No")));
};
const CreateDismissableEventControl = message => {
  return function DismissableEventControl({
    event,
    interact
  }) {
    const color = event.processed ? "textSecondary" : "textPrimary";
    const textStyle = event.processed ? {
      textDecoration: "line-through"
    } : {};
    return /*#__PURE__*/React.createElement(EventRow, null, /*#__PURE__*/React.createElement(Stack, null, /*#__PURE__*/React.createElement(EventTimestamp, {
      timestamp: event.timestamp
    }), /*#__PURE__*/React.createElement(Typography, {
      color: color,
      style: textStyle,
      sx: {
        mr: 1
      }
    }, message)), /*#__PURE__*/React.createElement(Button, {
      size: "small",
      variant: "contained",
      disabled: event.processed,
      onClick: () => {
        interact({
          interaction: "ok"
        });
      },
      color: "info"
    }, "Dismiss"));
  };
};
const UnknownEventControl = ({
  event
}) => {
  return /*#__PURE__*/React.createElement(Typography, {
    color: "error"
  }, "Unknown event type: $", event.__class);
};
export const eventControls = {
  ConsumableDepletedValetudoEvent: ConsumableDepletedEventControl,
  ErrorStateValetudoEvent: ErrorEventControl,
  PendingMapChangeValetudoEvent: PendingMapChangeEventControl,
  DustBinFullValetudoEvent: CreateDismissableEventControl("The dust bin is full. Please empty it."),
  MopAttachmentReminderValetudoEvent: CreateDismissableEventControl("The mop is still attached to the robot."),
  Default: UnknownEventControl
};