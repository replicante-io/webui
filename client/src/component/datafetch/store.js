'use strict';
//@flow

import { FETCH_COMPLETE } from './action';
import { FETCH_START } from './action';

import type { FetchAction } from './action';
import type { FetchComplete } from './action';
import type { FetchStart } from './action';


/**
 * Information about a specific fetch.
 *
 *  * `active`: true if this fetch is currently in progress.
 *  * `id`: the ID of the fetch action descried.
 */
export type FetchState = {
  +active: boolean,
  +id: string,
};

/** Type alias for the fetch store. */
export type FetchStore = Map<string, FetchState>;


/** Initial (empty) map for traking of fetch activity. */
export const defaultState: FetchStore = new Map();


/** Redux reducer for the datafetch component. */
export function reducer(state: FetchStore = defaultState, action: FetchAction) {
  switch (action.type) {
    case FETCH_COMPLETE: return fetchComplete(state, action);
    case FETCH_START: return fetchStart(state, action);

    default:
      return state;
  }
}

function fetchComplete(state: FetchStore, action: FetchComplete): FetchStore {
  let newState: FetchStore = new Map(state);
  newState.delete(action.id);
  return newState;
}

function fetchStart(state: FetchStore, action: FetchStart): FetchStore {
  let newState: FetchStore = new Map(state);
  newState.set(action.id, {id: action.id, active: true});
  return newState;
}
