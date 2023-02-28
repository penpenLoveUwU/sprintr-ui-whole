import { useCapabilitiesSupported } from "../CapabilitiesProvider";
import { Capability, useMapResetMutation, usePersistentDataMutation, usePersistentDataQuery, useRobotMapQuery, useStartMappingPassMutation, useValetudoInformationQuery } from "../api";
import { Save as PersistentMapControlIcon, Layers as MappingPassIcon, LayersClear as MapResetIcon, Dashboard as SegmentEditIcon, Dangerous as VirtualRestrictionsIcon, Crop as CleanupCoverageIcon, Download as ValetudoMapDownloadIcon } from "@mui/icons-material";
import React from "react";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { LinkListMenuItem } from "../components/list_menu/LinkListMenuItem";
import { ButtonListMenuItem } from "../components/list_menu/ButtonListMenuItem";
import { SpacerListMenuItem } from "../components/list_menu/SpacerListMenuItem";
import { ListMenu } from "../components/list_menu/ListMenu";
import { ToggleSwitchListMenuItem } from "../components/list_menu/ToggleSwitchListMenuItem";
import { MapManagementHelp } from "./res/MapManagementHelp";
import PaperContainer from "../components/PaperContainer";
import { MapUtilitiesHelp } from "./res/MapUtilitiesHelp";
export const MappingPassButtonItem = () => {
  const {
    mutate: startMappingPass,
    isLoading: mappingPassStarting
  } = useStartMappingPassMutation();
  return /*#__PURE__*/React.createElement(ButtonListMenuItem, {
    primaryLabel: "Mapping Pass",
    secondaryLabel: "Create a new map",
    icon: /*#__PURE__*/React.createElement(MappingPassIcon, null),
    buttonLabel: "Go",
    confirmationDialog: {
      title: "Start mapping pass?",
      body: "Do you really want to start a mapping pass?"
    },
    action: startMappingPass,
    actionLoading: mappingPassStarting
  });
};
const MapResetButtonItem = () => {
  const {
    mutate: resetMap,
    isLoading: mapResetting
  } = useMapResetMutation();
  return /*#__PURE__*/React.createElement(ButtonListMenuItem, {
    primaryLabel: "Map Reset",
    secondaryLabel: "Delete the current map",
    icon: /*#__PURE__*/React.createElement(MapResetIcon, null),
    buttonLabel: "Go",
    buttonColor: "error",
    confirmationDialog: {
      title: "Reset map?",
      body: "Do you really want to reset the map?"
    },
    action: resetMap,
    actionLoading: mapResetting
  });
};
export const PersistentMapSwitchListItem = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const {
    data: persistentData,
    isFetching: persistentDataLoading,
    isError: persistentDataError
  } = usePersistentDataQuery();
  const {
    mutate: mutatePersistentData,
    isLoading: persistentDataChanging
  } = usePersistentDataMutation();
  const loading = persistentDataLoading || persistentDataChanging;
  const disabled = loading || persistentDataChanging || persistentDataError;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ToggleSwitchListMenuItem, {
    value: persistentData?.enabled ?? false,
    setValue: value => {
      // Disabling requires confirmation
      if (value) {
        mutatePersistentData(true);
      } else {
        setDialogOpen(true);
      }
    },
    disabled: disabled,
    loadError: persistentDataError,
    primaryLabel: "Persistent maps",
    secondaryLabel: "Store a persistent map",
    icon: /*#__PURE__*/React.createElement(PersistentMapControlIcon, null)
  }), /*#__PURE__*/React.createElement(ConfirmationDialog, {
    title: "Disable persistent maps?",
    text: /*#__PURE__*/React.createElement(React.Fragment, null, "Do you really want to disable persistent maps?", /*#__PURE__*/React.createElement("br", null), "This will delete the currently stored map."),
    open: dialogOpen,
    onClose: () => {
      setDialogOpen(false);
    },
    onAccept: () => {
      mutatePersistentData(false);
    }
  }));
};
const ValetudoMapDataExportButtonItem = () => {
  const {
    data: valetudoInformation,
    isLoading: valetudoInformationLoading
  } = useValetudoInformationQuery();
  const {
    data: mapData,
    isLoading: mapIsLoading
  } = useRobotMapQuery();
  return /*#__PURE__*/React.createElement(ButtonListMenuItem, {
    primaryLabel: "Export ValetudoMap",
    secondaryLabel: "Download a ValetudoMap data export to use with other tools",
    icon: /*#__PURE__*/React.createElement(ValetudoMapDownloadIcon, null),
    buttonLabel: "Go",
    action: () => {
      if (valetudoInformation && mapData) {
        const timestamp = new Date().toISOString().replaceAll(":", "-").split(".")[0];
        const mapExportBlob = new Blob([JSON.stringify(mapData, null, 2)], {
          type: "application/json"
        });
        const linkElement = document.createElement("a");
        linkElement.href = URL.createObjectURL(mapExportBlob);
        linkElement.download = `ValetudoMapExport-${valetudoInformation.systemId}-${timestamp}.json`;
        linkElement.click();
      }
    },
    actionLoading: valetudoInformationLoading || mapIsLoading
  });
};
const MapManagement = () => {
  const [persistentMapControlCapabilitySupported, mappingPassCapabilitySupported, mapResetCapabilitySupported, mapSegmentEditCapabilitySupported, mapSegmentRenameCapabilitySupported, combinedVirtualRestrictionsCapabilitySupported] = useCapabilitiesSupported(Capability.PersistentMapControl, Capability.MappingPass, Capability.MapReset, Capability.MapSegmentEdit, Capability.MapSegmentRename, Capability.CombinedVirtualRestrictions);
  const robotManagedListItems = React.useMemo(() => {
    const items = [];
    if (persistentMapControlCapabilitySupported || mappingPassCapabilitySupported || mapResetCapabilitySupported) {
      if (persistentMapControlCapabilitySupported) {
        items.push( /*#__PURE__*/React.createElement(PersistentMapSwitchListItem, {
          key: "persistentMapSwitch"
        }));
      }
      if (mappingPassCapabilitySupported) {
        items.push( /*#__PURE__*/React.createElement(MappingPassButtonItem, {
          key: "mappingPass"
        }));
      }
      if (mapResetCapabilitySupported) {
        items.push( /*#__PURE__*/React.createElement(MapResetButtonItem, {
          key: "mapReset"
        }));
      }
      if (mapSegmentEditCapabilitySupported || mapSegmentRenameCapabilitySupported || combinedVirtualRestrictionsCapabilitySupported) {
        items.push( /*#__PURE__*/React.createElement(SpacerListMenuItem, {
          key: "spacer1"
        }));
      }
    }
    if (mapSegmentEditCapabilitySupported || mapSegmentRenameCapabilitySupported) {
      items.push( /*#__PURE__*/React.createElement(LinkListMenuItem, {
        key: "segmentManagement",
        url: "/options/map_management/segments",
        primaryLabel: "Segment Management",
        secondaryLabel: "Modify the maps segments",
        icon: /*#__PURE__*/React.createElement(SegmentEditIcon, null)
      }));
    }
    if (combinedVirtualRestrictionsCapabilitySupported) {
      items.push( /*#__PURE__*/React.createElement(LinkListMenuItem, {
        key: "virtualRestrictionManagement",
        url: "/options/map_management/virtual_restrictions",
        primaryLabel: "Virtual Restriction Management",
        secondaryLabel: "Create, modify and delete various virtual restrictions",
        icon: /*#__PURE__*/React.createElement(VirtualRestrictionsIcon, null)
      }));
    }
    return items;
  }, [persistentMapControlCapabilitySupported, mappingPassCapabilitySupported, mapResetCapabilitySupported, combinedVirtualRestrictionsCapabilitySupported, mapSegmentEditCapabilitySupported, mapSegmentRenameCapabilitySupported]);
  const utilityMapItems = React.useMemo(() => {
    return [/*#__PURE__*/React.createElement(LinkListMenuItem, {
      key: "robotCoverageMap",
      url: "/options/map_management/robot_coverage",
      primaryLabel: "Robot Coverage Map",
      secondaryLabel: "Check the robots coverage",
      icon: /*#__PURE__*/React.createElement(CleanupCoverageIcon, null)
    }), /*#__PURE__*/React.createElement(ValetudoMapDataExportButtonItem, {
      key: "valetudoMapDataExport"
    })];
  }, []);
  return /*#__PURE__*/React.createElement(PaperContainer, null, /*#__PURE__*/React.createElement(ListMenu, {
    primaryHeader: "Robot-managed Map Features",
    secondaryHeader: "These features are managed and provided by the robot's firmware",
    listItems: robotManagedListItems,
    helpText: MapManagementHelp
  }), /*#__PURE__*/React.createElement(ListMenu, {
    primaryHeader: "Map Utilities",
    secondaryHeader: "Do neat things with the map",
    listItems: utilityMapItems,
    helpText: MapUtilitiesHelp,
    style: {
      marginTop: "1rem"
    }
  }));
};
export default MapManagement;