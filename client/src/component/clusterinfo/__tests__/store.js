'use strict';
//@flow

import { CLUSTER_STORE_AGENTS } from '../action';
import { CLUSTER_STORE_DISCOVERY } from '../action';
import { CLUSTER_STORE_EVENTS } from '../action';
import { CLUSTER_STORE_META } from '../action';
import { CLUSTER_STORE_NODES } from '../action';

import { defaultState } from '../store';
import { reducer } from '../store';


const AGENTS = [{
  host: 'http://host1:1234',
  status: { code: 'UP' },
  version_checkout: null,
  version_number: 'abc',
  version_taint: null,
}];
const DISCOVERY = {
  cluster_id: 'test',
  display_name: null,
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
  describe('store', () => {

    test('CLUSTER_STORE_AGENTS', () => {
      let action = {
        type: CLUSTER_STORE_AGENTS,
        cluster_id: 'test',
        agents: AGENTS,
      };
      let state = reducer(defaultState, action);
      expect(state).toEqual({
        actions: {},
        agents: {'test': AGENTS},
        discovery: {},
        events: {},
        meta: {},
        nodes: {},
      });
    });

    test('CLUSTER_STORE_DISCOVERY', () => {
      let action = {
        type: CLUSTER_STORE_DISCOVERY,
        discovery: DISCOVERY,
      };
      let state = reducer(defaultState, action);
      expect(state).toEqual({
        actions: {},
        agents: {},
        discovery: {'test': DISCOVERY},
        events: {},
        meta: {},
        nodes: {},
      });
    });

    test('CLUSTER_STORE_EVENTS', () => {
      let action = {
        type: CLUSTER_STORE_EVENTS,
        cluster_id: 'test',
        events: EVENTS,
      };
      let state = reducer(defaultState, action);
      expect(state).toEqual({
        actions: {},
        agents: {},
        discovery: {},
        events: {'test': EVENTS},
        meta: {},
        nodes: {},
      });
    });

    test('CLUSTER_STORE_META', () => {
      let action = {
        type: CLUSTER_STORE_META,
        meta: META,
      };
      let state = reducer(defaultState, action);
      expect(state).toEqual({
        actions: {},
        agents: {},
        discovery:{},
        events: {},
        meta: {'test': META},
        nodes: {},
      });
    });

    test('CLUSTER_STORE_NODES', () => {
      let action = {
        type: CLUSTER_STORE_NODES,
        cluster_id: 'test',
        nodes: NODES,
      };
      let state = reducer(defaultState, action);
      expect(state).toEqual({
        actions: {},
        agents: {},
        discovery:{},
        events: {},
        meta: {},
        nodes: {'test': NODES},
      });
    });

    test('other transition', () => {
      let action = {type: 'FLOW_CATCH_ALL'};
      let state = reducer(undefined, action);
      expect(state).toEqual(defaultState);
    });

  });
});
