'use strict';
//@flow

import { CLUSTERS_LIST } from './action';
import { CLUSTERS_SEARCH } from './action';

import type { ClustersAction } from './action';
import type { ListClustersAction } from './action';
import type { SearchClustersAction } from './action';
import type { ClusterItem } from '../dashboard/action';


export type ClustersStore = {
  clusters: Array<ClusterItem>,
  search: string,
};


export const defaultState: ClustersStore = {
  clusters: [],
  search: '',
};


export function reducer(state: ClustersStore = defaultState, action: ClustersAction) {
  switch (action.type) {
    case CLUSTERS_LIST: return listClusters(state, action);
    case CLUSTERS_SEARCH: return searchClusters(state, action);

    default:
      return state;
  }
}


function listClusters(state: ClustersStore, action: ListClustersAction): ClustersStore {
  let newState: ClustersStore = {...state};
  newState.clusters = action.clusters;
  return newState;
}

function searchClusters(state: ClustersStore, action: SearchClustersAction): ClustersStore {
  let newState: ClustersStore = {...state};
  newState.search = action.search;
  return newState;
}
