'use strict';
//@flow

// NOTE: This is required for generators at runtime.
import 'regenerator-runtime/runtime.js';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { CLUSTERS_SEARCH } from '../action';
import { InnerClusters } from '../index';
import Clusters from '../index';


const mockStore = configureStore([]);
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
  describe('index', () => {
    let store;

    beforeEach(() => {
      store = mockStore({
        clusters: {
          clusters: [],
          search: '',
        }
      });
    });

    test('renders no clusters', () => {
      const tree = renderer.create(
        <Provider store={store}>
          <Clusters />
        </Provider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('renders with clusters', () => {
      let store = mockStore({
        clusters: {
          clusters: CLUSTERS,
          search: '',
        }
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

    test('search clusters', () => {
      jest.useFakeTimers();
      let component = ReactTestUtils.renderIntoDocument(
        <InnerClusters clusters={[]} dispatch={store.dispatch} search={''} />
      );
      // $FlowFixMe: flow looks at `React.Compoment` instead of the exact component.
      let node = component.input;
      node.value = 'test';
      ReactTestUtils.Simulate.change(node);
      jest.runOnlyPendingTimers();

      const actions = store.getActions();
      expect(actions).toEqual([{
        type: CLUSTERS_SEARCH,
        search: '',
      }, {
        type: CLUSTERS_SEARCH,
        search: 'test',
      }]);
    });

    test('search clusters only once', () => {
      jest.useFakeTimers();
      let component = ReactTestUtils.renderIntoDocument(
        <InnerClusters clusters={[]} dispatch={store.dispatch} search={''} />
      );
      // $FlowFixMe: flow looks at `React.Compoment` instead of the exact component.
      let node = component.input;
      node.value = 'te';
      ReactTestUtils.Simulate.change(node);
      node.value = 'test';
      ReactTestUtils.Simulate.change(node);
      jest.runOnlyPendingTimers();

      const actions = store.getActions();
      expect(actions).toEqual([{
        type: CLUSTERS_SEARCH,
        search: '',
      }, {
        type: CLUSTERS_SEARCH,
        search: 'test',
      }]);
    });

  });
});
