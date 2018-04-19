'use strict';

import { CLUSTER_FETCH_DISCOVERY } from '../action';
import { CLUSTER_FETCH_META } from '../action';

import { fetchDiscovery } from '../action';
import { fetchMeta } from '../action';


describe('ClusterInfo', () => {
  describe('action', () => {

    test('fetchDiscovery', () => {
      let action = fetchDiscovery('test');
      expect(action).toEqual({
        type: CLUSTER_FETCH_DISCOVERY,
        cluster: 'test'
      });
    });

    test('fetchMeta', () => {
      let action = fetchMeta('test');
      expect(action).toEqual({
        type: CLUSTER_FETCH_META,
        cluster: 'test'
      });
    });

  });
});
