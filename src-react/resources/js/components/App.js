import React from 'react';
import { Component } from 'react';
import Navigation from '../containers/Navigation';

export default class CurrentApp extends Component {
  render() {
    return (
      <div>
      	<Navigation />
      	{this.props.children}
      </div>
    );
  }
}

