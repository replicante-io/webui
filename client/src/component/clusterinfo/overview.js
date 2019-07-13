'use strict';
//@flow

import React from 'react';
import { connect } from 'react-redux';

import ClusterKinds from '../ClusterKinds';
import { NoDataIcon } from '../icons';

import type { ClusterMeta } from '../dashboard/action';
import type { ClusterInfoStore } from './store';


type Props = {
  cluster: ClusterMeta,
  dispatch: any,
  id: string,
};
export class InnerOverview extends React.Component<Props> {
  render() {
    return (
        <div>
          <div>
            Cluster type: <ClusterKinds kinds={this.props.cluster.kinds} />
          </div>
          <div>Total number of shards in the cluster: {this.props.cluster.shards_count}</div>
          <div>
            Total number of nodes in the cluster: {this.props.cluster.nodes}
            <ul>
              <li>Of which have an agent down: {this.props.cluster.agents_down}</li>
              <li>Of which are down: {this.props.cluster.nodes_down}</li>
            </ul>
          </div>
        </div>
    );
  }
}


/** Map the redux state to properties passed to Button. */
type PartialProps = {
  cluster: ClusterMeta,
  match: any,
}
type PartialState = {
  clusterinfo: ClusterInfoStore,
}
export function mapStateToProps(state: PartialState, props: PartialProps) {
  const id = props.match.params.name;
  return {
    cluster: props.cluster,
    id: id,
  };
}


const Overview = connect(mapStateToProps, null)(InnerOverview);
export default Overview;
