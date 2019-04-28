'use strict';
//@flow

import '@babel/polyfill';
import fetch from 'jest-fetch-mock';
global.fetch = fetch;

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import Clusters from '../clusters';
import { fetchClusters } from '../clusters';


const mockStore = configureStore([]);


describe('Dashboard', () => {
  describe('clusters', () => {

    test('renders with no clusters', () => {
      let clusters = [];
      let store = mockStore({
        datafetch: new Map(),
        dashboard: {clusters: clusters}
      });
      const tree = renderer.create(
        <Provider store={store}>
          <Clusters />
        </Provider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('renders with clusters', () => {
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
      let store = mockStore({
        datafetch: new Map(),
        dashboard: {clusters: clusters}
      });
      const tree = renderer.create(
        <BrowserRouter>
          <Provider store={store}>
            <Clusters />
          </Provider>
        </BrowserRouter>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    describe('fetchClusters', () => {
      beforeEach(() => {
        fetch.resetMocks()
      });

      test('fulfill', () => {
        let fetcher = fetchClusters(jest.fn());
        fetch.mockResponse(JSON.stringify([{
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
        }]));
        return fetcher();
      });

      test('reject', () => {
        let error = Error('FAILED');
        let fetcher = fetchClusters(jest.fn());
        fetch.mockReject(error);
        return fetcher().then(
          () => { throw Error('Expected error') },
          (err) => { expect(err).toBe(error) }
        );
      });

      test('reject not 2xx', () => {
        let fetcher = fetchClusters(jest.fn());
        fetch.mockResponse('{}', {status: 500});
        return fetcher().then(
          () => { throw Error('Expected error') },
          () => { }
        );
      });
    });

  });
});
