'use strict';
//@flow


/** Name actions for type checking. */
export const FETCH_COMPLETE = 'FETCH_COMPLETE';
export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_START = 'FETCH_START';


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

export type FetchStart = {
  +type: typeof FETCH_START,
  +id: string,
}

export type FetchAction = 
  FetchComplete |
  FetchData |
  FetchStart |
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
