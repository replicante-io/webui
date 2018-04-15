import { CLUSTERS_LIST } from '../action';
import { CLUSTERS_SEARCH } from '../action';

import { defaultState } from '../store';
import { reducer } from '../store';


const CLUSTERS = [{
  kinds: ['MongoDB'],
  name: 'test1',
  nodes: 1
}, {
  kinds: ['Kafka'],
  name: 'test2',
  nodes: 4
}];


describe('Clusters', () => {
  describe('store', () => {

    test('CLUSTERS_LIST', () => {
      let action = {
        type: CLUSTERS_LIST,
        clusters: CLUSTERS,
      };
      let state = reducer(defaultState, action);
      expect(state).toEqual({
        clusters: CLUSTERS,
        search: '',
      });
    });

    test('CLUSTERS_SEARCH', () => {
      let action = {
        type: CLUSTERS_SEARCH,
        search: 'test'
      };
      let state = reducer(defaultState, action);
      expect(state).toEqual({
        clusters: [],
        search: 'test',
      });
    });

    test('other transition', () => {
      let action = {type: 'OTHER'};
      let state = reducer(undefined, action);
      expect(state).toEqual(defaultState);
    });

  });
});
