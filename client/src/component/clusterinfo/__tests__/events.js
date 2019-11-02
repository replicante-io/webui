'use strict';
//@flow

import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';

import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import Events from '../events';


const mockStore = configureStore([]);
const MATCH = {
  params: {name: 'test'}
};


describe('ClusterInfo', () => {
  describe('events', () => {
    let store;

    beforeEach(() => {
      store = mockStore({
        clusterinfo: {
          events: {}
        }
      });
    });

    test('renders no data', () => {
      const tree = renderer.create(
        <Provider store={store}>
          <Events match={MATCH} />
        </Provider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('renders with data', () => {
      store = mockStore({ clusterinfo: { events: {
        'test': [{
          event: "AGENT_DOWN",
          payload: {"SOME": "DATA"},
          timestamp: "2018-04-28T17:57:24.540480643Z"
        }]
      } } });
      const tree = renderer.create(
        <Provider store={store}>
          <Events match={MATCH} />
        </Provider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

  });
});
