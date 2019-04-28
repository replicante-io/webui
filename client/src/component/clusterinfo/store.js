'use strict';
//@flow

import type { ClusterMeta } from '../dashboard/action';

import { CLUSTER_STORE_DISCOVERY } from './action';
import { CLUSTER_STORE_META } from './action';

import type { ClusterDiscovery } from './action';
import type { ClusterInfoAction } from './action';

import type { ClusterStoreDiscoveryAction } from './action';
import type { ClusterStoreMetaAction } from './action';


export type ClusterInfoStore = {
  discovery: {[string]: ClusterDiscovery},
  meta: {[string]: ClusterMeta},
};


export const defaultState: ClusterInfoStore = {
  discovery: {},
  meta: {},
};


export function reducer(state: ClusterInfoStore = defaultState, action: ClusterInfoAction) {
  switch (action.type) {
    case CLUSTER_STORE_DISCOVERY: return storeDiscovery(state, action);
    case CLUSTER_STORE_META: return storeMeta(state, action);

    default:
      return state;
  }
}


function storeDiscovery(state: ClusterInfoStore, action: ClusterStoreDiscoveryAction) {
  let newState: ClusterInfoStore = {
    ...state,
    discovery: {...state.discovery},
  };
  newState.discovery[action.discovery.cluster_id] = action.discovery;
  return newState;
}

function storeMeta(state: ClusterInfoStore, action: ClusterStoreMetaAction) {
  let newState: ClusterInfoStore = {
    ...state,
    meta: {...state.meta},
  };
  newState.meta[action.meta.cluster_id] = action.meta;
  return newState;
}
