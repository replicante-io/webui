'use strict';

import fetch from 'jest-fetch-mock';
global.fetch = fetch;

import { fetchDiscovery } from '../api';
import { fetchMeta } from '../api';


const DISCOVERY = {
  name: 'test',
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
