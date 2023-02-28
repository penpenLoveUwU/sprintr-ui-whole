import Map, { MapContainer } from "./Map";
import HelpDialog from "../components/HelpDialog";
import HelpAction from "./actions/edit_map_actions/HelpAction";
import { PathDrawer } from "./PathDrawer";
import { RawMapEntityType } from "../api";
import SegmentLabelMapStructure from "./structures/map_structures/SegmentLabelMapStructure";
class RobotCoverageMap extends Map {
  constructor(props) {
    super(props);
    this.state = {
      selectedSegmentIds: [],
      helpDialogOpen: false
    };
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
    }), /*#__PURE__*/React.createElement(HelpAction, {
      helpDialogOpen: this.state.helpDialogOpen,
      setHelpDialogOpen: open => {
        this.setState({
          helpDialogOpen: open
        });
      }
    }), /*#__PURE__*/React.createElement(HelpDialog, {
      dialogOpen: this.state.helpDialogOpen,
      setDialogOpen: open => {
        this.setState({
          helpDialogOpen: open
        });
      },
      helpText: this.props.helpText
    }));
  }
  updateDrawableComponents() {
    return new Promise((resolve, reject) => {
      this.drawableComponentsMutex.take(async () => {
        this.drawableComponents = [];
        await this.mapLayerManager.draw(this.props.rawMap, this.props.theme);
        this.drawableComponents.push(this.mapLayerManager.getCanvas());
        const coveragePathImage = await PathDrawer.drawPaths({
          paths: this.props.rawMap.entities.filter(e => {
            return e.type === RawMapEntityType.Path;
          }),
          mapWidth: this.props.rawMap.size.x,
          mapHeight: this.props.rawMap.size.y,
          pixelSize: this.props.rawMap.pixelSize,
          paletteMode: this.props.theme.palette.mode === "dark" ? "light" : "dark",
          width: 5
        });
        this.drawableComponents.push(coveragePathImage);
        const pathsImage = await PathDrawer.drawPaths({
          paths: this.props.rawMap.entities.filter(e => {
            return e.type === RawMapEntityType.Path || e.type === RawMapEntityType.PredictedPath;
          }),
          mapWidth: this.props.rawMap.size.x,
          mapHeight: this.props.rawMap.size.y,
          pixelSize: this.props.rawMap.pixelSize,
          paletteMode: this.props.theme.palette.mode
        });
        this.drawableComponents.push(pathsImage);
        this.structureManager.updateMapStructuresFromMapData(this.props.rawMap);
        // remove all segment labels
        this.structureManager.getMapStructures().forEach(s => {
          if (s.type === SegmentLabelMapStructure.TYPE) {
            this.structureManager.removeMapStructure(s);
          }
        });
        this.updateState();
        this.drawableComponentsMutex.leave();
        resolve();
      });
    });
  }
  //eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onTap(evt) {
    // Disable all interactions
    return;
  }
}
export default RobotCoverageMap;