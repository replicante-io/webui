'use strict';
//@flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect, Route } from 'react-router-dom';

// Re-export actions and store values.
export { defaultState, reducer } from './store';
export { saga } from './saga';
export type { ClusterInfoStore } from './store';

import Discovery from './discovery';
import Overview from './overview';


export class OverviewRedirect extends React.Component<{match: any}> {
  render() {
    let root = `${this.props.match.url}`;
    if (root.endsWith('/')) {
      root = root.substring(0, root.length - 1);
    }
    const overview = `${root}/overview`;
    return <Redirect from={root} to={overview} />;
  }
}


export class Cluster extends React.Component<{match: any}> {
  renderRoutes() {
    let root = `${this.props.match.path}`;
    if (root.endsWith('/')) {
      root = root.substring(0, root.length - 1);
    }
    const discovery = `${root}/discovery`;
    const overview = `${root}/overview`;
    return (
      <div>
        <Route exact path={root} component={OverviewRedirect} />
        <Route path={overview} component={Overview} />
        <Route path={discovery} component={Discovery} />
      </div>
    );
  }

  renderTabs() {
    let root = `${this.props.match.url}`;
    if (root.endsWith('/')) {
      root = root.substring(0, root.length - 1);
    }
    const discovery = `${root}/discovery`;
    const overview = `${root}/overview`;
    return (
      <div className="cluster-tabs">
        <NavLink className="tab" to={overview}>Overview</NavLink>
        <NavLink className="tab" to={discovery}>Discovery</NavLink>
      </div>
    );
  }

  render() {
    let root = `${this.props.match.url}`;
    if (root.endsWith('/')) {
      root = root.substring(0, root.length - 1);
    }
    const discovery = `${root}/discovery`;
    const overview = `${root}/overview`;
    return (
      <div>
        <h1>{this.props.match.params.name}</h1>
        {this.renderTabs()}
        {this.renderRoutes()}
      </div>
    );
  }
}

export default Cluster;
