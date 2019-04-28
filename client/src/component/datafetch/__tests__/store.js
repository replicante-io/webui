'use strict';
//@flow

import { FETCH_COMPLETE } from '../action';
import { FETCH_ERROR } from '../action';
import { FETCH_START } from '../action';
import { FETCH_SUCCESS } from '../action';

import { defaultState } from '../store';
import { reducer } from '../store';


describe('datafetch', () => {
  describe('store', () => {

    test('defaultState is empty', () => {
      expect(defaultState.size).toBe(0);
    });

    test('unsupported actions do nothing', () => {
      let action = {type: 'FLOW_CATCH_ALL'};
      let state = reducer(undefined, action);
      expect(state).toBe(defaultState);
    });

    test('FETCH_COMPLETE stops fetching', () => {
      let action = {type: FETCH_START, id: 'test'};
      let state = reducer(defaultState, action);
      expect(state.get('test')).toEqual({
        active: true,
        error: null,
        id: 'test',
        success: false,
      });

      action = {type: FETCH_COMPLETE, id: 'test'};
      state = reducer(defaultState, action);
      expect(state.get('test')).toEqual(undefined);
    });

    test('FETCH_ERROR marks state', () => {
      let action = {type: FETCH_ERROR, id: 'test', error: 'a'};
      let state = reducer(defaultState, action);
      expect(state.get('test')).toEqual({
        active: true,
        error: 'a',
        id: 'test',
        success: false,
      });

      action = {type: FETCH_COMPLETE, id: 'test'};
      state = reducer(defaultState, action);
      expect(state.get('test')).toEqual(undefined);
    });

    test('FETCH_START starts fetching', () => {
      let action = {type: FETCH_START, id: 'test'};
      let state = reducer(defaultState, action);
      expect(state.get('test')).toEqual({
        active: true,
        error: null,
        id: 'test',
        success: false,
      });
    });

    test('FETCH_SUCCESS marks state', () => {
      let action = {type: FETCH_SUCCESS, id: 'test'};
      let state = reducer(defaultState, action);
      expect(state.get('test')).toEqual({
        active: true,
        error: null,
        id: 'test',
        success: true,
      });
    });

  });
});
