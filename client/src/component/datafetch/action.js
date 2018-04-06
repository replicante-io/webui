'use strict';
//@flow


/** Name actions for type checking. */
export const FETCH_COMPLETE = 'FETCH_COMPLETE';
export const FETCH_DATA = 'FETCH_DATA';


/** Type enum of all possible fetch actions. */
export type FetchComplete = {
  +type: typeof FETCH_COMPLETE,
  +id: String,
}

export type FetchData = {
  +type: typeof FETCH_DATA,
  +id: String,
}

export type FetchAction = 
  FetchComplete |
  FetchData |
  {type: 'FLOW_CATCH_ALL'};
