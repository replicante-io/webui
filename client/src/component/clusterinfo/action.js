'use strict';
//@flow

import type { ClusterMeta } from '../dashboard/action';
import type { Event } from '../events/action';
import type { ActionsSearchStore } from './store';


export type Action = {
  node_id: string,
  action_id: string,
  created_ts: string,
  finished_ts: string,
  kind: string,
  state: string,
  state_payload: ?Object,
};

export type ActionDetails = {
  action: Action,
  history: ActionHistory[],
};

export type ActionHistory = {
  action_id: string,
  timestamp: string,
  state: string,
  state_payload: ?Object
};

export type AgentDetails = {
  host: string,
  status: AgentStatus,
  version_checkout: ?string,
  version_number: ?string,
  version_taint: ?string,
};

export type AgentStatus = {
  code: string,
  data?: string,
};

export type ClusterDiscovery = {
  cluster_id: string,
  display_name: ?string,
  nodes: Array<string>,
};

export type NodeInfo = {
  cluster_id: string,
  kind: string,
  node_id: string,
  version: string,
};


/** Name actions for type checking. */
export const CLUSTER_ACTIONS_SEARCH = 'CLUSTER_ACTIONS_SEARCH';
export const CLUSTER_ACTIONS_SEARCH_FILTERS = 'CLUSTER_ACTIONS_SEARCH_FILTERS';
export const CLUSTER_ACTIONS_SEARCH_STATE = 'CLUSTER_ACTIONS_SEARCH_STATE';
export const CLUSTER_FETCH_ACTION = 'CLUSTER_FETCH_ACTION';
export const CLUSTER_FETCH_AGENTS = 'CLUSTER_FETCH_AGENTS';
export const CLUSTER_FETCH_DISCOVERY = 'CLUSTER_FETCH_DISCOVERY';
export const CLUSTER_FETCH_EVENTS = 'CLUSTER_FETCH_EVENTS';
export const CLUSTER_FETCH_META = 'CLUSTER_FETCH_META';
export const CLUSTER_FETCH_NODES = 'CLUSTER_FETCH_NODES';
export const CLUSTER_FETCH_ORCHESTRATE_REPORT = 'CLUSTER_FETCH_ORCHESTRATE_REPORT';
export const CLUSTER_STORE_ACTION = 'CLUSTER_STORE_ACTION';
export const CLUSTER_STORE_ACTIONS = 'CLUSTER_STORE_ACTIONS';
export const CLUSTER_STORE_AGENTS = 'CLUSTER_STORE_AGENTS';
export const CLUSTER_STORE_DISCOVERY = 'CLUSTER_STORE_DISCOVERY';
export const CLUSTER_STORE_EVENTS = 'CLUSTER_STORE_EVENTS';
export const CLUSTER_STORE_META = 'CLUSTER_STORE_META';
export const CLUSTER_STORE_NODES = 'CLUSTER_STORE_NODES';
export const CLUSTER_STORE_ORCHESTRATE_REPORT = 'CLUSTER_STORE_ORCHESTRATE_REPORT';


/** Type enum of all possible fetch actions. */
export type ClusterActionsSearchAction = {
  +type: typeof CLUSTER_ACTIONS_SEARCH,
  +cluster_id: string,
  +search: ActionsSearchStore,
};

export type ClusterActionsSearchFiltersAction = {
  +type: typeof CLUSTER_ACTIONS_SEARCH_FILTERS,
  +cluster_id: string,
  +search: ActionsSearchStore,
};

export type ClusterActionsSearchStateAction = {
  +type: typeof CLUSTER_ACTIONS_SEARCH_STATE,
  +cluster_id: string,
  +state: boolean,
};

export type ClusterFetchActionAction = {
  +type: typeof CLUSTER_FETCH_ACTION,
  +cluster_id: string,
  +action_id: string,
};

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

export type ClusterFetchOrchestrateReportAction = {
  +type: typeof CLUSTER_FETCH_ORCHESTRATE_REPORT,
  +cluster_id: string,
};

export type ClusterStoreActionAction = {
  +type: typeof CLUSTER_STORE_ACTION,
  +action: ActionDetails,
  +cluster_id: string,
};

export type ClusterStoreActionsAction = {
  +type: typeof CLUSTER_STORE_ACTIONS,
  +actions: Action[],
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

export type ClusterStoreOrchestrateReportAction = {
  +type: typeof CLUSTER_STORE_ORCHESTRATE_REPORT,
  +cluster_id: string,
  +report: Object,
};

export type ClusterInfoAction =
  ClusterActionsSearchAction |
  ClusterActionsSearchFiltersAction |
  ClusterActionsSearchStateAction |
  ClusterFetchActionAction |
  ClusterFetchAgentsAction |
  ClusterFetchDiscoveryAction |
  ClusterFetchEventsAction |
  ClusterFetchMetaAction |
  ClusterFetchNodesAction |
  ClusterFetchOrchestrateReportAction |
  ClusterStoreActionAction |
  ClusterStoreActionsAction |
  ClusterStoreAgentsAction |
  ClusterStoreDiscoveryAction |
  ClusterStoreEventsAction |
  ClusterStoreMetaAction |
  ClusterStoreNodesAction |
  ClusterStoreOrchestrateReportAction |
  {type: 'FLOW_CATCH_ALL'};


export function fetchAction(cluster: string, action: string): ClusterFetchActionAction {
  return {
    type: CLUSTER_FETCH_ACTION,
    cluster_id: cluster,
    action_id: action,
  };
}

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

export function fetchOrchestrateReport(cluster: string): ClusterFetchOrchestrateReportAction {
  return {
    type: CLUSTER_FETCH_ORCHESTRATE_REPORT,
    cluster_id: cluster,
  };
}

export function saveActionsFilters(
  cluster: string,
  search: ActionsSearchStore
): ClusterActionsSearchFiltersAction {
  return {
    type: CLUSTER_ACTIONS_SEARCH_FILTERS,
    cluster_id: cluster,
    search,
  };
}

export function searchActions(
  cluster: string,
  search: ActionsSearchStore
): ClusterActionsSearchAction {
  return {
    type: CLUSTER_ACTIONS_SEARCH,
    cluster_id: cluster,
    search,
  };
}
