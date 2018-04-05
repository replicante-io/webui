'use strict';
//@flow

import 'bootstrap';
import '../assets/main.scss';

import { Component } from 'react';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';

import NavigationBar from './component/NavigationBar';
import store from './store';


class TODO extends Component<{}> {
  render() {
    return (<div>TODO</div>);
  }
}


class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <NavigationBar />
            <Route exact path="/" component={TODO} />
            <Route path="/clusters" component={TODO} />
            <Route path="/events" component={TODO} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}


const wrapper = document.getElementById("app");
if (wrapper) {
  ReactDOM.render(<App />, wrapper);
} else {
  console.error("Failed to locate application wrapper element");
}
