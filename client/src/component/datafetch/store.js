'use strict';
//@flow

import { FETCH_COMPLETE } from './action';
import { FETCH_ERROR } from './action';
import { FETCH_START } from './action';
import { FETCH_SUCCESS } from './action';

import type { FetchAction } from './action';
import type { FetchComplete } from './action';
import type { FetchError } from './action';
import type { FetchStart } from './action';
import type { FetchSuccess } from './action';


/**
 * Information about a specific fetch.
 *
 *  * `active`: true if this fetch is currently in progress.
 *  * `id`: the ID of the fetch action descried.
 */
export type FetchState = {
  +active: boolean,
  +error: any,
  +id: string,
  +success: boolean,
};

/** Type alias for the fetch store. */
export type FetchStore = Map<string, FetchState>;


/** Initial (empty) map for traking of fetch activity. */
export const defaultState: FetchStore = new Map();


/** Redux reducer for the datafetch component. */
export function reducer(state: FetchStore = defaultState, action: FetchAction) {
  switch (action.type) {
    case FETCH_COMPLETE: return fetchComplete(state, action);
    case FETCH_ERROR: return fetchError(state, action);
    case FETCH_START: return fetchStart(state, action);
    case FETCH_SUCCESS: return fetchSuccess(state, action);

    default:
      return state;
  }
}

function fetchComplete(state: FetchStore, action: FetchComplete): FetchStore {
  let newState: FetchStore = new Map(state);
  newState.delete(action.id);
  return newState;
}

function fetchError(state: FetchStore, action: FetchError): FetchStore {
  let newState: FetchStore = new Map(state);
  newState.set(action.id, {
    active: true,
    error: action.error,
    id: action.id,
    success: false,
  });
  return newState;
}

function fetchStart(state: FetchStore, action: FetchStart): FetchStore {
  let newState: FetchStore = new Map(state);
  newState.set(action.id, {
    active: true,
    error: null,
    id: action.id,
    success: false,
  });
  return newState;
}

function fetchSuccess(state: FetchStore, action: FetchSuccess) {
  let newState: FetchStore = new Map(state);
  newState.set(action.id, {
    active: true,
    error: null,
    id: action.id,
    success: true,
  });
  return newState;
}
