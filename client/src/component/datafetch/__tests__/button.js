import React from 'react';
import renderer from 'react-test-renderer';

import ReactTestUtils from 'react-dom/test-utils';

import Button from '../button';


describe('datafetch', () => {
  describe('Button', () => {

    test('renders correctly', () => {
      const tree = renderer.create(
        <Button id="test" store={new Map()} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('renders fetching', () => {
      let store = new Map();
      store.set('test', {id: 'test', active: true});
      const tree = renderer.create(
        <Button id="test" store={store} />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('request on click', () => {
      const dispatch = jest.fn();
      const request = () => new Promise(() => {});
      const component = ReactTestUtils.renderIntoDocument(
        <Button id="test" dispatch={dispatch}
                store={new Map()} request={request} />
      );
      ReactTestUtils.Simulate.click(component.button);
      expect(dispatch.mock.calls.length).toBe(1);
    });

  });
});
