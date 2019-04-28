'use strict';
//@flow

import React from 'react';
import renderer from 'react-test-renderer';

import ReactTestUtils from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';

import type { FetchStore } from '../store';
import Button from '../button';


const mockStore = configureStore([]);


describe('datafetch', () => {
  describe('Button', () => {
    const request = () => new Promise(() => {});
    let dispatch;
    let store: FetchStore;

    beforeEach(() => {
      dispatch = jest.fn();
      store = new Map();
    });

    test('renders correctly', () => {
      const tree = renderer.create(
        <Button id="test" dispatch={dispatch}
                store={store} request={request} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('renders error', () => {
      store.set('test', {id: 'test', active: true, error: 'error', success: false});
      const tree = renderer.create(
        <Button id="test" dispatch={dispatch}
                store={store} request={request} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('renders fetching', () => {
      store.set('test', {id: 'test', active: true, error: null, success: false});
      const tree = renderer.create(
        <Button id="test" dispatch={dispatch}
                store={store} request={request} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('renders success', () => {
      store.set('test', {id: 'test', active: true, error: null, success: true});
      const tree = renderer.create(
        <Button id="test" dispatch={dispatch}
                store={store} request={request} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('request on click', () => {
      const component = ReactTestUtils.renderIntoDocument(
        <Button id="test" dispatch={dispatch}
                store={store} request={request} />
      );
      // $FlowFixMe: flow mistakes this for a generic `React.Compoment`.
      ReactTestUtils.Simulate.click(component.button);
      expect(dispatch.mock.calls.length).toBe(1);
    });

  });
});
