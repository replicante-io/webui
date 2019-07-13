'use strict';
//@flow

import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';

import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import Agents from '../agents';


const mockStore = configureStore([]);
const MATCH = {
  params: {name: 'test'}
};


describe('ClusterInfo', () => {
  describe('agents', () => {
    let store;

    beforeEach(() => {
      store = mockStore({
        clusterinfo: {
          agents: {}
        }
      });
    });

    test('renders no data', () => {
      const tree = renderer.create(
        <Provider store={store}>
          <Agents match={MATCH} />
        </Provider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('renders with data', () => {
      store = mockStore({ clusterinfo: { agents: {
        'test': [{
          host: 'http://host1:1234',
          status: { code: 'UP' },
          version_checkout: null,
          version_number: 'abc',
          version_taint: null,
        }]
      } } });
      const tree = renderer.create(
        <Provider store={store}>
          <Agents match={MATCH} />
        </Provider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

  });
});
