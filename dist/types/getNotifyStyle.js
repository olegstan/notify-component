"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const getNotifyStyle = (rendered, needRemove) => {
  const style = {};
  if (rendered) style.left = 0;
  if (needRemove) style.left = '320px';
  return style;
};
var _default = exports.default = getNotifyStyle;