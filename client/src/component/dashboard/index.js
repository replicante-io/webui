'use strict';
//@flow

import { Component } from 'react';
import React from 'react';

import { FetchButton } from '../datafetch';
import Clusters from './clusters';


export function REPLACE_ME(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
}


class Dashboard extends React.Component<{}> {
  renderEvents() {
    return (
      <div className="row space-below">
        <div className="col">
          <div className="card text-center">
            <div className="card-header">
              Latest events
              <FetchButton id="recent-events" request={REPLACE_ME} />
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
              <FetchButton id="overview" request={REPLACE_ME} />
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
        <Clusters />
      </div>
    );
  }
}

export default Dashboard;
