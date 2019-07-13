'use strict';
//@flow

import type { ClusterMeta } from '../dashboard/action';
import type { Event } from '../events/action';


export type AgentDetails = {
  host: string,
  status: AgentStatus,
  version_checkout: ?string,
  version_number: ?string,
  version_taint: ?string,
}

export type AgentStatus = {
  code: string,
  data?: string,
}

export type ClusterDiscovery = {
  cluster_id: string,
  display_name: ?string,
  nodes: Array<string>,
}

export type NodeInfo = {
  cluster_id: string,
  kind: string,
  node_id: string,
  version: string,
}


/** Name actions for type checking. */
export const CLUSTER_FETCH_AGENTS = 'CLUSTER_FETCH_AGENTS';
export const CLUSTER_FETCH_DISCOVERY = 'CLUSTER_FETCH_DISCOVERY';
export const CLUSTER_FETCH_EVENTS = 'CLUSTER_FETCH_EVENTS';
export const CLUSTER_FETCH_META = 'CLUSTER_FETCH_META';
export const CLUSTER_FETCH_NODES = 'CLUSTER_FETCH_NODES';
export const CLUSTER_STORE_AGENTS = 'CLUSTER_STORE_AGENTS';
export const CLUSTER_STORE_DISCOVERY = 'CLUSTER_STORE_DISCOVERY';
export const CLUSTER_STORE_EVENTS = 'CLUSTER_STORE_EVENTS';
export const CLUSTER_STORE_META = 'CLUSTER_STORE_META';
export const CLUSTER_STORE_NODES = 'CLUSTER_STORE_NODES';


/** Type enum of all possible fetch actions. */
export type ClusterFetchAgentsAction = {
  +type: typeof CLUSTER_FETCH_AGENTS,
  +cluster_id: string,
};
export type ClusterFetchDiscoveryAction = {
  +type: typeof CLUSTER_FETCH_DISCOVERY,
  +cluster_id: string,
};

export type ClusterFetchEventsAction = {
  +type: typeof CLUSTER_FETCH_EVENTS,
  +cluster_id: string,
};

export type ClusterFetchMetaAction = {
  +type: typeof CLUSTER_FETCH_META,
  +cluster_id: string,
};

export type ClusterFetchNodesAction = {
  +type: typeof CLUSTER_FETCH_NODES,
  +cluster_id: string,
};

export type ClusterStoreAgentsAction = {
  +type: typeof CLUSTER_STORE_AGENTS,
  +agents: Array<AgentDetails>,
  +cluster_id: string,
};

export type ClusterStoreDiscoveryAction = {
  +type: typeof CLUSTER_STORE_DISCOVERY,
  +discovery: ClusterDiscovery,
};

export type ClusterStoreEventsAction = {
  +type: typeof CLUSTER_STORE_EVENTS,
  +cluster_id: string,
  +events: Array<Event>,
};

export type ClusterStoreMetaAction = {
  +type: typeof CLUSTER_STORE_META,
  +meta: ClusterMeta,
};

export type ClusterStoreNodesAction = {
  +type: typeof CLUSTER_STORE_NODES,
  +cluster_id: string,
  +nodes: Array<NodeInfo>,
};

export type ClusterInfoAction =
  ClusterFetchAgentsAction |
  ClusterFetchDiscoveryAction |
  ClusterFetchEventsAction |
  ClusterFetchMetaAction |
  ClusterFetchNodesAction |
  ClusterStoreAgentsAction |
  ClusterStoreDiscoveryAction |
  ClusterStoreEventsAction |
  ClusterStoreMetaAction |
  ClusterStoreNodesAction |
  {type: 'FLOW_CATCH_ALL'};


export function fetchAgents(cluster: string): ClusterFetchAgentsAction {
  return {
    type: CLUSTER_FETCH_AGENTS,
    cluster_id: cluster,
  };
}

export function fetchDiscovery(cluster: string): ClusterFetchDiscoveryAction {
  return {
    type: CLUSTER_FETCH_DISCOVERY,
    cluster_id: cluster,
  };
}

export function fetchEvents(cluster: string): ClusterFetchEventsAction {
  return {
    type: CLUSTER_FETCH_EVENTS,
    cluster_id: cluster,
  };
}

export function fetchMeta(cluster: string): ClusterFetchMetaAction {
  return {
    type: CLUSTER_FETCH_META,
    cluster_id: cluster,
  };
}

export function fetchNodes(cluster: string): ClusterFetchNodesAction {
  return {
    type: CLUSTER_FETCH_NODES,
    cluster_id: cluster,
  };
}
