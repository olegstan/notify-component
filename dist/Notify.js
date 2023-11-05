import React, { Component } from 'react';
import { NotifyItem } from './styles';
import NotifyManager from "./NotifyManager";
import { ReactComponent as CloseInfo } from './images/ic_close_info.svg';
import { ReactComponent as CloseError } from './images/ic_close_error.svg';
class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rendered: false
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        rendered: true
      });
    }, 300);
  }
  render() {
    let style = {};
    if (this.state.rendered) {
      style.left = 0;
    }
    if (this.props.needRemove === true) {
      style.left = '320px';
    }
    switch (this.props.type) {
      case 'info':
        return /*#__PURE__*/React.createElement(NotifyItem, {
          style: style,
          className: 'notification notification-info'
        }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, this.props.text), /*#__PURE__*/React.createElement(CloseInfo, {
          className: "close",
          onClick: () => {
            NotifyManager.delete(this.props.id);
          }
        })));
      case 'error':
        return /*#__PURE__*/React.createElement(NotifyItem, {
          style: style,
          onClick: this.props.onClick,
          className: 'notification notification-error'
        }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, this.props.text), /*#__PURE__*/React.createElement(CloseError, {
          className: "close",
          onClick: () => {
            NotifyManager.delete(this.props.id);
          }
        })));
      case 'waiting':
        return /*#__PURE__*/React.createElement(NotifyItem, {
          style: style,
          onClick: this.props.onClick,
          className: 'notification notification-waiting'
        }, /*#__PURE__*/React.createElement("div", {
          className: "preload"
        }, /*#__PURE__*/React.createElement("div", {
          className: "",
          style: {
            width: this.props.percent > 0 ? this.props.percent + "%" : "0%"
          }
        })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
          className: "load",
          src: require('./images/loader.svg').default,
          alt: ""
        }), /*#__PURE__*/React.createElement(CloseInfo, {
          className: "close",
          onClick: () => {
            NotifyManager.delete(this.props.id);
            // this.props.handleRemoveJob(this.props.id)
          }
        }), /*#__PURE__*/React.createElement("div", null, this.props.text)));
    }
    return '';
  }
}
export default Notify;