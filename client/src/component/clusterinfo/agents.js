'use strict';
//@flow

import React from 'react';
import { connect } from 'react-redux';

import { NoDataIcon } from '../icons';
import { fetchAgents } from './action';

import type { AgentDetails } from './action';
import type { ClusterDiscovery } from './action';
import type { ClusterInfoStore } from './store';


type Props = {
  agents: ?Array<AgentDetails>,
  dispatch: any,
  id: string,
};
export class InnerAgents extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.agents) {
      this.props.dispatch(fetchAgents(this.props.id));
    }
  }

  renderData(agents: Array<AgentDetails>) {
    let rows = agents.map((agent, idx) => {
      return (
        <tr key={idx}>
          <td>{agent.host}</td>
          <td>
            {agent.status.code}<br/>
            {agent.status.data ? <small>{agent.status.data}</small> : null}
          </td>
          <td>
            {agent.version_number ? <div>SemVer: {agent.version_number}</div> : null}
            {agent.version_checkout ? <div>Git SHA: {agent.version_checkout}</div> : null}
            {agent.version_taint ? <div>Git taint indicator: {agent.version_taint}</div> : null}
          </td>
        </tr>
      );
    });
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Address</th>
            <th>Status</th>
            <th>Version</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }

  render() {
    if (this.props.agents) {
      return this.renderData(this.props.agents);
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

/** Map the redux state to properties passed to Button. */
type PartialState = {
  clusterinfo: ClusterInfoStore,
}
export function mapStateToProps(state: PartialState, props: {match: any}) {
  const id = props.match.params.name;
  return {
    agents: state.clusterinfo.agents[id],
    id: id,
  };
}


const Agents = connect(mapStateToProps, null)(InnerAgents);
export default Agents;
