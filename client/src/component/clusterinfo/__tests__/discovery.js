'use strict';

import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';

import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import Discovery from '../discovery';


const mockStore = configureStore([]);
const MATCH = {
  params: {name: 'test'}
};


describe('ClusterInfo', () => {
  describe('discovery', () => {
    let store;

    beforeEach(() => {
      store = mockStore({
        clusterinfo: {
          discovery: {}
        }
      });
    });

    test('renders no data', () => {
      const tree = renderer.create(
        <Provider store={store}>
          <Discovery match={MATCH} />
        </Provider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('renders with data', () => {
      store = mockStore({ clusterinfo: { discovery: {
        'test': {
          cluster: 'test',
          nodes: [
            'http://node1',
            'http://node2'
          ]
        }
      } } });
      const tree = renderer.create(
        <Provider store={store}>
          <Discovery match={MATCH} />
        </Provider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

  });
});
