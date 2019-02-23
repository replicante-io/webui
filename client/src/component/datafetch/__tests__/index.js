'use strict';

import '@babel/polyfill';
import { defaultState } from '../store';
import { mapStateToProps } from '../index';


describe('datafetch', () => {
  describe('index', () => {

    test('map state', () => {
      let state = {datafetch: defaultState};
      let props = mapStateToProps(state);
      expect(props).toEqual({
        store: defaultState
      });
    });

  });
});
