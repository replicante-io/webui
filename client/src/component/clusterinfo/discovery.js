'use strict';
//@flow

import React from 'react';
import ReactJson from 'react-json-view';
import { connect } from 'react-redux';

import { NoDataIcon } from '../icons';

import { fetchDiscovery } from './action';

import type { ClusterDiscovery } from './action';
import type { ClusterInfoStore } from './store';


type Props = {
  discovery: ?ClusterDiscovery,
  dispatch: any,
  id: string,
};
export class InnerDiscovery extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.discovery) {
      this.props.dispatch(fetchDiscovery(this.props.id));
    }
  }

  renderData() {
    return (
        <div className="codeblock">
          <ReactJson
              collapsed={false}
              name={false}
              src={this.props.discovery}
          />
        </div>
    );
  }

  render() {
    if (this.props.discovery) {
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
    discovery: state.clusterinfo.discovery[id] || null,
    id: id,
  };
}


const Discovery = connect(mapStateToProps, null)(InnerDiscovery);
export default Discovery;
