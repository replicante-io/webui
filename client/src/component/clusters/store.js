'use strict';
//@flow

import { CLUSTERS_SEARCH } from './action';
import type { ClustersAction } from './action';
import type { SearchClustersAction } from './action';


export type ClustersStore = {
  search: string,
};


export const defaultState: ClustersStore = {
  search: '',
};


export function reducer(state: ClustersStore = defaultState, action: ClustersAction) {
  switch (action.type) {
    case CLUSTERS_SEARCH: return searchClusters(state, action);

    default:
      return state;
  }
}


function searchClusters(state: ClustersStore, action: SearchClustersAction): ClustersStore {
  let newState: ClustersStore = {...state};
  newState.search = action.search;
  return newState;
}
