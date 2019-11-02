'use strict';
//@flow

import '@babel/polyfill';
import { all } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';

import { CLUSTER_ACTIONS_SEARCH } from '../action';
import { CLUSTER_FETCH_ACTION } from '../action';
import { CLUSTER_FETCH_AGENTS } from '../action';
import { CLUSTER_FETCH_DISCOVERY } from '../action';
import { CLUSTER_FETCH_EVENTS } from '../action';
import { CLUSTER_FETCH_META } from '../action';
import { CLUSTER_FETCH_NODES } from '../action';
import { CLUSTER_STORE_AGENTS } from '../action';
import { CLUSTER_STORE_DISCOVERY } from '../action';
import { CLUSTER_STORE_EVENTS } from '../action';
import { CLUSTER_STORE_META } from '../action';
import { CLUSTER_STORE_NODES } from '../action';

import { fetchAgents as fetchAgentsApi } from '../api';
import { fetchDiscovery as fetchDiscoveryApi } from '../api';
import { fetchEvents as fetchEventsApi } from '../api';
import { fetchMeta as fetchMetaApi } from '../api';
import { fetchNodes as fetchNodesApi } from '../api';

import { fetchAction } from '../saga';
import { fetchAgents } from '../saga';
import { fetchDiscovery } from '../saga';
import { fetchEvents } from '../saga';
import { fetchMeta } from '../saga';
import { fetchNodes } from '../saga';
import { searchActions } from '../saga';
import { saga } from '../saga';


const AGENTS = [{
  host: 'http://host1:1234',
  status: { code: 'UP' },
  version_checkout: null,
  version_number: 'abc',
  version_taint: null,
}];
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
const NODES = [{
  cluster_id: "replistore",
  kind: "MongoDB",
  node_id: "localhost:27017",
  version: "4.0.10",
}];


describe('Clusters', () => {
  describe('saga', () => {

    test('saga takes every', () => {
      const run = saga();
      expect(run.next().value).toEqual(all([
        takeEvery(CLUSTER_ACTIONS_SEARCH, searchActions),
        takeEvery(CLUSTER_FETCH_ACTION, fetchAction),
        takeEvery(CLUSTER_FETCH_AGENTS, fetchAgents),
        takeEvery(CLUSTER_FETCH_DISCOVERY, fetchDiscovery),
        takeEvery(CLUSTER_FETCH_EVENTS, fetchEvents),
        takeEvery(CLUSTER_FETCH_META, fetchMeta),
        takeEvery(CLUSTER_FETCH_NODES, fetchNodes),
      ]));
    });

    describe('fetchAgents', () => {
      test('calls the fetch function', () => {
        const action = {type: CLUSTER_FETCH_AGENTS, cluster_id: 'test'};
        const run = fetchAgents(action);
        expect(run.next().value).toEqual(
          call(fetchAgentsApi, 'test')
        );
      });

      test('emits CLUSTER_STORE_AGENTS action', () => { 
        const action = {type: CLUSTER_FETCH_AGENTS, cluster_id: 'test'};
        const run = fetchAgents(action);
        run.next();  // Skip call to fetch
        expect(run.next(AGENTS).value).toEqual(
          put({type: CLUSTER_STORE_AGENTS, cluster_id: 'test', agents: AGENTS})
        );
      });
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

    describe('fetchNodes', () => {
      test('calls the fetch function', () => {
        const action = {type: CLUSTER_FETCH_NODES, cluster_id: 'test'};
        const run = fetchNodes(action);
        expect(run.next().value).toEqual(
          call(fetchNodesApi, 'test')
        );
      });

      test('emits CLUSTER_STORE_NODES action', () => {
        const action = {type: CLUSTER_FETCH_NODES, cluster_id: 'test'};
        const run = fetchNodes(action);
        run.next();  // Skip call to fetch
        expect(run.next(NODES).value).toEqual(
          put({type: CLUSTER_STORE_NODES, cluster_id: 'test', nodes: NODES})
        );
      });
    });

  });
});
