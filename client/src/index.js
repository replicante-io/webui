'use strict';

import 'bootstrap';
import '../assets/main.scss';

import { Component } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';


class AppContainer extends Component {
  render() {
    return (
      <div>Adding React</div>
    );
  }
}


const wrapper = document.getElementById("app");
if (wrapper) {
  ReactDOM.render(<AppContainer />, wrapper);
} else {
  console.error("Failed to locate application wrapper element");
}
