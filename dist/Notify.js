"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styles = require("./styles");
var _NotifyManager = _interopRequireDefault(require("./NotifyManager"));
var _ic_close_info = require("./images/ic_close_info.svg");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Notify = _ref => {
  let {
    id,
    text,
    type,
    time,
    onClick,
    onClose,
    needRemove,
    percent
  } = _ref;
  const [rendered, setRendered] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    const timer = setTimeout(() => setRendered(true), 300);
    return () => clearTimeout(timer);
  }, []);
  const style = {};
  if (rendered) {
    style.left = 0;
  }
  if (needRemove) {
    style.left = '320px'; // Пример анимации: сдвиг влево/вправо
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.NotifyItem, {
    style: style,
    className: "notification notification-".concat(type),
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ic_close_info.ReactComponent, {
        className: "close",
        onClick: () => _NotifyManager.default.delete(id)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "text",
        children: text
      })]
    })
  });
};
var _default = exports.default = Notify;