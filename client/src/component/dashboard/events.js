'use strict';
//@flow

import { Component } from 'react';
import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea } from '@fortawesome/free-solid-svg-icons';

import { FetchButton } from '../datafetch';
import { fetchData } from '../datafetch';

import { storeEvents } from '../events/action';
import { fetchEvents as fetchEventsApi } from '../events/api';
import EventRow from '../events/row';
import type { Event } from '../events/action';
import type { EventsStore } from '../events/store';


const FETCH_ID: string = "events-overview";


export function fetchEvents(dispatch: any): () => Promise<void> {
  return () => {
    return fetchEventsApi().then((events) => {
        dispatch(storeEvents(events));
    });
  };
}


type Props = {
  events: Array<Event>,
  dispatch: any,
}

export class InnerEvents extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.events.length) {
      this.props.dispatch(fetchData(FETCH_ID, fetchEvents(this.props.dispatch)));
    }
  }

  renderEvents() {
    let rows = this.props.events.map((event, idx) => {
      return <EventRow key={idx} {...event} />;
    });
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
        <p className="card-text large-icon"><FontAwesomeIcon icon={faChartArea} /></p>
        <p className="card-text">No data available</p>
      </div>
    );
  }

  render() {
    const body = this.props.events.length ? this.renderEvents() : this.renderNoData();
    return (
      <div className="row space-below">
        <div className="col">
          <div className="card">
            <div className="card-header">
              Latest events
              <FetchButton id={FETCH_ID} request={fetchEvents(this.props.dispatch)} />
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
  events: EventsStore,
}
export function mapStateToProps(state: PartialState) {
  return {
    events: state.events.events.slice(0, 5),
  };
}


const Events = connect(mapStateToProps, null)(InnerEvents);
export default Events;
