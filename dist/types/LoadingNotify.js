"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingNotify = void 0;
var _react = _interopRequireDefault(require("react"));
var _NotifyManager = _interopRequireDefault(require("../NotifyManager"));
var _useRendered = _interopRequireDefault(require("./hooks/useRendered"));
var _getNotifyStyle = _interopRequireDefault(require("./getNotifyStyle"));
var _styles = require("./../styles");
var _ic_close_error = _interopRequireDefault(require("../images/ic_close_error.svg"));
var _loader = _interopRequireDefault(require("../images/loader.svg"));
var _styles2 = require("./styles");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// @ts-ignore

// @ts-ignore

const LoadingNotify = _ref => {
  let {
    id,
    text,
    onClick,
    needRemove,
    percent
  } = _ref;
  const rendered = (0, _useRendered.default)();
  const style = (0, _getNotifyStyle.default)(rendered, needRemove);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_styles.NotifyItem, {
    style: style,
    onClick: onClick,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_styles2.Preload, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          width: percent && percent > 0 ? "".concat(percent, "%") : '0%'
        }
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_styles2.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
        className: "load",
        src: _loader.default,
        alt: ""
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
        src: _ic_close_error.default,
        className: "close",
        alt: "Close",
        onClick: () => _NotifyManager.default.delete(id)
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "text",
        children: text
      })]
    })]
  });
};
exports.LoadingNotify = LoadingNotify;