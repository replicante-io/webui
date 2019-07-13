'use strict';
//@flow

import React from 'react';
import { connect } from 'react-redux';

import { fetchEvents } from './action';
import { NoDataIcon } from '../icons';
import EventRow from '../events/row';

import type { Element } from 'react';
import type { ClusterDiscovery } from './action';
import type { ClusterInfoStore } from './store';
import type { Event } from '../events/action';


type Props = {
  events: ?Array<Event>,
  dispatch: any,
  id: string,
};
export class InnerEvents extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.events) {
      this.props.dispatch(fetchEvents(this.props.id));
    }
  }

  render() {
    if (this.props.events) {
      // $FlowFixMe: flow can't cope with the return type of the map.
      return this.props.events.map((event, idx) => {
        return <EventRow key={idx} {...event} />;
      });
    }
    return (
      <div className="text-center">
        <NoDataIcon />
        No information available. <br />
        If nothing shows up the cluster may not exist.
      </div>
    );
  }
}

/** Map the redux state to properties passed to Button. */
type PartialState = {
  clusterinfo: ClusterInfoStore,
}
export function mapStateToProps(state: PartialState, props: {match: any}) {
  const id = props.match.params.name;
  return {
    events: state.clusterinfo.events[id],
    id: id,
  };
}


const Events = connect(mapStateToProps, null)(InnerEvents);
export default Events;
