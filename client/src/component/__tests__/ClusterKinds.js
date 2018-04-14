import React from 'react';
import renderer from 'react-test-renderer';

import ClusterKinds from '../ClusterKinds';


describe('ClusterKinds', () => {
  test('renders icons', () => {
    let kinds = ['MongoDB', 'Other'];
    const tree = renderer.create(
      <ClusterKinds kinds={kinds} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
