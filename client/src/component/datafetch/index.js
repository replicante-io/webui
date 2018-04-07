'use strict';
//@flow

import { connect } from 'react-redux';

import Button from './button';
import type { FetchStore } from './store';


/** Map the redux state to properties passed to Button. */
type PartialState = {
  datafetch: FetchStore,
}
export function mapStateToProps(state: PartialState) {
  return {
    store: state.datafetch,
  };
}


export const FetchButton = connect(mapStateToProps, null)(Button);
export { fetchData } from './action';
export { defaultState, reducer } from './store';
export { saga } from './saga';

export type { FetchStore } from './store';
