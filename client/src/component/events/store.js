'use strict';
//@flow

import { EVENTS_STORE } from './action';

import type { Event } from './action';
import type { EventsAction } from './action';
import type { EventsStoreAction } from './action';


export type EventsStore = {
  events: Array<Event>,
};


export const defaultState: EventsStore = {
  events: [],
};


export function reducer(state: EventsStore = defaultState, action: EventsAction) {
  switch (action.type) {
    case EVENTS_STORE: return storeEvents(state, action);

    default:
      return state;
  }
}


function storeEvents(state: EventsStore, action: EventsStoreAction): EventsStore {
  let newState: EventsStore = {...state};
  newState.events = action.events;
  return newState;
}
