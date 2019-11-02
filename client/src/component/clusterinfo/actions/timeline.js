'use strict';
//@flow

import React from 'react';
import ReactJson from 'react-json-view';
import { connect } from 'react-redux';

import type { ActionDetails } from '../action';
import type { ClusterInfoStore } from '../store';

import { NoDataIcon } from '../../icons';

import { defaultActionsStore } from '../store';
import { fetchAction } from '../action';


type Props = {
  action: ?ActionDetails,
  action_id: string,
  cluster_id: string,
  dispatch: any,
};
export class InnerTimeline extends React.Component<Props> {
  render() {
    if (this.props.action) {
      return this.renderData(this.props.action);
    }
    if (!this.props.action) {
      // Fetch action data if it is not available.
      this.props.dispatch(fetchAction(this.props.cluster_id, this.props.action_id));
    }
    return (
      <div className="text-center timeline-container">
        <NoDataIcon />
        No information available. <br />
        If nothing shows up the action may not exist.
      </div>
    );
  }

  renderData(details: ActionDetails) {
    let action = details.action;
    let timeline = details.history.map((item, idx) => {
      return {
        id: idx,
        timestamp: new Date(item.timestamp),
        state: item.state,
      };
    });
    let history = details.history.map((item, idx) => {
      return (
        <tr className="timeline-container" key={idx}>
          <td>{item.timestamp}</td>
          <td>{item.state}</td>
          <td>
            <ReactJson
                collapsed={0}
                name={false}
                src={item.state_payload || {}}
            />
          </td>
        </tr>
      );
    });
    return (
      <div className="timeline-container">
        <div>Action ID: {action.action_id}</div>
        <div>Current status: {action.state}</div>
        <div>Created: {action.created_ts}</div>
        <div>Finished: {action.finished_ts || "Ongoing"}</div>
        <h4 className="space-above">Action History</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Enter time</th>
              <th>State</th>
              <th>Payload</th>
            </tr>
          </thead>
          <tbody>{history}</tbody>
        </table>
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
  let action = state.clusterinfo.actions[cluster_id];
  if (!action) {
    action = defaultActionsStore();
  }
  let details = action.details;
  if (details && details.action.action_id !== action_id) {
    // Store has a different action loaded so don't use it.
    details = null;
  }
  return {
    action: details,
    action_id,
    cluster_id,
  };
}


const Timeline = connect(mapStateToProps, null)(InnerTimeline);
export default Timeline;
