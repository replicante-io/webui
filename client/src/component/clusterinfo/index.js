'use strict';
//@flow

import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Redirect, Route } from 'react-router-dom';

// Re-export actions and store values.
export { defaultState, reducer } from './store';
export { saga } from './saga';
export type { ClusterInfoStore } from './store';

import type { ClusterMeta } from '../dashboard/action';
import type { ClusterInfoStore } from './store';
import { fetchMeta } from './action';
import { NoDataIcon } from '../icons';
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


type Props = {
  cluster: ?ClusterMeta,
  dispatch: any,
  id: string,
  match: any,
};
export class InnerCluster extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.cluster) {
      this.props.dispatch(fetchMeta(this.props.id));
    }
  }

  renderComponent(meta: ClusterMeta) {
    let root = `${this.props.match.url}`;
    if (root.endsWith('/')) {
      root = root.substring(0, root.length - 1);
    }
    const discovery = `${root}/discovery`;
    const overview = `${root}/overview`;
    return (
      <div>
        <h1>{meta.cluster_display_name}</h1>
        {this.renderTabs()}
        {this.renderRoutes(meta)}
      </div>
    );
  }

  renderRoutes(meta: ClusterMeta) {
    let root = `${this.props.match.path}`;
    if (root.endsWith('/')) {
      root = root.substring(0, root.length - 1);
    }
    const discovery = `${root}/discovery`;
    const overview = `${root}/overview`;
    return (
      <div>
        <Route exact path={root} component={OverviewRedirect} />
        <Route path={overview} render={props => <Overview cluster={meta} {...props} />} />
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
    if (this.props.cluster) {
      return this.renderComponent(this.props.cluster);
    }
    return (
      <div className="text-center">
        <NoDataIcon />
        No information available. <br />
        If nothing shows up the cluster may not exist.
      </div>
    );
  }
}


/** Map the redux state to properties for the component. */
type PartialState = {
  clusterinfo: ClusterInfoStore,
}
export function mapStateToProps(state: PartialState, props: {match: any}) {
  const id = props.match.params.name;
  return {
    cluster: state.clusterinfo.meta[id] || null,
    id: id,
  };
}


const Cluster = connect(mapStateToProps, null)(InnerCluster);
export default Cluster;
