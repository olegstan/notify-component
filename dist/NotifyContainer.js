import React, { Component, Fragment } from 'react';
import NotifyManager from './NotifyManager';
import Portal from "./Portal";
export default class NotifyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: {},
      needToRemove: []
    };
    NotifyManager.bind(this);
  }
  updateItem(key, percent) {
    this.setState(prv => {
      if (typeof this.state.children[key] !== 'undefined') {
        this.state.children[key].percent = percent;
      }
      return prv;
    });
  }
  removeItem(key) {
    this.setState(prv => {
      prv.needToRemove.push(key);
      return prv;
    }, () => {
      setTimeout(() => {
        this.setState(prv => {
          if (typeof this.state.children[key] !== 'undefined') {
            delete this.state.children[key];
            let index = this.state.needToRemove.indexOf(key);
            if (index !== -1) {
              delete prv.needToRemove[index];
            }
          }
          return prv;
        });
      }, 300);
    });
  }
  render() {
    let notifies = Object.values(this.state.children);
    return notifies.length > 0 && /*#__PURE__*/React.createElement(Portal, {
      id: 'notify'
    }, notifies.map(item => {
      if (item?.props?.id) {
        return /*#__PURE__*/React.createElement(Fragment, {
          key: item.props.id
        }, item);
      }
    }));
  }
}