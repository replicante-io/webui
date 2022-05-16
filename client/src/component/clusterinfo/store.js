'use strict';
//@flow

import type { ClusterMeta } from '../dashboard/action';

import { CLUSTER_ACTIONS_SEARCH_FILTERS } from './action';
import { CLUSTER_ACTIONS_SEARCH_STATE } from './action';
import { CLUSTER_STORE_ACTION } from './action';
import { CLUSTER_STORE_ACTIONS } from './action';
import { CLUSTER_STORE_AGENTS } from './action';
import { CLUSTER_STORE_DISCOVERY } from './action';
import { CLUSTER_STORE_EVENTS } from './action';
import { CLUSTER_STORE_META } from './action';
import { CLUSTER_STORE_NODES } from './action';
import { CLUSTER_STORE_ORCHESTRATE_REPORT } from './action';

import type { Action } from './action';
import type { ActionDetails } from './action';
import type { AgentDetails } from './action';
import type { ClusterActionsSearchFiltersAction } from './action';
import type { ClusterActionsSearchStateAction } from './action';
import type { ClusterDiscovery } from './action';
import type { ClusterInfoAction } from './action';
import type { ClusterStoreActionAction } from './action';
import type { ClusterStoreActionsAction } from './action';
import type { ClusterStoreAgentsAction } from './action';
import type { ClusterStoreDiscoveryAction } from './action';
import type { ClusterStoreEventsAction } from './action';
import type { ClusterStoreMetaAction } from './action';
import type { ClusterStoreNodesAction } from './action';
import type { ClusterStoreOrchestrateReportAction } from './action';
import type { Event } from '../events/action';
import type { NodeInfo } from './action';


export type ActionsSearchStore = {
  action_kind: string,
  action_state: string,
  from: Date,
  node_id: string,
  searching: boolean,
  until: Date,
};

export type ActionsStore = {
  actions: Action[],
  details: ?ActionDetails,
  search: ActionsSearchStore,
}

export type ClusterInfoStore = {
  actions: {[string]: ActionsStore},
  agents: {[string]: Array<AgentDetails>},
  discovery: {[string]: ClusterDiscovery},
  events: {[string]: Array<Event>},
  meta: {[string]: ClusterMeta},
  nodes: {[string]: Array<NodeInfo>},
  orchestrate_reports: {[string]: Object},
};


export const defaultState: ClusterInfoStore = {
  actions: {},
  agents: {},
  discovery: {},
  events: {},
  meta: {},
  nodes: {},
  orchestrate_reports: {},
};


export function defaultActionsStore() {
  let now = new Date();
  let from = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  return {
    actions: [],
    details: null,
    search: {
      action_kind: '',
      action_state: '',
      from,
      node_id: '',
      searching: false,
      until: now,
    },
  };
}

export function reducer(state: ClusterInfoStore = defaultState, action: ClusterInfoAction) {
  switch (action.type) {
    case CLUSTER_ACTIONS_SEARCH_FILTERS: return storeActionsFilters(state, action);
    case CLUSTER_ACTIONS_SEARCH_STATE: return storeActionsSearching(state, action);
    case CLUSTER_STORE_ACTION: return storeAction(state, action);
    case CLUSTER_STORE_ACTIONS: return storeActions(state, action);
    case CLUSTER_STORE_AGENTS: return storeAgents(state, action);
    case CLUSTER_STORE_DISCOVERY: return storeDiscovery(state, action);
    case CLUSTER_STORE_EVENTS: return storeEvents(state, action);
    case CLUSTER_STORE_META: return storeMeta(state, action);
    case CLUSTER_STORE_NODES: return storeNodes(state, action);
    case CLUSTER_STORE_ORCHESTRATE_REPORT: return storeOrchestrateReport(state, action);

    default:
      return state;
  }
}


function storeActionsFilters(state: ClusterInfoStore, action: ClusterActionsSearchFiltersAction) {
  let newState: ClusterInfoStore = {
    ...state,
    actions: {...state.actions},
  };
  let actions = newState.actions[action.cluster_id] || defaultActionsStore();
  actions = {
    ...actions,
    search: action.search,
  };
  newState.actions[action.cluster_id] = actions;
  return newState;
}


function storeActionsSearching(state: ClusterInfoStore, action: ClusterActionsSearchStateAction) {
  let newState: ClusterInfoStore = {
    ...state,
    actions: {...state.actions},
  };
  let actions = newState.actions[action.cluster_id] || defaultActionsStore();
  actions = {...actions};
  actions.search = {...actions.search};
  actions.search.searching = action.state;
  newState.actions[action.cluster_id] = actions;
  return newState;
}


function storeAction(state: ClusterInfoStore, action: ClusterStoreActionAction) {
  let newState: ClusterInfoStore = {
    ...state,
    actions: {...state.actions},
  };
  let actions = newState.actions[action.cluster_id] || defaultActionsStore();
  actions = {...actions};
  actions.details = action.action;
  newState.actions[action.cluster_id] = actions;
  return newState;
}


function storeActions(state: ClusterInfoStore, action: ClusterStoreActionsAction) {
  let newState: ClusterInfoStore = {
    ...state,
    actions: {...state.actions},
  };
  let actions = newState.actions[action.cluster_id] || defaultActionsStore();
  actions = {...actions};
  actions.actions = action.actions;
  newState.actions[action.cluster_id] = actions;
  return newState;
}


function storeAgents(state: ClusterInfoStore, action: ClusterStoreAgentsAction) {
  let newState: ClusterInfoStore = {
    ...state,
    agents: {...state.agents},
  };
  newState.agents[action.cluster_id] = action.agents;
  return newState;
}


function storeDiscovery(state: ClusterInfoStore, action: ClusterStoreDiscoveryAction) {
  let newState: ClusterInfoStore = {
    ...state,
    discovery: {...state.discovery},
  };
  newState.discovery[action.discovery.cluster_id] = action.discovery;
  return newState;
}

function storeEvents(state: ClusterInfoStore, action: ClusterStoreEventsAction) {
  let newState: ClusterInfoStore = {
    ...state,
    events: {...state.events},
  };
  newState.events[action.cluster_id] = action.events;
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

function storeNodes(state: ClusterInfoStore, action: ClusterStoreNodesAction) {
  let newState: ClusterInfoStore = {
    ...state,
    nodes: {...state.nodes},
  };
  newState.nodes[action.cluster_id] = action.nodes;
  return newState;
}

function storeOrchestrateReport(state: ClusterInfoStore, action: ClusterStoreOrchestrateReportAction) {
  let newState: ClusterInfoStore = {
    ...state,
    orchestrate_reports: {...state.orchestrate_reports},
  };
  newState.orchestrate_reports[action.cluster_id] = action.report;
  return newState;
}
