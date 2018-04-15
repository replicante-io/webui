'use strict';

import fetch from 'jest-fetch-mock';
global.fetch = fetch;

import { searchClusters } from '../api';


const CLUSTERS = [{
  kinds: ['MongoDB'],
  name: 'test1',
  nodes: 1
}, {
  kinds: ['Kafka'],
  name: 'test2',
  nodes: 4
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
