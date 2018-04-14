'use strict';
//@flow

import { Component } from 'react';
import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import fasChartArea from '@fortawesome/fontawesome-free-solid/faChartArea';

import { FetchButton } from '../datafetch';
import { fetchData } from '../datafetch';
import ClusterKinds from '../ClusterKinds';

import { storeClusters } from './action';

import type { ClusterItem } from './action';
import type { DashboardStore } from './store';


const FETCH_ID: string = "top-clusters";


export function fetchClusters(dispatch: any): () => Promise<void> {
  return () => {
    return fetch('/webui/clusters/top').then((response) => {
      return response.json().then((body) => {
        if (!response.ok) {
          throw Error('Fetch error: ' + body.error);
        }
        dispatch(storeClusters(body));
      });
    });
  };
}


type Props = {
  clusters: Array<ClusterItem>,
  dispatch: any,
}

export class InnerClusters extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.clusters.length) {
      this.props.dispatch(fetchData(FETCH_ID, fetchClusters(this.props.dispatch)));
    }
  }

  renderClusterItem(cluster: ClusterItem) {
    const link = `/clusters/${cluster.name}`;
    return (
      <div key={cluster.name} className="row cluster-item">
        <div className="col">
          <p><Link to={link}>{cluster.name}</Link></p>
          <small>Name</small>
        </div>
        <div className="col">
          <p>{cluster.nodes}</p>
          <small>Nodes</small>
        </div>
        <div className="col">
          <p><ClusterKinds kinds={cluster.kinds} /></p>
          <small>{cluster.kinds.join(', ')}</small>
        </div>
      </div>
    );
  }

  renderClusters() {
    let rows = this.props.clusters.map((cluster) => this.renderClusterItem(cluster));
    return (
      <div className="card-body text-center">
        <div className="card-text">
          {rows}
        </div>
      </div>
    );
  }

  renderNoData() {
    return (
      <div className="card-body text-center">
        <p className="card-text large-icon"><FontAwesomeIcon icon={fasChartArea} /></p>
        <p className="card-text">No data available</p>
      </div>
    );
  }

  render() {
    const body = this.props.clusters.length ? this.renderClusters() : this.renderNoData();
    return (
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">
              Largest clusters
              <FetchButton id={FETCH_ID} request={fetchClusters(this.props.dispatch)} />
            </div>
            {body}
          </div>
        </div>
      </div>
    );
  }
}


/** Map the redux state to properties passed to Button. */
type PartialState = {
  dashboard: DashboardStore,
}
export function mapStateToProps(state: PartialState) {
  return {
    clusters: state.dashboard.clusters,
  };
}


const Clusters = connect(mapStateToProps, null)(InnerClusters);
export default Clusters;
