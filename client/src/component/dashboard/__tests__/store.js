'use strict';
//@flow

import { DASHBOARD_CLUSTERS_SET } from '../action';
import { defaultState } from '../store';
import { reducer } from '../store';


describe('Dashboard', () => {
  describe('store', () => {

    test('DASHBOARD_CLUSTERS_SET', () => {
      let cluster = {
        agents_down: 1,
        cluster_display_name: 'test2',
        cluster_id: 'test2',
        kinds: ['Kafka'],
        nodes: 4,
        nodes_down: 1,
        shards_count: 7,
        shards_primaries: 7,
      };
      let action = {
        type: DASHBOARD_CLUSTERS_SET,
        clusters: [cluster]
      };
      let state = reducer(defaultState, action);
      expect(state).toEqual({clusters: [cluster]});
    });

    test('other transition', () => {
      let action = {type: 'FLOW_CATCH_ALL'};
      let state = reducer(undefined, action);
      expect(state).toEqual(defaultState);
    });

  });
});
