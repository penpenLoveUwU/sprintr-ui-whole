import React from "react";
import { Badge, Button, Divider, IconButton, Popover, Stack, Typography } from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import { useValetudoEventsInteraction, useValetudoEventsQuery } from "../api";
import { eventControls } from "./ValetudoEventControls";
import ReloadableCard from "./ReloadableCard";
import styles from "./ValetudoEvents.module.css";
const ValetudoEvents = () => {
  const {
    data: eventData,
    isFetching: eventDataFetching,
    isLoading: eventDataLoading,
    error: eventDataError,
    refetch: eventDataRefetch
  } = useValetudoEventsQuery();
  const {
    mutate: interactWithEvent
  } = useValetudoEventsInteraction();
  const [anchorElement, setAnchorElement] = React.useState(null);
  const handleMenu = event => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElement(null);
  };
  const icon = React.useMemo(() => {
    const icon = /*#__PURE__*/React.createElement(NotificationsIcon, null);
    const unprocessedEventCount = eventData && eventData.length ? eventData.reduce((i, event) => {
      return i + Number(!event.processed);
    }, 0) : 0;
    if (!eventDataLoading) {
      if (eventDataError) {
        return /*#__PURE__*/React.createElement(Badge, {
          badgeContent: "!",
          color: "error"
        }, icon);
      } else if (unprocessedEventCount > 0) {
        return /*#__PURE__*/React.createElement(Badge, {
          badgeContent: unprocessedEventCount,
          color: "error"
        }, icon);
      }
    }
    return icon;
  }, [eventData, eventDataError, eventDataLoading]);
  const popoverContent = React.useMemo(() => {
    const events = eventData && eventData.length ? eventData.map((event, i) => {
      const EventControl = eventControls[event.__class] || eventControls.Default;
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: event.id
      }, i > 0 && /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(EventControl, {
        event: event,
        interact: interaction => {
          interactWithEvent({
            id: event.id,
            interaction
          });
        }
      }));
    }) : /*#__PURE__*/React.createElement(Typography, {
      color: "textSecondary",
      variant: "subtitle1"
    }, "No events");
    return /*#__PURE__*/React.createElement(ReloadableCard, {
      divider: false,
      title: "Events",
      loading: eventDataFetching,
      onReload: () => {
        return eventDataRefetch();
      }
    }, /*#__PURE__*/React.createElement(Divider, {
      style: {
        marginBottom: "1rem"
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: styles.eventContainer
    }, /*#__PURE__*/React.createElement(Stack, null, events)), /*#__PURE__*/React.createElement(Divider, {
      style: {
        marginTop: "1rem"
      }
    }), /*#__PURE__*/React.createElement(Button, {
      style: {
        marginLeft: "auto",
        display: "flex",
        marginTop: "0.5rem",
        marginBottom: "-0.5rem" //eww :(
      },
      onClick: () => {
        handleClose();
      }
    }, "Close"));
  }, [eventData, eventDataFetching, eventDataRefetch, interactWithEvent]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IconButton, {
    size: "large",
    "aria-label": "Events",
    onClick: handleMenu,
    color: "inherit",
    title: "Events and Notifications"
  }, icon), /*#__PURE__*/React.createElement(Popover, {
    open: Boolean(anchorElement),
    anchorEl: anchorElement,
    onClose: handleClose,
    anchorOrigin: {
      vertical: "top",
      horizontal: "right"
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "right"
    }
  }, popoverContent));
};
export default ValetudoEvents;