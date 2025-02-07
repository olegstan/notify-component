"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _NotifyManager = _interopRequireDefault(require("./NotifyManager"));
var _Portal = _interopRequireDefault(require("./Portal"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const NotifyContainer = () => {
  const [childrenMap, setChildrenMap] = (0, _react.useState)({});

  // Метод для добавления уведомления
  const addItem = (0, _react.useCallback)((id, notify) => {
    setChildrenMap(prev => ({
      ...prev,
      [id]: notify
    }));
  }, []);

  // Метод для удаления уведомления с анимацией
  const removeItem = (0, _react.useCallback)(id => {
    // Этап 1: Обновляем уведомление, чтобы запустить анимацию скрытия
    setChildrenMap(prev => {
      const newChildren = {
        ...prev
      };
      if (newChildren[id]) {
        newChildren[id] = /*#__PURE__*/_react.default.cloneElement(newChildren[id], {
          needRemove: true
        });
      }
      return newChildren;
    });

    // Этап 2: После задержки удаляем уведомление окончательно
    setTimeout(() => {
      setChildrenMap(prev => {
        const newChildren = {
          ...prev
        };
        delete newChildren[id];
        return newChildren;
      });
    }, 300); // время задержки должно совпадать с длительностью анимации
  }, []);

  // Метод для обновления уведомления (например, процент выполнения)
  const updateItem = (0, _react.useCallback)((id, percent) => {
    setChildrenMap(prev => {
      if (prev[id]) {
        return {
          ...prev,
          [id]: /*#__PURE__*/_react.default.cloneElement(prev[id], {
            percent
          })
        };
      }
      return prev;
    });
  }, []);

  // Метод для проверки наличия уведомления
  const hasItem = (0, _react.useCallback)(id => {
    return !!childrenMap[id];
  }, [childrenMap]);

  // Привязываем методы к NotifyManager
  (0, _react.useEffect)(() => {
    _NotifyManager.default.bind({
      addItem,
      removeItem,
      updateItem,
      hasItem
    });
  }, [addItem, removeItem, updateItem, hasItem]);
  const notifies = Object.values(childrenMap);
  if (notifies.length === 0) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Portal.default, {
    id: "notify",
    children: notifies.map(item => {
      var _item$props;
      if (item !== null && item !== void 0 && (_item$props = item.props) !== null && _item$props !== void 0 && _item$props.id) {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Fragment, {
          children: item
        }, item.props.id);
      }
      return null;
    })
  });
};
var _default = exports.default = NotifyContainer;