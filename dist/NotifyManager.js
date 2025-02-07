"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Notify = _interopRequireDefault(require("./Notify"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class NotifyManager {
  static id() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
  static add(title, text, type, time, onClick, onClose) {
    if (!NotifyManager.container) {
      return;
    }
    const id = NotifyManager.id();
    const notify = /*#__PURE__*/(0, _jsxRuntime.jsx)(_Notify.default, {
      title: title,
      text: text,
      type: type,
      time: time,
      id: id,
      onClick: () => {
        if (typeof onClick === 'function') {
          onClick();
        }
      },
      onClose: () => {
        if (typeof onClose === 'function') {
          onClose();
        }
      }
    });

    // Добавляем уведомление через метод контейнера
    NotifyManager.container.addItem(id, notify);

    // По истечении времени уведомление удаляется
    setTimeout(() => {
      NotifyManager.delete(id);
    }, time);
    return id;
  }
  static once(jobTypeId, title, text, type, time, onClick, onClose) {
    if (!NotifyManager.container) {
      return;
    }

    // Если уведомление с данным идентификатором уже существует, повторно не добавляем
    if (NotifyManager.container.hasItem && NotifyManager.container.hasItem(jobTypeId)) {
      return;
    }
    const notify = /*#__PURE__*/(0, _jsxRuntime.jsx)(_Notify.default, {
      title: title,
      text: text,
      type: type,
      time: time,
      id: jobTypeId,
      onClick: () => {
        if (typeof onClick === 'function') {
          onClick();
        }
      },
      onClose: () => {
        if (typeof onClose === 'function') {
          onClose();
        }
      }
    });
    NotifyManager.container.addItem(jobTypeId, notify);
    setTimeout(() => {
      NotifyManager.delete(jobTypeId);
    }, time);
    return jobTypeId;
  }
  static infoOnce(id, title, text) {
    let time = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4000;
    let onClick = arguments.length > 4 ? arguments[4] : undefined;
    let onClose = arguments.length > 5 ? arguments[5] : undefined;
    return NotifyManager.once(id, title, text, 'info', time, onClick, onClose);
  }
  static errorOnce(id, title, text) {
    let time = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4000;
    let onClick = arguments.length > 4 ? arguments[4] : undefined;
    let onClose = arguments.length > 5 ? arguments[5] : undefined;
    return NotifyManager.once(id, title, text, 'error', time, onClick, onClose);
  }
  static info(title, text) {
    let time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4000;
    let onClick = arguments.length > 3 ? arguments[3] : undefined;
    let onClose = arguments.length > 4 ? arguments[4] : undefined;
    return NotifyManager.add(title, text, 'info', time, onClick, onClose);
  }
  static warning(title, text) {
    let time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4000;
    let onClick = arguments.length > 3 ? arguments[3] : undefined;
    let onClose = arguments.length > 4 ? arguments[4] : undefined;
    return NotifyManager.add(title, text, 'warning', time, onClick, onClose);
  }
  static error(title, text) {
    let time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4000;
    let onClick = arguments.length > 3 ? arguments[3] : undefined;
    let onClose = arguments.length > 4 ? arguments[4] : undefined;
    return NotifyManager.add(title, text, 'error', time, onClick, onClose);
  }
  static delete(jobTypeId) {
    if (!NotifyManager.container) {
      return;
    }
    // Контейнер сам отвечает за обновление уведомления (например, установка флага needRemove) и его последующее удаление
    NotifyManager.container.removeItem(jobTypeId);
  }
  static update(jobTypeId, percent) {
    if (!NotifyManager.container) {
      return;
    }
    NotifyManager.container.updateItem(jobTypeId, percent);
  }
  static bind(container) {
    this.container = container;
  }
}
exports.default = NotifyManager;
_defineProperty(NotifyManager, "container", null);