'use strict';
//@flow

import '@babel/polyfill';
import { all } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';

import { CLUSTER_FETCH_DISCOVERY } from '../action';
import { CLUSTER_FETCH_EVENTS } from '../action';
import { CLUSTER_FETCH_META } from '../action';
import { CLUSTER_STORE_DISCOVERY } from '../action';
import { CLUSTER_STORE_EVENTS } from '../action';
import { CLUSTER_STORE_META } from '../action';

import { fetchDiscovery as fetchDiscoveryApi } from '../api';
import { fetchEvents as fetchEventsApi } from '../api';
import { fetchMeta as fetchMetaApi } from '../api';

import { fetchDiscovery } from '../saga';
import { fetchEvents } from '../saga';
import { fetchMeta } from '../saga';
import { saga } from '../saga';


const DISCOVERY = {
  cluster_id: 'test',
  cluster_display_name: null,
  nodes: [
    'http://node1/',
    'http://node2/'
  ]
};
const EVENTS = [{
  data: "SOME DATA",
  event: "AGENT_DOWN",
  timestamp: "2018-04-28T17:57:24.540480643Z"
}];
const META = {
  agents_down: 0,
  cluster_display_name: 'test',
  cluster_id: 'test',
  kinds: [],
  nodes: 3,
  nodes_down: 1,
  shards_count: 2,
  shards_primaries: 1,
};


describe('Clusters', () => {
  describe('saga', () => {

    test('saga takes every', () => {
      const run = saga();
      expect(run.next().value).toEqual(all([
        takeEvery(CLUSTER_FETCH_DISCOVERY, fetchDiscovery),
        takeEvery(CLUSTER_FETCH_EVENTS, fetchEvents),
        takeEvery(CLUSTER_FETCH_META, fetchMeta)
      ]));
    });

    describe('fetchDiscovery', () => {
      test('calls the fetch function', () => {
        const action = {type: CLUSTER_FETCH_DISCOVERY, cluster_id: 'test'};
        const run = fetchDiscovery(action);
        expect(run.next().value).toEqual(
          call(fetchDiscoveryApi, 'test')
        );
      });

      test('emits CLUSTER_STORE_DISCOVERY action', () => { 
        const action = {type: CLUSTER_FETCH_DISCOVERY, cluster_id: 'test'};
        const run = fetchDiscovery(action);
        run.next();  // Skip call to fetch
        expect(run.next(DISCOVERY).value).toEqual(
          put({type: CLUSTER_STORE_DISCOVERY, discovery: DISCOVERY})
        );
      });
    });

    describe('fetchEvents', () => {
      test('calls the fetch function', () => {
        const action = {type: CLUSTER_FETCH_EVENTS, cluster_id: 'test'};
        const run = fetchEvents(action);
        expect(run.next().value).toEqual(
          call(fetchEventsApi, 'test')
        );
      });

      test('emits CLUSTER_STORE_EVENTS action', () => { 
        const action = {type: CLUSTER_FETCH_EVENTS, cluster_id: 'test'};
        const run = fetchEvents(action);
        run.next();  // Skip call to fetch
        expect(run.next(EVENTS).value).toEqual(
          put({type: CLUSTER_STORE_EVENTS, cluster_id: 'test', events: EVENTS})
        );
      });
    });

    describe('fetchMeta', () => {
      test('calls the fetch function', () => {
        const action = {type: CLUSTER_FETCH_META, cluster_id: 'test'};
        const run = fetchMeta(action);
        expect(run.next().value).toEqual(
          call(fetchMetaApi, 'test')
        );
      });

      test('emits CLUSTER_STORE_META action', () => {
        const action = {type: CLUSTER_FETCH_META, cluster_id: 'test'};
        const run = fetchMeta(action);
        run.next();  // Skip call to fetch
        expect(run.next(META).value).toEqual(
          put({type: CLUSTER_STORE_META, meta: META})
        );
      });
    });

  });
});
