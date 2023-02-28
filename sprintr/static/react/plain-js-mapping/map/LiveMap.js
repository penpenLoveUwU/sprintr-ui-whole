import Map, { MapContainer, usePendingMapAction } from "./Map";
import { Capability } from "../api";
import GoToTargetClientStructure from "./structures/client_structures/GoToTargetClientStructure";
import { ActionsContainer } from "./Styled";
import SegmentActions from "./actions/live_map_actions/SegmentActions";
import SegmentLabelMapStructure from "./structures/map_structures/SegmentLabelMapStructure";
import ZoneActions from "./actions/live_map_actions/ZoneActions";
import ZoneClientStructure from "./structures/client_structures/ZoneClientStructure";
import GoToActions from "./actions/live_map_actions/GoToActions";
import React from "react";
import { LiveMapModeSwitcher } from "./LiveMapModeSwitcher";
const LIVE_MAP_MODE_LOCAL_STORAGE_KEY = "live-map-mode";
class LiveMap extends Map {
  constructor(props) {
    super(props);
    this.supportedModes = [];
    if (props.supportedCapabilities[Capability.MapSegmentation]) {
      this.supportedModes.push("segments");
    }
    if (props.supportedCapabilities[Capability.ZoneCleaning]) {
      this.supportedModes.push("zones");
    }
    if (props.supportedCapabilities[Capability.GoToLocation]) {
      this.supportedModes.push("goto");
    }
    let modeIdxToUse = 0;
    try {
      const previousMode = window.localStorage.getItem(LIVE_MAP_MODE_LOCAL_STORAGE_KEY);
      modeIdxToUse = Math.max(this.supportedModes.findIndex(e => e === previousMode), 0 //default to the first if not defined or not supported
      );
    } catch (e) {
      /* users with non-working local storage will have to live with the defaults */
    }
    this.state = {
      mode: this.supportedModes[modeIdxToUse] ?? "none",
      selectedSegmentIds: [],
      zones: [],
      goToTarget: undefined
    };
  }
  updateState() {
    super.updateState();
    this.setState({
      zones: this.structureManager.getClientStructures().filter(s => {
        return s.type === ZoneClientStructure.TYPE;
      }),
      goToTarget: this.structureManager.getClientStructures().find(s => {
        return s.type === GoToTargetClientStructure.TYPE;
      })
    });
  }
  onTap(evt) {
    if (super.onTap(evt)) {
      return true;
    }
    const {
      x,
      y
    } = this.relativeCoordinatesToCanvas(evt.x0, evt.y0);
    const tappedPointInMapSpace = this.ctxWrapper.mapPointToCurrentTransform(x, y);
    switch (this.state.mode) {
      case "segments":
        {
          const intersectingSegmentId = this.mapLayerManager.getIntersectingSegment(tappedPointInMapSpace.x, tappedPointInMapSpace.y);
          if (intersectingSegmentId) {
            const segmentLabels = this.structureManager.getMapStructures().filter(s => {
              return s.type === SegmentLabelMapStructure.TYPE;
            });
            const matchedSegmentLabel = segmentLabels.find(l => {
              return l.id === intersectingSegmentId;
            });
            if (matchedSegmentLabel) {
              matchedSegmentLabel.onTap();
              this.updateState();
              this.redrawLayers();
              return true;
            }
          }
          break;
        }
      case "goto":
        {
          if (this.structureManager.getClientStructures().filter(s => {
            return s.type !== GoToTargetClientStructure.TYPE;
          }).length === 0) {
            this.structureManager.getClientStructures().forEach(s => {
              if (s.type === GoToTargetClientStructure.TYPE) {
                this.structureManager.removeClientStructure(s);
              }
            });
            this.structureManager.addClientStructure(new GoToTargetClientStructure(tappedPointInMapSpace.x, tappedPointInMapSpace.y));
            this.updateState();
            this.draw();
            return true;
          }
          break;
        }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    super.componentDidUpdate(prevProps, prevState);
    if (this.state.selectedSegmentIds.length > 0 || this.state.zones.length > 0 || this.state.goToTarget !== undefined) {
      usePendingMapAction.setState({
        hasPendingMapAction: true
      });
    } else {
      usePendingMapAction.setState({
        hasPendingMapAction: false
      });
    }
  }
  render() {
    return /*#__PURE__*/React.createElement(MapContainer, {
      style: {
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("canvas", {
      ref: this.canvasRef,
      style: {
        width: "100%",
        height: "100%",
        imageRendering: "crisp-edges"
      }
    }), this.supportedModes.length > 0 && /*#__PURE__*/React.createElement(LiveMapModeSwitcher, {
      supportedModes: this.supportedModes,
      currentMode: this.state.mode,
      setMode: newMode => {
        this.structureManager.getMapStructures().forEach(s => {
          if (s.type === SegmentLabelMapStructure.TYPE) {
            const label = s;
            label.selected = false;
          }
        });
        this.structureManager.getClientStructures().forEach(s => {
          if (s.type === GoToTargetClientStructure.TYPE) {
            this.structureManager.removeClientStructure(s);
          }
          if (s.type === ZoneClientStructure.TYPE) {
            this.structureManager.removeClientStructure(s);
          }
        });
        this.updateState();
        this.redrawLayers();
        this.setState({
          mode: newMode
        });
        try {
          window.localStorage.setItem(LIVE_MAP_MODE_LOCAL_STORAGE_KEY, newMode);
        } catch (e) {
          /* intentional */
        }
      }
    }), /*#__PURE__*/React.createElement(ActionsContainer, null, this.state.mode === "segments" && /*#__PURE__*/React.createElement(SegmentActions, {
      segments: this.state.selectedSegmentIds,
      onClear: () => {
        this.structureManager.getMapStructures().forEach(s => {
          if (s.type === SegmentLabelMapStructure.TYPE) {
            const label = s;
            label.selected = false;
          }
        });
        this.updateState();
        this.redrawLayers();
      }
    }), this.state.mode === "zones" && /*#__PURE__*/React.createElement(ZoneActions, {
      zones: this.state.zones,
      convertPixelCoordinatesToCMSpace: coordinates => {
        return this.structureManager.convertPixelCoordinatesToCMSpace(coordinates);
      },
      onClear: () => {
        this.structureManager.getClientStructures().forEach(s => {
          if (s.type === ZoneClientStructure.TYPE) {
            this.structureManager.removeClientStructure(s);
          }
        });
        this.updateState();
        this.draw();
      },
      onAdd: () => {
        const currentCenter = this.getCurrentViewportCenterCoordinatesInPixelSpace();
        const p0 = {
          x: currentCenter.x - 15,
          y: currentCenter.y - 15
        };
        const p1 = {
          x: currentCenter.x + 15,
          y: currentCenter.y + 15
        };
        this.structureManager.addClientStructure(new ZoneClientStructure(p0.x, p0.y, p1.x, p1.y, true));
        this.updateState();
        this.draw();
      }
    }), this.state.mode === "goto" && /*#__PURE__*/React.createElement(GoToActions, {
      goToTarget: this.state.goToTarget,
      convertPixelCoordinatesToCMSpace: coordinates => {
        return this.structureManager.convertPixelCoordinatesToCMSpace(coordinates);
      },
      onClear: () => {
        this.structureManager.getClientStructures().forEach(s => {
          if (s.type === GoToTargetClientStructure.TYPE) {
            this.structureManager.removeClientStructure(s);
          }
        });
        this.updateState();
        this.draw();
      }
    })));
  }
}
export default LiveMap;