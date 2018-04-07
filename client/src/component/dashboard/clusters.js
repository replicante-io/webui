'use strict';
//@flow

import { connect } from 'react-redux';

import { Component } from 'react';
import React from 'react';

import { FetchButton } from '../datafetch';
import { fetchData } from '../datafetch';


const FETCH_ID: string = "top-clusters";


export function fetchClusters(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
}


type Props = {
  dispatch: any,
}

export class InnerClusters extends React.Component<Props> {
  componentDidMount() {
    this.props.dispatch(fetchData(FETCH_ID, fetchClusters));
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="card text-center">
            <div className="card-header">
              Largest clusters
              <FetchButton id={FETCH_ID} request={fetchClusters} />
            </div>
            <div className="card-body">
              <p className="card-text large-icon"><i className="fas fa-chart-area"></i></p>
              <p className="card-text">No data available</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Clusters = connect(null, null)(InnerClusters);
export default Clusters;
