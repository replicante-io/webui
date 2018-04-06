import { FETCH_COMPLETE } from '../action';
import { FETCH_DATA } from '../action';

import { defaultState } from '../store';
import { reducer } from '../store';


describe('datafetch', () => {
  describe('store', () => {
    test('defaultState is empty', () => {
      expect(defaultState.size).toBe(0);
    });

    test('unsupported actions do nothing', () => {
      let action = {type: 'some other action'};
      let state = reducer(undefined, action);
      expect(state).toBe(defaultState);
    });

    test('FETCH_COMPLETE stops fetching', () => {
      let action = {type: FETCH_DATA, id: 'test'};
      let state = reducer(defaultState, action);
      expect(state.get('test')).toEqual({
        active: true,
        id: 'test'
      });

      action = {type: FETCH_COMPLETE, id: 'test'};
      state = reducer(defaultState, action);
      expect(state.get('test')).toEqual(undefined);
    });

    test('FETCH_DATA starts fetching', () => {
      let action = {type: FETCH_DATA, id: 'test'};
      let state = reducer(defaultState, action);
      expect(state.get('test')).toEqual({
        active: true,
        id: 'test'
      });
    });
  });
});
