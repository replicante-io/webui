'use strict';
//@flow

import { Component } from 'react';
import React from 'react';


class WorkInProgress extends Component<{}> {
  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="card text-center border-warning">
            <div className="card-header border-warning">
              Work In Progress
            </div>

            <div className="card-body">
              <h5 className="card-title">
                Thank you for checking out <a href="https://www.replicante.io/">Replicante</a>!
              </h5>
              <p className="card-text">
                It seems you sumbled across a feature that is not yet implemented.
              </p>
              <p className="card-text large-icon">
                <i className="fas fa-wrench"></i>
              </p>
              <p className="card-text">
                We are working hard to implement lots of awesome features so hang tight!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default WorkInProgress;
