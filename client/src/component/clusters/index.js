'use strict';
//@flow

import React from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import ClusterRow from '../ClusterRow';

import { CLUSTERS_SEARCH } from './action';
import { searchClusters } from './action';

import type { ClusterMeta } from '../dashboard/action';
import type { ClustersStore } from './store';

// Re-export actions and store values.
export { defaultState, reducer } from './store';
export { saga } from './saga';
export type { ClustersStore } from './store';


const SEARCH_TIMEOUT = 500;  // ms


type Props = {
  clusters: Array<ClusterMeta>,
  dispatch: any,
  search: string,
};

type State = {
  searchTimeoutHandle: ?TimeoutID,
};


export class InnerClusters extends React.Component<Props, State> {
  input: any;

  constructor() {
    super();
    this.state = {
      searchTimeoutHandle: null,
    };
  };

  componentDidMount() {
    if (!this.props.clusters.length && !this.props.search) {
      this.props.dispatch(searchClusters(''));
    }
  }

  handleChange(e: SyntheticInputEvent<HTMLInputElement>) {
    let search = e.currentTarget.value;
    if (this.state.searchTimeoutHandle) {
      clearTimeout(this.state.searchTimeoutHandle);
    }
    let timeoutHandle = setTimeout(() => {
      this.props.dispatch(searchClusters(search));
      this.setState({searchTimeoutHandle: null});
    }, SEARCH_TIMEOUT);
    this.setState({searchTimeoutHandle: timeoutHandle});
  };

  renderList() {
    let rows = this.props.clusters.map((cluster) => {
      return <ClusterRow key={cluster.cluster_id} {...cluster} />;
    });
    return (
      <div className="card-body text-center">
        {rows}
      </div>
    );
  }

  renderNoResults() {
    return (
      <div className="card-body text-center">
        <p className="card-text large-icon"><FontAwesomeIcon icon={faSearch} /></p>
        <p className="card-text">
          No clusters were found.<br />
          Try searching something else.
        </p>
      </div>
    );
  };

  render() {
    const body = this.props.clusters.length ? this.renderList() : this.renderNoResults();
    return (
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">
              Clusters
              <input type="text" className="cluster-search"
                  placeholder="Search ..."
                  defaultValue={this.props.search}
                  onChange={this.handleChange.bind(this)}
                  ref={(node) => this.input = node}
              />
            </div>
            {body}
          </div>
        </div>
      </div>
    );
  };
}


/** Map the redux state to properties passed to Button. */
type PartialState = {
  clusters: ClustersStore,
}
export function mapStateToProps(state: PartialState) {
  return {
    clusters: state.clusters.clusters,
    search: state.clusters.search,
  };
}


const Clusters = connect(mapStateToProps, null)(InnerClusters);
export default Clusters;
