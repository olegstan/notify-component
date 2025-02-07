"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactDom = _interopRequireDefault(require("react-dom"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Portal = _ref => {
  let {
    id,
    children
  } = _ref;
  const elRef = (0, _react.useRef)(document.createElement('div'));
  (0, _react.useEffect)(() => {
    const rootElement = document.getElementById(id);
    if (!rootElement) {
      console.error("Portal: \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u0441 id \"".concat(id, "\" \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D."));
      return;
    }
    try {
      rootElement.appendChild(elRef.current);
    } catch (error) {
      console.error('Portal: ошибка при добавлении элемента', error);
    }
    return () => {
      try {
        rootElement.removeChild(elRef.current);
      } catch (error) {
        console.error('Portal: ошибка при удалении элемента', error);
      }
    };
  }, [id]);
  return /*#__PURE__*/_reactDom.default.createPortal(children, elRef.current);
};
var _default = exports.default = Portal;