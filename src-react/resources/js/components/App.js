import React from 'react';
import { Component } from 'react';

export default class CurrentApp extends Component {
  render() {
    return (
      <div>
      	{this.props.children}
      </div>
    );
  }
}

