'use strict';
//@flow

// NOTE: This is required for generators at runtime.
import 'regenerator-runtime/runtime.js';

import { call, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';

import { EVENTS_FETCH } from '../action';
import { EVENTS_STORE } from '../action';

import { fetchEvents as fetchEventsApi } from '../api';
import { fetchEvents } from '../saga';
import { saga } from '../saga';


const EVENTS = [{
  event: "AGENT_DOWN",
  payload: "SOME DATA",
  timestamp: "2018-04-28T17:57:24.540480643Z"
}, {
  event: "AGENT_RECOVER",
  payload: "SOME DATA",
  timestamp: "2018-04-28T17:50:15.170187929Z"
}];


describe('Events', () => {
  describe('saga', () => {

    test('saga takes every', () => {
      const run = saga();
      expect(run.next().value).toEqual(
        takeEvery(EVENTS_FETCH, fetchEvents),
      );
    });

    describe('fetchEvents', () => {
      test('calls the fetch function', () => {
        const action = {type: EVENTS_FETCH};
        const run = fetchEvents(action);
        expect(run.next().value).toEqual(
          call(fetchEventsApi)
        );
      });

      test('emits EVENTS_STORE action', () => { 
        const action = {type: EVENTS_FETCH};
        const run = fetchEvents(action);
        run.next();  // Skip call to fetch
        expect(run.next(EVENTS).value).toEqual(
          put({type: EVENTS_STORE, events: EVENTS})
        );
      });
    });

  });
});
