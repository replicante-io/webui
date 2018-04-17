'use strict';
//@flow

import React from 'react';
import { connect } from 'react-redux';

import { NoDataIcon } from '../icons';

import type { ClusterMeta } from '../dashboard/action';
import type { ClusterInfoStore } from './store';


type Props = {
  cluster: ClusterMeta,
  id: string,
};
export class InnerOverview extends React.Component<Props> {
  renderData() {
    return (
        <div>
          TODO: data overview for {this.props.id}
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
  return {
    cluster: null,
    id: props.match.params.name,
  };
}


const Overview = connect(mapStateToProps, null)(InnerOverview);
export default Overview;
