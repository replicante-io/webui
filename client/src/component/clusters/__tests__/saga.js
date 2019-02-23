'use strict';

import '@babel/polyfill';
import { call, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';

import { CLUSTERS_LIST } from '../action';
import { CLUSTERS_SEARCH } from '../action';
import { searchClusters as searchClustersApi } from '../api';

import { saga } from '../saga';
import { searchClusters } from '../saga';


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
