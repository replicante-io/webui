'use strict';
//@flow

import { Component } from 'react';
import React from 'react';

import { NavLink } from 'react-router-dom';


const NAVBAR_TOGGLE_TAG = 'navbarNavAltMarkup';


class NavigationBar extends Component<{}> {
  renderItems() {
    return (
      <div className="collapse navbar-collapse" id={NAVBAR_TOGGLE_TAG}>
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/" exact={true}>Overview</NavLink>
          <NavLink className="nav-item nav-link" to="/clusters">Clusters</NavLink>
          <NavLink className="nav-item nav-link" to="/events">Events</NavLink>
          <NavLink className="nav-item nav-link" to="/automations">Automations</NavLink>
          <NavLink className="nav-item nav-link" to="/admin">Admin</NavLink>
        </div>
      </div>
    );
  }

  renderToggleButton() {
    return (
      <button className="navbar-toggler" type="button" data-toggle="collapse"
              data-target={"#" + NAVBAR_TOGGLE_TAG} aria-controls={NAVBAR_TOGGLE_TAG}
              aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    );
  }

  render() {
    return (
      <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-dark">
        {this.renderToggleButton()}
        {this.renderItems()}
      </nav>
    );
  }
}


export default NavigationBar;
