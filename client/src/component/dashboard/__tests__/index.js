'use strict';
//@flow

import '@babel/polyfill';
import { Provider } from 'react-redux';

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import Dashboard from '../index';


const mockStore = configureStore([]);


describe('Dashboard', () => {
  describe('index', () => {

    test('renders correctly', () => {
      let store = mockStore({
        datafetch: new Map(),
        dashboard: {
          clusters: []
        },
        events: {
          events: []
        }
      });
      const tree = renderer.create(
        <Provider store={store}>
          <Dashboard />
        </Provider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

  });
});
