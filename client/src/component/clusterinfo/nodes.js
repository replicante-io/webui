'use strict';
//@flow

import React from 'react';
import { connect } from 'react-redux';

import { NoDataIcon } from '../icons';
import { fetchNodes } from './action';

import type { ClusterInfoStore } from './store';
import type { NodeInfo } from './action';


type Props = {
  nodes: ?Array<NodeInfo>,
  dispatch: any,
  id: string,
};
export class InnerNodes extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.nodes) {
      this.props.dispatch(fetchNodes(this.props.id));
    }
  }

  renderData(nodes: Array<NodeInfo>) {
    let rows = nodes.map((node, idx) => {
      return (
        <tr key={idx}>
          <td>{node.node_id}</td>
          <td>{node.kind}</td>
          <td>{node.version}</td>
        </tr>
      );
    });
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Node ID</th>
            <th>Software Kind</th>
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
    if (this.props.nodes) {
      return this.renderData(this.props.nodes);
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
    nodes: state.clusterinfo.nodes[id],
    id: id,
  };
}


const Nodes = connect(mapStateToProps, null)(InnerNodes);
export default Nodes;
