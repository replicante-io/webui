'use strict';
//@flow

import 'babel-polyfill';
import 'bootstrap';
import '../assets/fontawesome-all';
import '../assets/main.scss';

import { Component } from 'react';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';

import NavigationBar from './component/NavigationBar';
import WorkInProgress from './component/WorkInProgress';
import store from './store';

import ClusterInfo from './component/clusterinfo';
import Clusters from './component/clusters';
import Dashboard from './component/dashboard';
import Events from './component/events';


class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <NavigationBar />
            <div className="container">
              <Route exact path="/" component={Dashboard} />
              <Route path="/admin" component={WorkInProgress} />
              <Route path="/automations" component={WorkInProgress} />
              <Route exact path="/clusters" component={Clusters} />
              <Route path="/clusters/:name" component={ClusterInfo} />
              <Route path="/events" component={Events} />
            </div>
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
