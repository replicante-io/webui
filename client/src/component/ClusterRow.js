'use strict';
//@flow

import React from 'react';
import { Link } from 'react-router-dom';

import ClusterKinds from './ClusterKinds';
import type { ClusterMeta } from './dashboard/action';


type Props = {
  meta: ClusterMeta,
};
class ClusterRow extends React.Component<Props> {
  render() {
    const link = `/clusters/${this.props.meta.cluster_id}`;
    return (
      <div className="row cluster-item">
        <div className="col">
          <p><Link to={link}>{this.props.meta.cluster_display_name}</Link></p>
          <small>Name</small>
        </div>
        <div className="col">
          <p>{this.props.meta.shards_count}</p>
          <small>Shards</small>
        </div>
        <div className="col">
          <p>{this.props.meta.nodes}</p>
          <small>Nodes</small>
        </div>
        <div className="col">
          <p><ClusterKinds kinds={this.props.meta.kinds} /></p>
          <small>{this.props.meta.kinds.join(', ')}</small>
        </div>
      </div>
    );
  }
}
export default ClusterRow;
