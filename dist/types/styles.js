"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Preload = exports.Content = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _templateObject, _templateObject2;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
const Preload = exports.Preload = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  border-top-right-radius: 6px;\n  border-top-left-radius: 6px;\n  position: relative;\n  width: 100%;\n  padding: 0;\n  \n  & > div{\n    background-color: #2196F3 !important;\n    height: 3px;\n    border-top-right-radius: 6px;\n    border-top-left-radius: 6px;\n    position: absolute;\n    top: 0;\n    transition: 1s width;\n  }\n  \n  &:hover{\n    opacity: 1;\n  }\n"])));
const Content = exports.Content = _styledComponents.default.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  padding: 15px 15px 15px 15px;\n"])));