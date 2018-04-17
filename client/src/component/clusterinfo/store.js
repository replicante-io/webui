'use strict';
//@flow


import type { ClusterInfoAction } from './action';
import type { ClusterMeta } from '../dashboard/action';


export type ClusterInfoStore = {
  meta: {[string]: ClusterMeta},
};


export const defaultState: ClusterInfoStore = {
  meta: {},
};


export function reducer(state: ClusterInfoStore = defaultState, action: ClusterInfoAction) {
  switch (action.type) {
    default:
      return state;
  }
}
