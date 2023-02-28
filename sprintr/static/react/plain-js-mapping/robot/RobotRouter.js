import { Route, Switch } from "react-router";
import { useRouteMatch } from "react-router-dom";
import Consumables from "./Consumables";
import ManualControl from "./ManualControl";
import TotalStatistics from "./TotalStatistics";
const RobotRouter = () => {
  const {
    path
  } = useRouteMatch();
  return /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: path + "/consumables"
  }, /*#__PURE__*/React.createElement(Consumables, null)), /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: path + "/manual_control"
  }, /*#__PURE__*/React.createElement(ManualControl, null)), /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: path + "/total_statistics"
  }, /*#__PURE__*/React.createElement(TotalStatistics, null)), /*#__PURE__*/React.createElement(Route, {
    path: "*"
  }, /*#__PURE__*/React.createElement("h3", null, "Unknown route")));
};
export default RobotRouter;