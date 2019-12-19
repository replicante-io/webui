'use strict';
//@flow

import React from 'react';
import ReactJson from 'react-json-view';
import { Link } from 'react-router-dom';

import type { Event } from './action';


type Props = {
  event: Event,
};
class EventRow extends React.Component<Props> {
  render() {
    return (
      <div className="row event-item">
        <div className="col timestamp">
          {this.props.event.timestamp}
        </div>
        <div className="col event">
          {this.props.event.event}
        </div>
        <div className="col-6 payload codeblock">
          <ReactJson
              collapsed={0}
              name={false}
              src={this.props.event.payload}
          />
        </div>
      </div>
    );
  }
}
export default EventRow;
