'use strict';
//@flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect, Route } from 'react-router-dom';

import Discovery from './discovery';
import Overview from './overview';


class OverviewRedirect extends React.Component<{match: any}> {
  render() {
    let root = `${this.props.match.url}`;
    if (root.endsWith('/')) {
      root = root.substring(0, root.length - 1);
    }
    const overview = `${root}/overview`;
    return <Redirect from={root} to={overview} />;
  }
}


type Props = {
  match: any
};
export class Cluster extends React.Component<Props> {
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
        <div className="cluster-tabs">
          <NavLink className="tab" to={overview}>Overview</NavLink>
          <NavLink className="tab" to={discovery}>Discovery</NavLink>
        </div>
        <div>
          <Route exact path={root} component={OverviewRedirect} />
          <Route path={overview} component={Overview} />
          <Route path={discovery} component={Discovery} />
        </div>
      </div>
    );
  }
}

export default Cluster;
