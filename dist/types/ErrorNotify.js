"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorNotify = void 0;
var _react = _interopRequireDefault(require("react"));
var _NotifyManager = _interopRequireDefault(require("../NotifyManager"));
var _useRendered = _interopRequireDefault(require("./hooks/useRendered"));
var _getNotifyStyle = _interopRequireDefault(require("./getNotifyStyle"));
var _styles = require("./../styles");
var _ic_close_error = require("../images/ic_close_error.svg");
var _styles2 = require("./styles");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// @ts-ignore

const ErrorNotify = _ref => {
  let {
    id,
    text,
    onClick,
    needRemove
  } = _ref;
  const rendered = (0, _useRendered.default)();
  const style = (0, _getNotifyStyle.default)(rendered, needRemove);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_styles.NotifyItem, {
    style: {
      ...style,
      ...{
        backgroundColor: '#EF5E70',
        color: '#fff'
      }
    },
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_styles2.Content, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "text",
        children: text
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ic_close_error.ReactComponent, {
        className: "close",
        onClick: () => _NotifyManager.default.delete(id)
      })]
    })
  });
};
exports.ErrorNotify = ErrorNotify;