'use strict';
//@flow

import 'bootstrap';
import '../assets/main.scss';

import { Component } from 'react';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import store from './store';


class AppContainer extends Component<{}> {
  render() {
    return (
      <div>Adding React</div>
    );
  }
}


const rootComponent = (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);


const wrapper = document.getElementById("app");
if (wrapper) {
  ReactDOM.render(rootComponent, wrapper);
} else {
  console.error("Failed to locate application wrapper element");
}
