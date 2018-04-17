'use strict';
//@flow

import { CLUSTER_STORE_META } from './action';

import type { ClusterInfoAction } from './action';
import type { ClusterStoreMetaAction } from './action';
import type { ClusterMeta } from '../dashboard/action';


export type ClusterInfoStore = {
  meta: {[string]: ClusterMeta},
};


export const defaultState: ClusterInfoStore = {
  meta: {},
};


export function reducer(state: ClusterInfoStore = defaultState, action: ClusterInfoAction) {
  switch (action.type) {
    case CLUSTER_STORE_META: return storeMeta(state, action);

    default:
      return state;
  }
}


function storeMeta(state: ClusterInfoStore, action: ClusterStoreMetaAction) {
  let newState: ClusterInfoStore = {
    ...state,
    meta: {...state.meta},
  };
  newState.meta[action.meta.name] = action.meta;
  return newState;
}
