'use strict';
//@flow

import React from 'react';
import { Link } from 'react-router-dom';

import type { Event } from './action';


class EventRow extends React.Component<Event> {
  render() {
    let payload = JSON.stringify(this.props.event.payload);
    return (
      <div className="row event-item">
        <div className="col">
          {this.props.timestamp}
        </div>
        <div className="col">
          {this.props.event.event}
        </div>
        <div className="col-6">
          <pre className="verbatim">
            <code>{payload}</code>
          </pre>
        </div>
      </div>
    );
  }
}
export default EventRow;
