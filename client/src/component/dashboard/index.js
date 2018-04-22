'use strict';
//@flow

import React from 'react';

import { FetchButton } from '../datafetch';
import Clusters from './clusters';

// Re-export actions and store values.
export { defaultState, reducer } from './store';
export type { DashboardStore } from './store';


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
          <div className="card">
            <div className="card-header">
              Latest events
              <FetchButton id="recent-events" request={REPLACE_ME} />
            </div>

            <div className="card-body text-center">
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
        {this.renderEvents()}
        <Clusters />
      </div>
    );
  }
}

export default Dashboard;
