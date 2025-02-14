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
class NotifyManager {
  static id() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Создаёт React-элемент уведомления в зависимости от типа.
   * Параметр title оставляем для совместимости (но в текущей реализации не используется).
   */
  static createNotifyElement(id, type, text, time, onClick, onClose) {
    switch (type) {
      case 'error':
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ErrorNotify.ErrorNotify, {
          id: id,
          text: text,
          time: time,
          onClick: onClick,
          onClose: onClose
        });
      case 'waiting':
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_WaitingNotify.WaitingNotify, {
          id: id,
          text: text,
          time: time,
          onClick: onClick,
          onClose: onClose
        });
      case 'warning':
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_WarningNotify.WarningNotify, {
          id: id,
          text: text,
          time: time,
          onClick: onClick,
          onClose: onClose
        });
      case 'info':
      default:
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_InfoNotify.InfoNotify, {
          id: id,
          text: text,
          time: time,
          onClick: onClick,
          onClose: onClose
        });
    }
  }

  /**
   * Устанавливает автоматическое удаление уведомления через заданное время.
   */
  static scheduleDeletion(id, time) {
    setTimeout(() => {
      NotifyManager.delete(id);
    }, time);
  }

  /**
   * Добавляет уведомление с новым сгенерированным id.
   */
  static add(title, text, type, time, onClick, onClose) {
    if (!NotifyManager.container) {
      console.error('NotifyManager: контейнер не привязан');
      return;
    }
    const id = NotifyManager.id();
    const notify = NotifyManager.createNotifyElement(id, type, text, time, onClick, onClose);
    NotifyManager.container.addItem(id, notify);
    NotifyManager.scheduleDeletion(id, time);
    return id;
  }

  /**
   * Добавляет уведомление, если уведомление с таким id ещё не существует.
   */
  static once(jobTypeId, title, text, type, time, onClick, onClose) {
    if (!NotifyManager.container) {
      console.error('NotifyManager: контейнер не привязан');
      return;
    }
    if (NotifyManager.container.hasItem && NotifyManager.container.hasItem(jobTypeId)) {
      return;
    }
    const notify = NotifyManager.createNotifyElement(jobTypeId, type, text, time, onClick, onClose);
    NotifyManager.container.addItem(jobTypeId, notify);
    NotifyManager.scheduleDeletion(jobTypeId, time);
    return jobTypeId;
  }

  // Обёртки для конкретных типов уведомлений

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
  static loading(title, text) {
    let time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 999999999;
    let onClick = arguments.length > 3 ? arguments[3] : undefined;
    let onClose = arguments.length > 4 ? arguments[4] : undefined;
    return NotifyManager.add(title, text, 'waiting', time, onClick, onClose);
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