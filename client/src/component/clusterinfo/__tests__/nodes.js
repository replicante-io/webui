'use strict';
//@flow

import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';

import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import Nodes from '../nodes';


const mockStore = configureStore([]);
const MATCH = {
  params: {name: 'test'}
};


describe('ClusterInfo', () => {
  describe('nodes', () => {
    let store;

    beforeEach(() => {
      store = mockStore({
        clusterinfo: {
          nodes: {}
        }
      });
    });

    test('renders no data', () => {
      const tree = renderer.create(
        <Provider store={store}>
          <Nodes match={MATCH} />
        </Provider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('renders with data', () => {
      store = mockStore({ clusterinfo: { nodes: {
        'test': [{
          cluster_id: "replistore",
          kind: "MongoDB",
          node_id: "localhost:27017",
          version: "4.0.10",
        }]
      } } });
      const tree = renderer.create(
        <Provider store={store}>
          <Nodes match={MATCH} />
        </Provider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

  });
});
