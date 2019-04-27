'use strict';
//@flow

import type { ClusterMeta } from '../dashboard/action';


export type ClusterDiscovery = {
  cluster_id: string,
  display_name: ?string,
  nodes: Array<string>,
}


/** Name actions for type checking. */
export const CLUSTER_FETCH_DISCOVERY = 'CLUSTER_FETCH_DISCOVERY';
export const CLUSTER_FETCH_META = 'CLUSTER_FETCH_META';
export const CLUSTER_STORE_DISCOVERY = 'CLUSTER_STORE_DISCOVERY';
export const CLUSTER_STORE_META = 'CLUSTER_STORE_META';


/** Type enum of all possible fetch actions. */
export type ClusterFetchDiscoveryAction = {
  +type: typeof CLUSTER_FETCH_DISCOVERY,
  +cluster_id: string,
};

export type ClusterFetchMetaAction = {
  +type: typeof CLUSTER_FETCH_META,
  +cluster_id: string,
};

export type ClusterStoreDiscoveryAction = {
  +type: typeof CLUSTER_STORE_DISCOVERY,
  +discovery: ClusterDiscovery,
};

export type ClusterStoreMetaAction = {
  +type: typeof CLUSTER_STORE_META,
  +meta: ClusterMeta,
};

export type ClusterInfoAction =
  ClusterFetchDiscoveryAction |
  ClusterFetchMetaAction |
  ClusterStoreDiscoveryAction |
  ClusterStoreMetaAction |
  {type: 'FLOW_CATCH_ALL'};


export function fetchDiscovery(cluster: string): ClusterFetchDiscoveryAction {
  return {
    type: CLUSTER_FETCH_DISCOVERY,
    cluster_id: cluster,
  };
}

export function fetchMeta(cluster: string): ClusterFetchMetaAction {
  return {
    type: CLUSTER_FETCH_META,
    cluster_id: cluster,
  };
}
