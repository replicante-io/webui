'use strict';
//@flow

import { EVENTS_STORE } from '../action';

import { defaultState } from '../store';
import { reducer } from '../store';


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
  describe('store', () => {

    test('EVENTS_STORE', () => {
      let action = {
        type: EVENTS_STORE,
        events: EVENTS
      };
      let state = reducer(defaultState, action);
      expect(state).toEqual({
        events: EVENTS
      });
    });

    test('other transition', () => {
      let action = {type: 'FLOW_CATCH_ALL'};
      let state = reducer(undefined, action);
      expect(state).toEqual(defaultState);
    });

  });
});
