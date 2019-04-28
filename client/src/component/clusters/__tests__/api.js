'use strict';
//@flow

import fetch from 'jest-fetch-mock';
global.fetch = fetch;

import { searchClusters } from '../api';


const CLUSTERS = [{
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


describe('Clusters', () => {
  describe('api', () => {
    beforeEach(() => {
      fetch.resetMocks()
    });

    describe('searchClusters', () => {
      test('fulfill', () => {
        fetch.mockResponse(JSON.stringify(CLUSTERS));
        return searchClusters('').then((clusters) => {
          expect(clusters).toEqual(CLUSTERS);
        });
      });

      test('fullfill with error', () => {
        fetch.mockResponse(JSON.stringify({error: 'test'}), {status: 500});
        return searchClusters('').then(
          () => { throw Error('Expected error') },
          () => { }
        );
      });
    });

  });
});
