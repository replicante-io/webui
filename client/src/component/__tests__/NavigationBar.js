'use strict';
//@flow

import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import renderer from 'react-test-renderer';

import NavigationBar from '../NavigationBar';


describe('NavigationBar', () => {
  test('renders correctly', () => {
    const tree = renderer.create(
      <BrowserRouter>
        <NavigationBar />
      </BrowserRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
