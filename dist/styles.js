"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotifyItem = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _templateObject, _templateObject2;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
const rotate = (0, _styledComponents.keyframes)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  from {\n    transform: rotate(0deg);\n  }\n\n  to {\n    transform: rotate(360deg);\n  }\n"])));
const NotifyItem = exports.NotifyItem = _styledComponents.default.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  box-shadow: rgb(38 38 38 / 4%) 0px 1px 2px, rgb(38 38 38 / 16%) 0px 4px 8px;\n\n  img.load{\n    height: 25px;\n    width: 25px;\n    animation: ", " 2s linear infinite;\n    margin-right: 14px;\n  }\n  img.close{\n    position: absolute;\n    height: 25px;\n    width: 25px;\n    margin-right: 14px;\n    left: 265px;\n  }\n  img.close:hover{\n    opacity: 0.9;\n  }\n  svg.load{\n    height: 25px;\n    width: 25px;\n    animation: ", " 2s linear infinite;\n    margin-right: 14px;\n  }\n  svg.close{\n    position: absolute;\n    height: 25px;\n    width: 25px;\n    margin-right: 14px;\n    left: 265px;\n  }\n  svg.close:hover{\n    opacity: 0.9;\n  }\n  \n  .text{\n    width: 180px;\n  }\n"])), rotate, rotate);