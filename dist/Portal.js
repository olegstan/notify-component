import React, { Component } from 'react';
import ReactDOM from 'react-dom';
export default class Portal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.root = document.getElementById(this.props.id);
  }
  componentDidMount() {
    try {
      this.root.appendChild(this.el);
    } catch (e) {}
  }
  componentWillUnmount() {
    try {
      this.root.removeChild(this.el);
    } catch (e) {}
  }
  render() {
    return /*#__PURE__*/ReactDOM.createPortal(this.props.children, this.el);
  }
}