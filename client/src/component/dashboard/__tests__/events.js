'use strict';

import '@babel/polyfill';
import fetch from 'jest-fetch-mock';
global.fetch = fetch;

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import Events from '../events';
import { fetchEvents } from '../events';


const mockStore = configureStore([]);


describe('Dashboard', () => {
  describe('events', () => {

    test('renders with no events', () => {
      let events = [];
      let store = mockStore({
        datafetch: new Map(),
        events: {events: events}
      });
      const tree = renderer.create(
        <Provider store={store}>
          <Events />
        </Provider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('renders with events', () => {
      let events = [{
        data: "SOME DATA",
        event: "AGENT_DOWN",
        timestamp: "2018-04-28T17:57:24.540480643Z"
      }, {
          data: "SOME DATA",
          event: "AGENT_RECOVER",
        timestamp: "2018-04-28T17:50:15.170187929Z"
      }];
      let store = mockStore({
        datafetch: new Map(),
        events: {events: events}
      });
      const tree = renderer.create(
        <Provider store={store}>
          <Events />
        </Provider>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    describe('fetchEvents', () => {
      beforeEach(() => {
        fetch.resetMocks()
      });

      test('fulfill', () => {
        let fetcher = fetchEvents(jest.fn());
        fetch.mockResponse(JSON.stringify([{
          data: "SOME DATA",
          event: "AGENT_DOWN",
          timestamp: "2018-04-28T17:57:24.540480643Z"
        }, {
          data: "SOME DATA",
          event: "AGENT_RECOVER",
          timestamp: "2018-04-28T17:50:15.170187929Z"
        }]));
        return fetcher();
      });

      test('reject', () => {
        let error = Error('FAILED');
        let fetcher = fetchEvents(jest.fn());
        fetch.mockReject(error);
        return fetcher().then(
          () => { throw Error('Expected error') },
          (err) => { expect(err).toBe(error) }
        );
      });

      test('reject not 2xx', () => {
        let fetcher = fetchEvents(jest.fn());
        fetch.mockResponse('{}', {status: 500});
        return fetcher().then(
          () => { throw Error('Expected error') },
          () => { }
        );
      });
    });

  });
});
