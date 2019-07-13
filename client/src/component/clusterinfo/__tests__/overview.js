'use strict';
//@flow

import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';

import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import Overview from '../overview';


const mockStore = configureStore([]);
const CLUSTER = {
  agents_down: 0,
  cluster_display_name: 'test',
  cluster_id: 'test',
  kinds: ['Kafka'],
  nodes: 3,
  nodes_down: 1,
  shards_count: 2,
  shards_primaries: 1,
};
const MATCH = {
  params: {name: 'test'}
};


describe('ClusterInfo', () => {
  describe('overview', () => {
    let store;

    beforeEach(() => {
      store = mockStore({
        clusterinfo: {
          meta: {}
        }
      });
    });

    test('renders with data', () => {
      const tree = renderer.create(
        <Provider store={store}>
          <Overview cluster={CLUSTER} match={MATCH} />
        </Provider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

  });
});
