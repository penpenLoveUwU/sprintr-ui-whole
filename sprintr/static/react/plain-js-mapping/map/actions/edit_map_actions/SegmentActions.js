import { Capability, useJoinSegmentsMutation, useRenameSegmentMutation, useSplitSegmentMutation } from "../../../api";
import React from "react";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { ActionButton } from "../../Styled";
const SegmentActions = props => {
  const {
    selectedSegmentIds,
    segmentNames,
    cuttingLine,
    convertPixelCoordinatesToCMSpace,
    supportedCapabilities,
    onAddCuttingLine,
    onClear
  } = props;
  const [newSegmentName, setNewSegmentName] = React.useState("");
  const [renameDialogOpen, setRenameDialogOpen] = React.useState(false);
  const {
    mutate: joinSegments,
    isLoading: joinSegmentsExecuting
  } = useJoinSegmentsMutation({
    onSuccess: onClear
  });
  const {
    mutate: splitSegment,
    isLoading: splitSegmentExecuting
  } = useSplitSegmentMutation({
    onSuccess: onClear
  });
  const {
    mutate: renameSegment,
    isLoading: renameSegmentExecuting
  } = useRenameSegmentMutation({
    onSuccess: onClear
  });
  const canEdit = props.robotStatus.value === "docked";
  const handleSplitClick = React.useCallback(() => {
    if (!canEdit || !cuttingLine || selectedSegmentIds.length !== 1) {
      return;
    }
    splitSegment({
      segment_id: selectedSegmentIds[0],
      pA: convertPixelCoordinatesToCMSpace({
        x: cuttingLine.x0,
        y: cuttingLine.y0
      }),
      pB: convertPixelCoordinatesToCMSpace({
        x: cuttingLine.x1,
        y: cuttingLine.y1
      })
    });
  }, [canEdit, splitSegment, selectedSegmentIds, cuttingLine, convertPixelCoordinatesToCMSpace]);
  const handleJoinClick = React.useCallback(() => {
    if (!canEdit || selectedSegmentIds.length !== 2) {
      return;
    }
    joinSegments({
      segment_a_id: selectedSegmentIds[0],
      segment_b_id: selectedSegmentIds[1]
    });
  }, [canEdit, joinSegments, selectedSegmentIds]);
  const handleRenameClick = React.useCallback(() => {
    if (!canEdit || selectedSegmentIds.length !== 1) {
      return;
    }
    renameSegment({
      segment_id: selectedSegmentIds[0],
      name: newSegmentName.trim()
    });
  }, [canEdit, selectedSegmentIds, newSegmentName, renameSegment]);
  return /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 1,
    direction: "row-reverse",
    flexWrap: "wrap-reverse"
  }, supportedCapabilities[Capability.MapSegmentEdit] && (selectedSegmentIds.length === 1 || selectedSegmentIds.length === 2) && cuttingLine === undefined && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ActionButton, {
    disabled: joinSegmentsExecuting || !canEdit,
    color: "inherit",
    size: "medium",
    variant: "extended",
    onClick: handleJoinClick
  }, "Join ", segmentNames[selectedSegmentIds[0]], " and ", selectedSegmentIds.length === 2 ? segmentNames[selectedSegmentIds[1]] : "?", joinSegmentsExecuting && /*#__PURE__*/React.createElement(CircularProgress, {
    color: "inherit",
    size: 18,
    style: {
      marginLeft: 10
    }
  }))), supportedCapabilities[Capability.MapSegmentEdit] && selectedSegmentIds.length === 1 && cuttingLine !== undefined && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ActionButton, {
    disabled: splitSegmentExecuting || !canEdit,
    color: "inherit",
    size: "medium",
    variant: "extended",
    onClick: handleSplitClick
  }, "Split ", segmentNames[selectedSegmentIds[0]], splitSegmentExecuting && /*#__PURE__*/React.createElement(CircularProgress, {
    color: "inherit",
    size: 18,
    style: {
      marginLeft: 10
    }
  }))), supportedCapabilities[Capability.MapSegmentRename] && selectedSegmentIds.length === 1 && cuttingLine === undefined && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ActionButton, {
    disabled: renameSegmentExecuting || !canEdit,
    color: "inherit",
    size: "medium",
    variant: "extended",
    onClick: () => {
      setNewSegmentName(segmentNames[selectedSegmentIds[0]] ?? selectedSegmentIds[0]);
      setRenameDialogOpen(true);
    }
  }, "Rename")), supportedCapabilities[Capability.MapSegmentEdit] && selectedSegmentIds.length === 1 && cuttingLine === undefined && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ActionButton, {
    disabled: joinSegmentsExecuting || !canEdit,
    color: "inherit",
    size: "medium",
    variant: "extended",
    onClick: onAddCuttingLine
  }, "Add Cutting Line")), (selectedSegmentIds.length > 0 || cuttingLine !== undefined) && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(ActionButton, {
    color: "inherit",
    size: "medium",
    variant: "extended",
    onClick: onClear
  }, "Clear")), !canEdit && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "caption",
    color: "textSecondary"
  }, "Editing segments requires the robot to be docked")), canEdit && selectedSegmentIds.length === 0 && /*#__PURE__*/React.createElement(Grid, {
    item: true
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "caption",
    color: "textSecondary",
    style: {
      fontSize: "1em"
    }
  }, "Please select a segment to start editing")), supportedCapabilities[Capability.MapSegmentRename] && /*#__PURE__*/React.createElement(Dialog, {
    open: renameDialogOpen,
    onClose: () => {
      setRenameDialogOpen(false);
    }
  }, /*#__PURE__*/React.createElement(DialogTitle, null, "Rename Segment"), /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement(DialogContentText, null, "How should the Segment with the ID ", selectedSegmentIds[0], " be called?"), /*#__PURE__*/React.createElement(TextField, {
    autoFocus: true,
    margin: "dense",
    variant: "standard",
    label: "Segment name",
    fullWidth: true,
    value: newSegmentName,
    onChange: e => {
      setNewSegmentName(e.target.value);
    }
  })), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      setRenameDialogOpen(false);
    }
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    onClick: () => {
      setRenameDialogOpen(false);
      handleRenameClick();
    }
  }, "Rename"))));
};
export default SegmentActions;