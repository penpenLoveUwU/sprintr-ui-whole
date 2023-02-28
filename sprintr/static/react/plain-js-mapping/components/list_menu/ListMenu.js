import { Divider, Grid, IconButton, List, ListItemText } from "@mui/material";
import React from "react";
import { SpacerListMenuItem } from "./SpacerListMenuItem";
import HelpDialog from "../HelpDialog";
import { Help as HelpIcon } from "@mui/icons-material";
export const ListMenu = ({
  primaryHeader,
  secondaryHeader,
  listItems,
  helpText,
  style
}) => {
  const [helpDialogOpen, setHelpDialogOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(List, {
    style: style,
    sx: {
      width: "100%"
    },
    subheader: /*#__PURE__*/React.createElement(Grid, {
      container: true
    }, /*#__PURE__*/React.createElement(Grid, {
      item: true,
      style: {
        maxWidth: helpText ? "84%" : undefined //Unfortunately, 85% does not fit next to the help on an iphone 5
      }
    }, /*#__PURE__*/React.createElement(ListItemText, {
      style: {
        paddingBottom: "1rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        userSelect: "none"
      },
      primary: primaryHeader,
      secondary: secondaryHeader
    })), helpText && /*#__PURE__*/React.createElement(Grid, {
      item: true,
      style: {
        marginLeft: "auto",
        marginRight: "0.5rem"
      }
    }, /*#__PURE__*/React.createElement(IconButton, {
      onClick: () => {
        return setHelpDialogOpen(true);
      },
      title: "Help"
    }, /*#__PURE__*/React.createElement(HelpIcon, null))))
  }, listItems.map((item, idx) => {
    const divider = /*#__PURE__*/React.createElement(Divider, {
      variant: "middle",
      component: "li",
      key: idx + "_divider"
    });
    let elem = item;
    if (elem.type === SpacerListMenuItem) {
      elem = /*#__PURE__*/React.createElement("br", {
        key: idx + "_spacer"
      });
    }
    if (idx > 0 && item.type !== SpacerListMenuItem && listItems[idx - 1].type !== SpacerListMenuItem) {
      return [divider, elem];
    } else {
      return elem;
    }
  })), helpText && /*#__PURE__*/React.createElement(HelpDialog, {
    dialogOpen: helpDialogOpen,
    setDialogOpen: open => {
      setHelpDialogOpen(open);
    },
    helpText: helpText
  }));
};