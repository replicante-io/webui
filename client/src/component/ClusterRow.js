'use strict';
//@flow

import React from 'react';
import { Link } from 'react-router-dom';

import ClusterKinds from './ClusterKinds';
import type { ClusterMeta } from './dashboard/action';


class ClusterRow extends React.Component<ClusterMeta> {
  render() {
    const link = `/clusters/${this.props.cluster_id}`;
    return (
      <div className="row cluster-item">
        <div className="col">
          <p><Link to={link}>{this.props.cluster_display_name}</Link></p>
          <small>Name</small>
        </div>
        <div className="col">
          <p>{this.props.shards_count}</p>
          <small>Shards</small>
        </div>
        <div className="col">
          <p>{this.props.nodes}</p>
          <small>Nodes</small>
        </div>
        <div className="col">
          <p><ClusterKinds kinds={this.props.kinds} /></p>
          <small>{this.props.kinds.join(', ')}</small>
        </div>
      </div>
    );
  }
}
export default ClusterRow;
