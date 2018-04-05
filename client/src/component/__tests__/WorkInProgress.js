import React from 'react';
import renderer from 'react-test-renderer';

import WorkInProgress from '../WorkInProgress';


describe('WorkInProgress', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<WorkInProgress />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
