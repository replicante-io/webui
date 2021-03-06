'use strict';
//@flow

import fetch from 'jest-fetch-mock';
global.fetch = fetch;

import { fetchAgents } from '../api';
import { fetchDiscovery } from '../api';
import { fetchEvents } from '../api';
import { fetchMeta } from '../api';
import { fetchNodes } from '../api';


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


describe('ClusterInfo', () => {
  describe('api', () => {
    beforeEach(() => {
      fetch.resetMocks()
    });

    describe('fetchAgents', () => {
      test('fulfill', () => {
        fetch.mockResponse(JSON.stringify(AGENTS));
        return fetchAgents('test').then((agents) => {
          expect(agents).toEqual(AGENTS);
        });
      });

      test('fullfill with error', () => {
        fetch.mockResponse(JSON.stringify({error: 'test'}), {status: 500});
        return fetchAgents('test').then(
          () => { throw Error('Expected error') },
          () => { }
        );
      });
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

    describe('fetchEvents', () => {
      test('fulfill', () => {
        fetch.mockResponse(JSON.stringify(EVENTS));
        return fetchEvents('test').then((events) => {
          expect(events).toEqual(EVENTS);
        });
      });

      test('fullfill with error', () => {
        fetch.mockResponse(JSON.stringify({error: 'test'}), {status: 500});
        return fetchEvents('test').then(
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

    describe('fetchNodes', () => {
      test('fulfill', () => {
        fetch.mockResponse(JSON.stringify(NODES));
        return fetchNodes('test').then((nodes) => {
          expect(nodes).toEqual(NODES);
        });
      });

      test('fullfill with error', () => {
        fetch.mockResponse(JSON.stringify({error: 'test'}), {status: 500});
        return fetchNodes('test').then(
          () => { throw Error('Expected error') },
          () => { }
        );
      });
    });

  });
});
