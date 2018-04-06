'use strict';
//@flow

import { connect } from 'react-redux';

import Button from './button';
import type { FetchStore } from './store';


// TODO: restructure component as follows:
//
//   * datafetch/index.js: re-export needed things.
//   * datafetch/store.js: default state and reducer for store.
//   * datafetch/saga.js: redux-saga implementation for fetching.
//   * datafetch/actions.js: functions to create actions for dispatch.
//   * datafetch/button.js: the button react compoment to trigger fetches.
type PartialState = {
  datafetch: FetchStore,
}


/** Map the redux state to properties passed to Button. */
export function mapStateToProps(state: PartialState) {
  return {
    store: state.datafetch,
  };
}

export const FetchButton = connect(mapStateToProps, null)(Button);

export { defaultState, reducer } from './store';

export type { FetchStore } from './store';
