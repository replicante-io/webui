'use strict';
//@flow

import '@babel/polyfill';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { OverviewRedirect } from '../index';
import ClusterInfo from '../index';


const mockStore = configureStore([]);
const MATCH = {
  params: {name: 'test'},
  path: 'about:black/clusters/test/',
  url: 'about:black/clusters/:name/',
};


describe('ClusterInfo', () => {
  describe('index', () => {
    let store;

    beforeEach(() => {
      store = mockStore({
        clusterinfo: {
          discovery: {}
        }
      });
    });

    test('renders index', () => {
      const tree = renderer.create(
        <BrowserRouter>
          <Provider store={store}>
            <ClusterInfo match={MATCH} />
          </Provider>
        </BrowserRouter>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('renders redirect', () => {
      const tree = renderer.create(
        <BrowserRouter>
          <Provider store={store}>
            <OverviewRedirect match={MATCH} />
          </Provider>
        </BrowserRouter>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

  });
});
