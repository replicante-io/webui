'use strict';

import { all } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';

import { CLUSTER_FETCH_DISCOVERY } from '../action';
import { CLUSTER_FETCH_META } from '../action';
import { CLUSTER_STORE_DISCOVERY } from '../action';
import { CLUSTER_STORE_META } from '../action';

import { fetchDiscovery as fetchDiscoveryApi } from '../api';
import { fetchMeta as fetchMetaApi } from '../api';

import { fetchDiscovery } from '../saga';
import { fetchMeta } from '../saga';
import { saga } from '../saga';


const DISCOVERY = {
  name: 'test',
  nodes: [
    'http://node1/',
    'http://node2/'
  ]
};
const META = {
  name: 'test',
  nodes: 3,
  kinds: []
};


describe('Clusters', () => {
  describe('saga', () => {

    test('saga takes every', () => {
      const run = saga();
      expect(run.next().value).toEqual(all([
        takeEvery(CLUSTER_FETCH_DISCOVERY, fetchDiscovery),
        takeEvery(CLUSTER_FETCH_META, fetchMeta)
      ]));
    });

    describe('fetchDiscovery', () => {
      test('calls the fetch function', () => {
        const action = {type: CLUSTER_FETCH_DISCOVERY, cluster: 'test'};
        const run = fetchDiscovery(action);
        expect(run.next().value).toEqual(
          call(fetchDiscoveryApi, 'test')
        );
      });

      test('emits CLUSTER_STORE_DISCOVERY action', () => { 
        const action = {type: CLUSTER_FETCH_DISCOVERY, cluster: 'test'};
        const run = fetchDiscovery(action);
        run.next();  // Skip call to fetch
        expect(run.next(DISCOVERY).value).toEqual(
          put({type: CLUSTER_STORE_DISCOVERY, discovery: DISCOVERY})
        );
      });
    });

    describe('fetchMeta', () => {
      test('calls the fetch function', () => {
        const action = {type: CLUSTER_FETCH_META, cluster: 'test'};
        const run = fetchMeta(action);
        expect(run.next().value).toEqual(
          call(fetchMetaApi, 'test')
        );
      });

      test('emits CLUSTER_STORE_META action', () => {
        const action = {type: CLUSTER_FETCH_META, cluster: 'test'};
        const run = fetchMeta(action);
        run.next();  // Skip call to fetch
        expect(run.next(META).value).toEqual(
          put({type: CLUSTER_STORE_META, meta: META})
        );
      });
    });

  });
});
