'use strict';
//@flow

// NOTE: This is required for generators at runtime.
import 'regenerator-runtime/runtime.js';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import React from 'react';

import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import Events from '../index';


const mockStore = configureStore([]);
const EVENTS = [{
  event: "AGENT_DOWN",
  payload: {"SOME": "DATA"},
  timestamp: "2018-04-28T17:57:24.540480643Z"
}, {
  event: "AGENT_RECOVER",
  payload: {"SOME": "DATA"},
  timestamp: "2018-04-28T17:50:15.170187929Z"
}];


describe('Events', () => {
  describe('index', () => {
    let store;

    beforeEach(() => {
      store = mockStore({
        events: {
          events: []
        }
      });
    });

    test('renders index', () => {
      const tree = renderer.create(
        <BrowserRouter>
          <Provider store={store}>
            <Events />
          </Provider>
        </BrowserRouter>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('renders with data', () => {
      let store = mockStore({
        events: {
          events: EVENTS
        }
      });
      const tree = renderer.create(
        <BrowserRouter>
          <Provider store={store}>
            <Events />
          </Provider>
        </BrowserRouter>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

  });
});
