'use strict';
//@flow

import { CLUSTERS_LIST } from '../action';
import { CLUSTERS_SEARCH } from '../action';

import { defaultState } from '../store';
import { reducer } from '../store';


const CLUSTERS = [{
  agents_down: 1,
  cluster_display_name: 'test1',
  cluster_id: 'test1',
  kinds: ['MongoDB'],
  nodes: 1,
  nodes_down: 0,
  shards_count: 0,
  shards_primaries: 0,
}, {
  agents_down: 1,
  cluster_display_name: 'test2',
  cluster_id: 'test2',
  kinds: ['Kafka'],
  nodes: 4,
  nodes_down: 1,
  shards_count: 7,
  shards_primaries: 7,
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
      let action = {type: 'FLOW_CATCH_ALL'};
      let state = reducer(undefined, action);
      expect(state).toEqual(defaultState);
    });

  });
});
