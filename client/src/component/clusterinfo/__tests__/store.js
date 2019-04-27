'use strict';
//@flow

import { CLUSTER_STORE_DISCOVERY } from '../action';
import { CLUSTER_STORE_META } from '../action';

import { defaultState } from '../store';
import { reducer } from '../store';


const DISCOVERY = {
  cluster_id: 'test',
  display_name: null,
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
  describe('store', () => {

    test('CLUSTER_STORE_DISCOVERY', () => {
      let action = {
        type: CLUSTER_STORE_DISCOVERY,
        discovery: DISCOVERY
      };
      let state = reducer(defaultState, action);
      expect(state).toEqual({
        discovery: {'test': DISCOVERY},
        meta: {},
      });
    });

    test('CLUSTER_STORE_META', () => {
      let action = {
        type: CLUSTER_STORE_META,
        meta: META
      };
      let state = reducer(defaultState, action);
      expect(state).toEqual({
        discovery:{},
        meta: {'test': META},
      });
    });

    test('other transition', () => {
      let action = {type: 'FLOW_CATCH_ALL'};
      let state = reducer(undefined, action);
      expect(state).toEqual(defaultState);
    });

  });
});
