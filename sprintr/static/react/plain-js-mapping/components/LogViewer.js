import React from "react";
import styles from "./LogViewer.module.css";
import { LogLevel } from "../api";
function getLoglevelCssClass(level) {
  switch (level) {
    case LogLevel.trace:
      return styles.levelTrace;
    case LogLevel.debug:
      return styles.levelDebug;
    case LogLevel.info:
      return styles.levelInfo;
    case LogLevel.warn:
      return styles.levelWarn;
    case LogLevel.error:
      return styles.levelError;
    default:
      return styles.levelDefault;
  }
}
const LogViewer = props => {
  const logRef = React.useRef(null);
  const [scrolledToBottom, setScrolledToBottom] = React.useState(true);
  const {
    logLines
  } = props;
  React.useEffect(() => {
    const currentLogRef = logRef.current;
    if (currentLogRef) {
      const elem = currentLogRef;
      if (scrolledToBottom) {
        elem.scrollTop = elem.scrollHeight;
      }
    }
  }, [logLines, scrolledToBottom]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: [styles.outerContainer, props.className].join(" "),
    style: props.style
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.container,
    ref: logRef,
    onScroll: () => {
      const currentLogRef = logRef.current;
      if (currentLogRef) {
        const elem = currentLogRef;
        setScrolledToBottom(elem.scrollHeight - Math.abs(elem.scrollTop) === elem.clientHeight);
      }
    }
  }, logLines.map((line, i) => {
    return (
      /*#__PURE__*/
      //The trailing spaces in the metadata section are important for copy-pasting
      React.createElement("div", {
        key: "logline." + i,
        className: styles.logline
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.metadata
      }, /*#__PURE__*/React.createElement("span", {
        className: styles.timestamp
      }, line.timestamp.toISOString(), " "), /*#__PURE__*/React.createElement("span", {
        className: [styles.loglevel, getLoglevelCssClass(line.level)].join(" ")
      }, line.level)), /*#__PURE__*/React.createElement("span", {
        className: styles.content
      }, line.content))
    );
  }))));
};
export default LogViewer;