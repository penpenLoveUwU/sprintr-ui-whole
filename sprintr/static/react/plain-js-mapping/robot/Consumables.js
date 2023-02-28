import React from "react";
import PaperContainer from "../components/PaperContainer";
import { ListMenu } from "../components/list_menu/ListMenu";
import { useConsumablePropertiesQuery, useConsumableResetMutation, useConsumableStateQuery } from "../api";
import { CircularProgress } from "@mui/material";
import { ButtonListMenuItem } from "../components/list_menu/ButtonListMenuItem";
import { convertSecondsToHumans, getConsumableName } from "../utils";
import { ConsumablesHelp } from "./res/ConsumablesHelp";
const ConsumableButtonListMenuItem = ({
  consumable,
  state
}) => {
  const {
    mutate: resetConsumable,
    isLoading: resetConsumableIsExecuting
  } = useConsumableResetMutation();
  let secondaryLabel = "";
  let buttonColor;
  if (state) {
    secondaryLabel = "Remaining: ";
    secondaryLabel += state.remaining.unit === "minutes" ? convertSecondsToHumans(60 * state.remaining.value, false) : `${state.remaining.value} %`;
    if (state.remaining.value <= 0) {
      buttonColor = "warning";
      secondaryLabel = "Depleted";
    }
  }
  return /*#__PURE__*/React.createElement(ButtonListMenuItem, {
    primaryLabel: getConsumableName(consumable.type, consumable.subType),
    secondaryLabel: secondaryLabel,
    buttonLabel: "Reset",
    buttonColor: buttonColor,
    confirmationDialog: {
      title: "Reset consumable?",
      body: "Do you really want to reset this consumable?"
    },
    action: () => {
      resetConsumable(consumable);
    },
    actionLoading: resetConsumableIsExecuting
  });
};
const Consumables = () => {
  const {
    data: consumableProperties,
    isLoading: consumablePropertiesLoading
  } = useConsumablePropertiesQuery();
  const {
    data: consumablesData,
    isLoading: consumablesDataLoading
  } = useConsumableStateQuery();
  const listItems = React.useMemo(() => {
    if (consumableProperties && consumablesData) {
      return consumableProperties.availableConsumables.map(consumable => {
        return /*#__PURE__*/React.createElement(ConsumableButtonListMenuItem, {
          consumable: consumable,
          state: consumablesData.find(e => e.type === consumable.type && e.subType === consumable.subType),
          key: `${consumable.type}_${consumable.subType}`
        });
      });
    } else {
      return [];
    }
  }, [consumableProperties, consumablesData]);
  return /*#__PURE__*/React.createElement(PaperContainer, null, /*#__PURE__*/React.createElement(ListMenu, {
    primaryHeader: "Consumables",
    secondaryHeader: "Monitor and reset consumable states",
    listItems: listItems,
    helpText: ConsumablesHelp
  }), (consumablePropertiesLoading || consumablesDataLoading) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(CircularProgress, null)));
};
export default Consumables;