import { createRoot } from "react-dom/client";
import App from "./App";
// @ts-ignore
console.log("test1");
const root = createRoot(document.getElementById("myDiv"));
console.log("test");
root.render( /*#__PURE__*/React.createElement(App, null));