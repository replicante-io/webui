'use strict';
//@flow

import { DASHBOARD_CLUSTERS_SET } from './action';

import type { StoreClustersAction } from './action';
import type { ClusterItem } from './action';
import type { DashboardAction } from './action';


export type DashboardStore = {
  clusters: Array<ClusterItem>,
};


export const defaultState: DashboardStore = {
  clusters: [],
};


export function reducer(state: DashboardStore = defaultState, action: DashboardAction) {
  switch (action.type) {
    case DASHBOARD_CLUSTERS_SET: return clustersSet(state, action);

    default:
      return state;
  }
}

function clustersSet(state: DashboardStore, action: StoreClustersAction) {
  let newState: DashboardStore = {...state};
  newState.clusters = action.clusters;
  return newState;
}
