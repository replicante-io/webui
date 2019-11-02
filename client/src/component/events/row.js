'use strict';
//@flow

import React from 'react';
import ReactJson from 'react-json-view';
import { Link } from 'react-router-dom';

import type { Event } from './action';


class EventRow extends React.Component<Event> {
  render() {
    return (
      <div className="row event-item">
        <div className="col timestamp">
          {this.props.timestamp}
        </div>
        <div className="col event">
          {this.props.event}
        </div>
        <div className="col-6 payload codeblock">
          <ReactJson
              collapsed={0}
              name={false}
              src={this.props.payload}
          />
        </div>
      </div>
    );
  }
}
export default EventRow;
