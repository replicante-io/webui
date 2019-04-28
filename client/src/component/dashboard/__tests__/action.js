'use strict';
//@flow

import { DASHBOARD_CLUSTERS_SET } from '../action';
import { storeClusters } from '../action';


describe('Dashboard', () => {
  describe('action', () => {

    test('storeClusters', () => {
      let clusters = [{
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
      let action = storeClusters(clusters);
      expect(action).toEqual({
        type: DASHBOARD_CLUSTERS_SET,
        clusters: clusters,
      });
    });

  });
});
