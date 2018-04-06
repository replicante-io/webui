'use strict';
//@flow

import { Component } from 'react';
import React from 'react';


// While refreshing: <i className="fas fa-circle-notch"></i>
class FetchButton extends React.Component<{}> {
  render() {
    return (
      <button type="button" className="btn btn-outline-secondary fetch-button">
        <i className="fas fa-redo-alt"></i>
      </button>
    );
  }
}


export default FetchButton;
