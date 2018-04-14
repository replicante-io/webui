import { CLUSTERS_SEARCH } from '../action';
import { defaultState } from '../store';
import { reducer } from '../store';


describe('Clusters', () => {
  describe('store', () => {

    test('CLUSTERS_SEARCH', () => {
      let action = {
        type: CLUSTERS_SEARCH,
        search: 'test'
      };
      let state = reducer(defaultState, action);
      expect(state).toEqual({search: 'test'});
    });

    test('other transition', () => {
      let action = {type: 'OTHER'};
      let state = reducer(undefined, action);
      expect(state).toEqual(defaultState);
    });

  });
});
