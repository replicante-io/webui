'use strict';
//@flow

import { FETCH_COMPLETE } from './action';
import { FETCH_DATA } from './action';

import type { FetchAction } from './action';
import type { FetchComplete } from './action';
import type { FetchData } from './action';


/**
 * Information about a specific fetch.
 *
 *  * `active`: true if this fetch is currently in progress.
 *  * `id`: the ID of the fetch action descried.
 *  * `trigger`: a promise capturing the actual fetch process.
 */
export type FetchState = {
  +active: boolean,
  +id: String,
};

/** Type alias for the fetch store. */
export type FetchStore = Map<String, FetchState>;


/** Initial (empty) map for traking of fetch activity. */
export const defaultState: FetchStore = new Map();


/** Redux reducer for the datafetch component. */
export function reducer(state: FetchStore = defaultState, action: FetchAction) {
  switch (action.type) {
    case FETCH_COMPLETE: return fetchComplete(state, action);
    case FETCH_DATA: return fetchData(state, action);

    default:
      return state;
  }
}

function fetchComplete(state: FetchStore, action: FetchComplete): FetchStore {
  let newState: Map<String, FetchState> = new Map(state);
  newState.delete(action.id);
  return newState;
}

function fetchData(state: FetchStore, action: FetchData): FetchStore {
  let newState: Map<String, FetchState> = new Map(state);
  newState.set(action.id, {id: action.id, active: true});
  return newState;
}
