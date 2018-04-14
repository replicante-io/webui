'use strict';
import { Provider } from 'react-redux';

import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { CLUSTERS_SEARCH } from '../action';
import { InnerClusters } from '../index';
import Clusters from '../index';


const mockStore = configureStore([]);


describe('Clusters', () => {
  describe('index', () => {
    let store;

    beforeEach(() => {
      store = mockStore({
        clusters: {
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

    test('search clusters', () => {
      jest.useFakeTimers();
      let component = ReactTestUtils.renderIntoDocument(
        <InnerClusters dispatch={store.dispatch} search={''} />
      );
      let node = component.input;
      node.value = 'test';
      ReactTestUtils.Simulate.change(node);
      jest.runOnlyPendingTimers();

      const actions = store.getActions();
      expect(actions).toEqual([{
        type: CLUSTERS_SEARCH,
        search: 'test',
      }]);
    });

    test('search clusters only once', () => {
      jest.useFakeTimers();
      let component = ReactTestUtils.renderIntoDocument(
        <InnerClusters dispatch={store.dispatch} search={''} />
      );
      let node = component.input;
      node.value = 'te';
      ReactTestUtils.Simulate.change(node);
      node.value = 'test';
      ReactTestUtils.Simulate.change(node);
      jest.runOnlyPendingTimers();

      const actions = store.getActions();
      expect(actions).toEqual([{
        type: CLUSTERS_SEARCH,
        search: 'test',
      }]);
    });

  });
});