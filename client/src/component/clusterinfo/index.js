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
import Actions from './actions';
import Agents from './agents';
import Discovery from './discovery';
import Events from './events';
import Nodes from './nodes';
import OrchestrateReport from './orchestrate-report';
import OrchestratorActions from './orchestrator-actions';
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
    const actions = `${root}/actions`;
    const agents = `${root}/agents`;
    const discovery = `${root}/discovery`;
    const events = `${root}/events`;
    const nodes = `${root}/nodes`;
    const orchestrate_report = `${root}/orchestrate-report`;
    const orchestrator_actions = `${root}/orchestrators-actions`;
    const overview = `${root}/overview`;
    return (
      <div>
        <Route exact path={root} component={OverviewRedirect} />
        <Route path={overview} render={props => <Overview cluster={meta} {...props} />} />
        <Route path={discovery} component={Discovery} />
        <Route path={agents} component={Agents} />
        <Route path={nodes} component={Nodes} />
        <Route path={events} component={Events} />
        <Route path={actions} component={Actions} />
        <Route path={orchestrator_actions} component={OrchestratorActions} />
        <Route path={orchestrate_report} component={OrchestrateReport} />
      </div>
    );
  }

  renderTabs() {
    let root = `${this.props.match.url}`;
    if (root.endsWith('/')) {
      root = root.substring(0, root.length - 1);
    }
    const actions = `${root}/actions`;
    const agents = `${root}/agents`;
    const discovery = `${root}/discovery`;
    const events = `${root}/events`;
    const nodes = `${root}/nodes`;
    const orchestrate_report = `${root}/orchestrate-report`;
    const orchestrator_actions = `${root}/orchestrators-actions`;
    const overview = `${root}/overview`;
    return (
      <div className="cluster-tabs">
        <NavLink className="tab" to={overview}>Overview</NavLink>
        <NavLink className="tab" to={discovery}>Discovery</NavLink>
        <NavLink className="tab" to={agents}>Agents</NavLink>
        <NavLink className="tab" to={nodes}>Nodes</NavLink>
        <NavLink className="tab" to={events}>Events</NavLink>
        <NavLink className="tab" to={actions}>Actions</NavLink>
        <NavLink className="tab" to={orchestrator_actions}>Orchestrator Actions</NavLink>
        <NavLink className="tab" to={orchestrate_report}>Orchestrate Report</NavLink>
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
