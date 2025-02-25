"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Preload = exports.Content = void 0;
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _templateObject, _templateObject2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
const Preload = exports.Preload = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  border-top-right-radius: 6px;\n  border-top-left-radius: 6px;\n  position: relative;\n  width: 100%;\n  padding: 0;\n  \n  & > div{\n    background-color: #2196F3 !important;\n    height: 3px;\n    border-top-right-radius: 6px;\n    border-top-left-radius: 6px;\n    position: absolute;\n    top: 0;\n    transition: 1s width;\n  }\n  \n  &:hover{\n    opacity: 1;\n  }\n"])));
const Content = exports.Content = _styledComponents.default.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  padding: 15px 15px 15px 15px;\n"])));