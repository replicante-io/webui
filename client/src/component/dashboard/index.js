'use strict';
//@flow

import React from 'react';

import Clusters from './clusters';
import Events from './events';

// Re-export actions and store values.
export { defaultState, reducer } from './store';
export type { DashboardStore } from './store';


class Dashboard extends React.Component<{}> {
  render() {
    return (
      <div className="overview-container">
        <Events />
        <Clusters />
      </div>
    );
  }
}

export default Dashboard;
