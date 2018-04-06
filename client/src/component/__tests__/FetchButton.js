import React from 'react';
import renderer from 'react-test-renderer';

import FetchButton from '../FetchButton';


describe('FetchButton', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<FetchButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
