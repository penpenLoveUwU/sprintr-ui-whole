import React from "react";
import { RestartAlt as ConfigRestoreIcon, SystemUpdateAlt as UpdaterIcon, Badge as FriendlyNameIcon } from "@mui/icons-material";
import { ListMenu } from "../components/list_menu/ListMenu";
import PaperContainer from "../components/PaperContainer";
import { useRestoreDefaultConfigurationMutation, useUpdaterConfigurationMutation, useUpdaterConfigurationQuery, useValetudoCustomizationsMutation, useValetudoCustomizationsQuery } from "../api";
import { ButtonListMenuItem } from "../components/list_menu/ButtonListMenuItem";
import { SelectListMenuItem } from "../components/list_menu/SelectListMenuItem";
import { SpacerListMenuItem } from "../components/list_menu/SpacerListMenuItem";
import { TextEditModalListMenuItem } from "../components/list_menu/TextEditModalListMenuItem";
const ConfigRestoreButtonListMenuItem = () => {
  const {
    mutate: restoreDefaultConfiguration,
    isLoading: restoreDefaultConfigurationIsExecuting
  } = useRestoreDefaultConfigurationMutation();
  return /*#__PURE__*/React.createElement(ButtonListMenuItem, {
    primaryLabel: "Restore Default Configuration",
    secondaryLabel: "This will only affect Valetudo",
    icon: /*#__PURE__*/React.createElement(ConfigRestoreIcon, null),
    buttonLabel: "Go",
    buttonColor: "error",
    confirmationDialog: {
      title: "Restore default Valetudo configuration?",
      body: "Are you sure that you want to restore the default configuration? This will not affect Wi-Fi settings, Map data etc."
    },
    action: () => {
      restoreDefaultConfiguration();
    },
    actionLoading: restoreDefaultConfigurationIsExecuting
  });
};
const FriendlyNameEditModalListMenuItem = () => {
  const {
    data: valetudoCustomizations,
    isLoading: valetudoCustomizationsLoading
  } = useValetudoCustomizationsQuery();
  const {
    mutate: updateValetudoCustomizations,
    isLoading: valetudoCustomizationsUpdating
  } = useValetudoCustomizationsMutation();
  const description = "Set a custom friendly name for Network Advertisement, MQTT etc.";
  let secondaryLabel = description;
  if (valetudoCustomizations && valetudoCustomizations.friendlyName !== "") {
    secondaryLabel = valetudoCustomizations.friendlyName;
  }
  return /*#__PURE__*/React.createElement(TextEditModalListMenuItem, {
    isLoading: valetudoCustomizationsLoading || valetudoCustomizationsUpdating,
    value: valetudoCustomizations?.friendlyName ?? "",
    dialog: {
      title: "Custom Friendly Name",
      description: description,
      validatingTransformer: newValue => {
        return newValue.replace(/[^a-zA-Z0-9 -]/g, "").slice(0, 24);
      },
      onSave: newValue => {
        updateValetudoCustomizations({
          friendlyName: newValue
        });
      }
    },
    icon: /*#__PURE__*/React.createElement(FriendlyNameIcon, null),
    primaryLabel: "Custom Friendly Name",
    secondaryLabel: secondaryLabel
  });
};
const updateProviders = [{
  value: "github",
  label: "Release"
}, {
  value: "github_nightly",
  label: "Nightly"
}];
const UpdateProviderSelectListMenuItem = () => {
  const {
    data: storedConfiguration,
    isLoading: configurationLoading,
    isError: configurationError
  } = useUpdaterConfigurationQuery();
  const {
    mutate: updateConfiguration,
    isLoading: configurationUpdating
  } = useUpdaterConfigurationMutation();
  const disabled = configurationLoading || configurationUpdating || configurationError;
  const currentValue = updateProviders.find(provider => provider.value === storedConfiguration?.updateProvider) ?? {
    value: "",
    label: ""
  };
  return /*#__PURE__*/React.createElement(SelectListMenuItem, {
    options: updateProviders,
    currentValue: currentValue,
    setValue: e => {
      updateConfiguration({
        updateProvider: e.value
      });
    },
    disabled: disabled,
    loadError: configurationError,
    primaryLabel: "Update Channel",
    secondaryLabel: "Select the channel used by the inbuilt updater",
    icon: /*#__PURE__*/React.createElement(UpdaterIcon, null)
  });
};
const ValetudoOptions = () => {
  const listItems = React.useMemo(() => {
    return [/*#__PURE__*/React.createElement(ConfigRestoreButtonListMenuItem, {
      key: "configRestoreAction"
    }), /*#__PURE__*/React.createElement(SpacerListMenuItem, {
      key: "spacer0"
    }), /*#__PURE__*/React.createElement(FriendlyNameEditModalListMenuItem, {
      key: "friendlyName"
    }), /*#__PURE__*/React.createElement(UpdateProviderSelectListMenuItem, {
      key: "updateProviderSelect"
    })];
  }, []);
  return /*#__PURE__*/React.createElement(PaperContainer, null, /*#__PURE__*/React.createElement(ListMenu, {
    primaryHeader: "Valetudo Options",
    secondaryHeader: "Tunables and actions provided by Valetudo",
    listItems: listItems
  }));
};
export default ValetudoOptions;