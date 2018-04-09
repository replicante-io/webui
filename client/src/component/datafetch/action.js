'use strict';
//@flow


/** Name actions for type checking. */
export const FETCH_COMPLETE = 'FETCH_COMPLETE';
export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_ERROR = 'FETCH_ERROR';
export const FETCH_START = 'FETCH_START';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';


/** Type enum of all possible fetch actions. */
export type FetchComplete = {
  +type: typeof FETCH_COMPLETE,
  +id: string,
}

export type FetchData = {
  +type: typeof FETCH_DATA,
  +id: string,
  +start: () => Promise<void>,
}

export type FetchError = {
  +type: typeof FETCH_ERROR,
  +error: any,
  +id: string,
}

export type FetchStart = {
  +type: typeof FETCH_START,
  +id: string,
}

export type FetchSuccess = {
  +type: typeof FETCH_SUCCESS,
  +id: string,
}

export type FetchAction = 
  FetchComplete |
  FetchData |
  FetchError |
  FetchStart |
  FetchSuccess |
  {type: 'FLOW_CATCH_ALL'};


/**
 * Returns an action that will start the data fetching process.
 * 
 * The fetching itself is started by the `start` callback and
 * is tracked by the promise it returns.
 */
export function fetchData(id: string, start: () => Promise<void>): FetchData {
  return {
    type: FETCH_DATA,
    id: id,
    start: start,
  };
}
