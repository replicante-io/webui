'use strict';
//@flow

import React from 'react';
import { connect } from 'react-redux';

import ClusterKinds from '../ClusterKinds';
import { NoDataIcon } from '../icons';

import { fetchMeta } from './action';

import type { ClusterMeta } from '../dashboard/action';
import type { ClusterInfoStore } from './store';


type Props = {
  cluster: ClusterMeta,
  dispatch: any,
  id: string,
};
export class InnerOverview extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.cluster) {
      this.props.dispatch(fetchMeta(this.props.id));
    }
  }

  renderData() {
    return (
        <div>
          <div>Cluster nodes: {this.props.cluster.nodes}</div>
          <div>
            Cluster type: <ClusterKinds kinds={this.props.cluster.kinds} />
          </div>
        </div>
    );
  }

  render() {
    if (this.props.cluster) {
      return this.renderData();
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
    cluster: state.clusterinfo.meta[id] || null,
    id: id,
  };
}


const Overview = connect(mapStateToProps, null)(InnerOverview);
export default Overview;
