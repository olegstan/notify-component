"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
const useRendered = function () {
  let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
  const [rendered, setRendered] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    const timer = setTimeout(() => setRendered(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return rendered;
};
var _default = exports.default = useRendered;