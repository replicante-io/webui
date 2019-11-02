'use strict';
//@flow


export type Event = {
  event: string,
  payload: any,
  timestamp: string,
};


/** Name actions for type checking. */
export const EVENTS_FETCH = 'EVENTS_FETCH';
export const EVENTS_STORE = 'EVENTS_STORE';


/** Type enum of all possible fetch actions. */
export type EventsFetchAction = {
  +type: typeof EVENTS_FETCH,
};

export type EventsStoreAction = {
  +type: typeof EVENTS_STORE,
  +events: Array<Event>,
};

export type EventsAction =
  EventsFetchAction |
  EventsStoreAction |
  {type: 'FLOW_CATCH_ALL'};


export function fetchEvents(): EventsFetchAction {
  return {
    type: EVENTS_FETCH
  };
}


export function storeEvents(events: Array<Event>): EventsStoreAction {
  return {
    type: EVENTS_STORE,
    events: events,
  };
}
