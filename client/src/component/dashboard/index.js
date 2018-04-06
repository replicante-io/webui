'use strict';
//@flow

import { Component } from 'react';
import React from 'react';

import { FetchButton } from '../datafetch';


class Dashboard extends React.Component<{}> {
  renderClusters() {
    return (
      <div className="row">
        <div className="col">
          <div className="card text-center">
            <div className="card-header">
              Largest clusters
              <FetchButton />
            </div>
            <div className="card-body">
              <p className="card-text large-icon"><i className="fas fa-chart-area"></i></p>
              <p className="card-text">No data available</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderEvents() {
    return (
      <div className="row space-below">
        <div className="col">
          <div className="card text-center">
            <div className="card-header">
              Latest events
              <FetchButton />
            </div>
            <div className="card-body">
              <p className="card-text large-icon"><i className="fas fa-chart-area"></i></p>
              <p className="card-text">No data available</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderOverview() {
    return (
      <div className="row space-below">
        <div className="col">
          <div className="card text-center">
            <div className="card-header">
              Overview of your systems
              <FetchButton />
            </div>
            <div className="card-body">
              <p className="card-text large-icon"><i className="fas fa-chart-area"></i></p>
              <p className="card-text">No data available</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="overview-container">
        {this.renderOverview()}
        {this.renderEvents()}
        {this.renderClusters()}
      </div>
    );
  }
}

export default Dashboard;
