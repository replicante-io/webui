'use strict';
//@flow

import fetch from 'jest-fetch-mock';
global.fetch = fetch;

import { fetchDiscovery } from '../api';
import { fetchMeta } from '../api';


const DISCOVERY = {
  cluster_id: 'test',
  display_name: null,
  nodes: [
    'http://node1/',
    'http://node2/'
  ]
};
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


describe('ClusterInfo', () => {
  describe('api', () => {
    beforeEach(() => {
      fetch.resetMocks()
    });

    describe('fetchDiscovery', () => {
      test('fulfill', () => {
        fetch.mockResponse(JSON.stringify(DISCOVERY));
        return fetchDiscovery('test').then((discovery) => {
          expect(discovery).toEqual(DISCOVERY);
        });
      });

      test('fullfill with error', () => {
        fetch.mockResponse(JSON.stringify({error: 'test'}), {status: 500});
        return fetchDiscovery('test').then(
          () => { throw Error('Expected error') },
          () => { }
        );
      });
    });

    describe('fetchMeta', () => {
      test('fulfill', () => {
        fetch.mockResponse(JSON.stringify(META));
        return fetchMeta('test').then((meta) => {
          expect(meta).toEqual(META);
        });
      });

      test('fullfill with error', () => {
        fetch.mockResponse(JSON.stringify({error: 'test'}), {status: 500});
        return fetchMeta('test').then(
          () => { throw Error('Expected error') },
          () => { }
        );
      });
    });

  });
});
