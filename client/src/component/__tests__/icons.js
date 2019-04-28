'use strict';
//@flow

import React from 'react';
import renderer from 'react-test-renderer';

import { NoDataIcon } from '../icons';


describe('icons', () => {
  test('renders NoDataIcon', () => {
    const tree = renderer.create(<NoDataIcon />);
    expect(tree).toMatchSnapshot();
  });
});
