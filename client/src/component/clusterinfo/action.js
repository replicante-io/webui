'use strict';
//@flow

import type { ClusterMeta } from '../dashboard/action';


/** Name actions for type checking. */
export const CLUSTER_FETCH_META = 'CLUSTER_FETCH_META';
export const CLUSTER_STORE_META = 'CLUSTER_STORE_META';


/** Type enum of all possible fetch actions. */
export type ClusterFetchMetaAction = {
  +type: typeof CLUSTER_FETCH_META,
  +cluster: string,
};

export type ClusterStoreMetaAction = {
  +type: typeof CLUSTER_STORE_META,
  +meta: ClusterMeta,
};

export type ClusterInfoAction =
  ClusterFetchMetaAction |
  ClusterStoreMetaAction |
  {type: 'FLOW_CATCH_ALL'};


export function fetchMeta(cluster: string): ClusterFetchMetaAction {
  return {
    type: CLUSTER_FETCH_META,
    cluster: cluster,
  };
}
