"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _ErrorNotify = require("./types/ErrorNotify");
var _WaitingNotify = require("./types/WaitingNotify");
var _InfoNotify = require("./types/InfoNotify");
var _WarningNotify = require("./types/WarningNotify");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const NotifyComponents = {
  error: _ErrorNotify.ErrorNotify,
  waiting: _WaitingNotify.WaitingNotify,
  info: _InfoNotify.InfoNotify,
  warning: _WarningNotify.WarningNotify
};
class NotifyManager {
  static id() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
  static normalizeText(value) {
    if ( /*#__PURE__*/_react.default.isValidElement(value)) {
      // Если это React-компонент, возвращаем его как есть
      return value;
    }
    if (typeof value === 'string' || typeof value === 'number') {
      // Если это строка или число, преобразуем в строку
      return String(value);
    }
    if (Array.isArray(value)) {
      // Если это массив, обрабатываем каждый элемент рекурсивно
      return value.map((item, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.default.Fragment, {
        children: this.normalizeText(item)
      }, index));
    }
    if (typeof value === 'object' && value !== null) {
      // Если это объект, но не React-компонент, преобразуем в строку
      return JSON.stringify(value);
    }
    // Для всех остальных случаев (null, undefined) возвращаем пустую строку
    return '';
  }
  static createNotifyElement(id, type, text, time, onClick, onClose) {
    const normalizedText = this.normalizeText(text); // Преобразуем текст

    const Component = NotifyComponents[type] || NotifyComponents.info;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, {
      id: id,
      text: normalizedText,
      time: time,
      onClick: onClick,
      onClose: onClose
    });
  }
  static scheduleDeletion(id, time) {
    setTimeout(() => {
      NotifyManager.delete(id);
    }, time);
  }
  static addOrOnce(id, title, text, type, time, onClick, onClose) {
    var _NotifyManager$contai, _NotifyManager$contai2;
    let checkIfExists = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
    if (!NotifyManager.container) {
      console.error('NotifyManager: контейнер не привязан');
      return;
    }
    const finalId = id !== null && id !== void 0 ? id : NotifyManager.id();
    if (checkIfExists && (_NotifyManager$contai = (_NotifyManager$contai2 = NotifyManager.container).hasItem) !== null && _NotifyManager$contai !== void 0 && _NotifyManager$contai.call(_NotifyManager$contai2, finalId)) {
      return;
    }
    const notify = NotifyManager.createNotifyElement(finalId, type, text, time, onClick, onClose);
    NotifyManager.container.addItem(finalId, notify);
    NotifyManager.scheduleDeletion(finalId, time);
    return finalId;
  }
  static add(title, text, type, time, onClick, onClose) {
    return NotifyManager.addOrOnce(undefined, title, text, type, time, onClick, onClose);
  }
  static once(jobTypeId, title, text, type, time, onClick, onClose) {
    return NotifyManager.addOrOnce(jobTypeId, title, text, type, time, onClick, onClose, true);
  }
  static delete(jobTypeId) {
    var _NotifyManager$contai3;
    (_NotifyManager$contai3 = NotifyManager.container) === null || _NotifyManager$contai3 === void 0 || _NotifyManager$contai3.removeItem(jobTypeId);
  }
  static update(jobTypeId, percent) {
    var _NotifyManager$contai4;
    (_NotifyManager$contai4 = NotifyManager.container) === null || _NotifyManager$contai4 === void 0 || _NotifyManager$contai4.updateItem(jobTypeId, percent);
  }
  static bind(container) {
    this.container = container;
  }
}

// Динамическое создание методов для типов уведомлений
exports.default = NotifyManager;
_defineProperty(NotifyManager, "container", null);
['info', 'error', 'warning', 'loading'].forEach(type => {
  NotifyManager.prototype["".concat(type, "Once")] = function (id, title, text) {
    let time = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4000;
    let onClick = arguments.length > 4 ? arguments[4] : undefined;
    let onClose = arguments.length > 5 ? arguments[5] : undefined;
    return NotifyManager.once(id, title, text, type, time, onClick, onClose);
  };
  NotifyManager.prototype[type] = function (title, text) {
    let time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : type === 'loading' ? 999999999 : 4000;
    let onClick = arguments.length > 3 ? arguments[3] : undefined;
    let onClose = arguments.length > 4 ? arguments[4] : undefined;
    return NotifyManager.add(title, text, type, time, onClick, onClose);
  };
});