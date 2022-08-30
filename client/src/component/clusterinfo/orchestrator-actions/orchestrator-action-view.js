'use strict';
//@flow

import React from 'react';
import ReactJson from 'react-json-view';
import { connect } from 'react-redux';

import type { OrchestratorAction } from '../action';
import type { ClusterInfoStore } from '../store';

import { NoDataIcon } from '../../icons';

import { defaultOrchestratorActionsStore } from '../store';
import { fetchOrchestratorAction } from '../action';


type Props = {
  action: ?OrchestratorAction,
  action_id: string,
  cluster_id: string,
  dispatch: any,
};
export class InnerOrchestratorActionView extends React.Component<Props> {
  render() {
    if (this.props.action) {
      return this.renderData(this.props.action);
    }
    if (!this.props.action) {
      // Fetch action data if it is not available.
      this.props.dispatch(fetchOrchestratorAction(this.props.cluster_id, this.props.action_id));
    }
    return (
      <div className="text-center timeline-container">
        <NoDataIcon />
        No information available. <br />
        If nothing shows up the orchestrator action may not exist.
      </div>
    );
  }

  renderData(action: OrchestratorAction) {
    return (
      <div className="timeline-container">
        <div>Action ID: {action.action_id}</div>
        <div>Current status: {action.state}</div>
        <div>Created: {action.created_ts}</div>
        <div>Finished: {action.finished_ts || "Ongoing"}</div>

        <h4>Orchestrator Action Record</h4>
        <ReactJson collapsed={1} name={false} src={action} />
      </div>
    );
  }
}

/** Map the redux state to properties passed to Button. */
type PartialState = {
  clusterinfo: ClusterInfoStore,
};
export function mapStateToProps(state: PartialState, props: {match: any}) {
  const action_id = props.match.params.action;
  const cluster_id = props.match.params.name;
  let action = state.clusterinfo.orchestrator_actions[cluster_id];
  if (!action) {
    action = defaultOrchestratorActionsStore();
  }
  let details = action.details;
  if (details && details.action_id !== action_id) {
    // Store has a different action loaded so don't use it.
    details = null;
  }
  return {
    action: details,
    action_id,
    cluster_id,
  };
}


const OrchestratorActionView = connect(mapStateToProps, null)(InnerOrchestratorActionView);
export default OrchestratorActionView;
