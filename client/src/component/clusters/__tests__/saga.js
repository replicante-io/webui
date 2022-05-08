'use strict';
//@flow

// NOTE: This is required for generators at runtime.
import 'regenerator-runtime/runtime.js';

import { call, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';

import { CLUSTERS_LIST } from '../action';
import { CLUSTERS_SEARCH } from '../action';
import { searchClusters as searchClustersApi } from '../api';

import { saga } from '../saga';
import { searchClusters } from '../saga';


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
  describe('saga', () => {

    test('calls the search function', () => { 
      const action = {type: CLUSTERS_SEARCH, search: 'test'};
      const run = searchClusters(action);
      expect(run.next().value).toEqual(
        call(searchClustersApi, 'test')
      );
    });

    test('emits CLUSTERS_LIST action', () => { 
      const action = {type: CLUSTERS_SEARCH, search: 'test'};
      const run = searchClusters(action);
      run.next();  // Skip call to fetch
      expect(run.next(CLUSTERS).value).toEqual(
        put({type: CLUSTERS_LIST, clusters: CLUSTERS})
      );
    });

    test('saga takes every', () => {
      const run = saga();
      expect(run.next().value).toEqual(
        takeEvery(CLUSTERS_SEARCH, searchClusters)
      );
    });

  });
});
