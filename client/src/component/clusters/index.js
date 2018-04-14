'use strict';
//@flow

import React from 'react';
import { connect } from 'react-redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import fasSearch from '@fortawesome/fontawesome-free-solid/faSearch';

import { CLUSTERS_SEARCH } from './action';
import { searchClusters } from './action';
import type { ClustersStore } from './store';

// Re-export actions and store values.
export { defaultState, reducer } from './store';
export type { ClustersStore } from './store';


const SEARCH_TIMEOUT = 500;  // ms


type Props = {
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

  renderNoResults() {
    return (
      <div className="card-body text-center">
        <p className="card-text large-icon"><FontAwesomeIcon icon={fasSearch} /></p>
        <p className="card-text">
          No clusters were found.<br />
          Try searching something else.
        </p>
      </div>
    );
  };

  render() {
    let body = this.renderNoResults();
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
    search: state.clusters.search,
  };
}


const Clusters = connect(mapStateToProps, null)(InnerClusters);
export default Clusters;