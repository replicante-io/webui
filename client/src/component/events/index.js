'use strict';
//@flow

import React from 'react';
import { connect } from 'react-redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import fasChartArea from '@fortawesome/fontawesome-free-solid/faChartArea';

import { fetchEvents } from './action';
import EventRow from './row';
import type { Event } from './action';
import type { EventsStore } from './store';


// Re-export actions and store values.
export { defaultState, reducer } from './store';
export { saga } from './saga';
export type { EventsStore } from './store';


type Props = {
  dispatch: any,
  events: Array<Event>,
};
export class InnerEvents extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.events.length) {
      this.props.dispatch(fetchEvents());
    }
  }

  renderList() {
    let rows = this.props.events.map((event, idx) => {
      return <EventRow key={idx} {...event} />;
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
        <p className="card-text large-icon"><FontAwesomeIcon icon={fasChartArea} /></p>
        <p className="card-text">No data available</p>
      </div>
    );
  };

  render() {
    const body = this.props.events.length ? this.renderList() : this.renderNoResults();
    return (
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">Events</div>
            {body}
          </div>
        </div>
      </div>
    );
  };
};


/** Map the redux state to properties passed to component. */
type PartialState = {
  events: EventsStore,
}
export function mapStateToProps(state: PartialState) {
  return {
    events: state.events.events
  };
}


const Events = connect(mapStateToProps, null)(InnerEvents);
export default Events;
