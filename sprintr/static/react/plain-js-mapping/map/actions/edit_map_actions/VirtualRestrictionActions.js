import { Capability, useCombinedVirtualRestrictionsMutation, useCombinedVirtualRestrictionsPropertiesQuery, ValetudoRestrictedZoneType } from "../../../api";
import React from "react";
import { Box, Button, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { ActionButton } from "../../Styled";
import NoMopAreaClientStructure from "../../structures/client_structures/NoMopAreaClientStructure";
const VirtualRestrictionActions = props => {
  const {
    virtualWalls,
    noGoAreas,
    noMopAreas,
    convertPixelCoordinatesToCMSpace,
    onAddVirtualWall,
    onAddNoGoArea,
    onAddNoMopArea,
    onSave,
    onRefresh
  } = props;
  const {
    data: combinedVirtualRestrictionsProperties,
    isLoading: combinedVirtualRestrictionsPropertiesLoading,
    isError: combinedVirtualRestrictionsPropertiesLoadError,
    refetch: refetchCombinedVirtualRestrictionsProperties
  } = useCombinedVirtualRestrictionsPropertiesQuery();
  const {
    mutate: saveRestrictions,
    isLoading: restrictionsSaving
  } = useCombinedVirtualRestrictionsMutation({
    onSuccess: onSave
  });
  const canEdit = props.robotStatus.value === "docked";
  const handleSaveClick = React.useCallback(() => {
    if (!canEdit) {
      return;
    }
    const restrictedZones = [];
    [...noGoAreas, ...noMopAreas].forEach(rZ => {
      let type = ValetudoRestrictedZoneType.Regular;
      if (rZ.getType() === NoMopAreaClientStructure.TYPE) {
        type = ValetudoRestrictedZoneType.Mop;
      }
      restrictedZones.push({
        type: type,
        points: {
          pA: convertPixelCoordinatesToCMSpace({
            x: rZ.x0,
            y: rZ.y0
          }),
          pB: convertPixelCoordinatesToCMSpace({
            x: rZ.x1,
            y: rZ.y1
          }),
          pC: convertPixelCoordinatesToCMSpace({
            x: rZ.x2,
            y: rZ.y2
          }),
          pD: convertPixelCoordinatesToCMSpace({
            x: rZ.x3,
            y: rZ.y3
          })
        }
      });
    });
    saveRestrictions({
      virtualWalls: virtualWalls.map(vW => {
        return {
          points: {
            pA: convertPixelCoordinatesToCMSpace({
              x: vW.x0,
              y: vW.y0
            }),
            pB: convertPixelCoordinatesToCMSpace({
              x: vW.x1,
              y: vW.y1
            })
          }
        };
      }),
      restrictedZones: restrictedZones
    });
  }, [canEdit, saveRestrictions, virtualWalls, noGoAreas, noMopAreas, convertPixelCoordinatesToCMSpace]);
  if (combinedVirtualRestrictionsPropertiesLoadError) {
    return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Typography, {
      color: "error"
    }, "Error loading ", Capability.CombinedVirtualRestrictions, " properties"), /*#__PURE__*/React.createElement(Box, {
      m: 1
    }), /*#__PURE__*/React.createElement(Button, {
      color: "primary",
      variant: "contained",
      onClick: () => {
        return refetchCombinedVirtualRestrictionsProperties();
      }
    }, "Retry"));
  }
  if (combinedVirtualRestrictionsProperties === undefined && combinedVirtualRestrictionsPropertiesLoading) {
    return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(CircularProgress, null));
  }
  if (combinedVirtualRestrictionsProperties === undefined) {
    return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Typography, {
      align: "center"
    }, "No ", Capability.CombinedVirtualRestrictions, " properties"), ";");
  }
  return /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 1,
    direction: "row-reverse",
    flexWrap: "wrap-reverse"
  }, canEdit && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ActionButton, {
    disabled: restrictionsSaving,
    color: "inherit",
    size: "medium",
    variant: "extended",
    onClick: handleSaveClick
  }, "Save")), canEdit && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ActionButton, {
    color: "inherit",
    size: "medium",
    variant: "extended",
    onClick: onAddVirtualWall
  }, "Add Virtual Wall")), canEdit && combinedVirtualRestrictionsProperties.supportedRestrictedZoneTypes.includes(ValetudoRestrictedZoneType.Regular) && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ActionButton, {
    color: "inherit",
    size: "medium",
    variant: "extended",
    onClick: onAddNoGoArea
  }, "Add No Go Area")), canEdit && combinedVirtualRestrictionsProperties.supportedRestrictedZoneTypes.includes(ValetudoRestrictedZoneType.Mop) && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ActionButton, {
    color: "inherit",
    size: "medium",
    variant: "extended",
    onClick: onAddNoMopArea
  }, "Add No Mop Area")), canEdit && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ActionButton, {
    color: "inherit",
    size: "medium",
    variant: "extended",
    onClick: onRefresh
  }, "Refresh")), !canEdit && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "caption",
    color: "textSecondary"
  }, "Editing virtual restrictions requires the robot to be docked")));
};
export default VirtualRestrictionActions;