'use strict';
//@flow

import type { ClusterMeta } from '../dashboard/action';

import { CLUSTER_STORE_AGENTS } from './action';
import { CLUSTER_STORE_DISCOVERY } from './action';
import { CLUSTER_STORE_EVENTS } from './action';
import { CLUSTER_STORE_META } from './action';
import { CLUSTER_STORE_NODES } from './action';

import type { AgentDetails } from './action';
import type { ClusterDiscovery } from './action';
import type { ClusterInfoAction } from './action';
import type { ClusterStoreAgentsAction } from './action';
import type { ClusterStoreDiscoveryAction } from './action';
import type { ClusterStoreEventsAction } from './action';
import type { ClusterStoreMetaAction } from './action';
import type { ClusterStoreNodesAction } from './action';
import type { Event } from '../events/action';
import type { NodeInfo } from './action';


export type ClusterInfoStore = {
  agents: {[string]: Array<AgentDetails>},
  discovery: {[string]: ClusterDiscovery},
  events: {[string]: Array<Event>},
  meta: {[string]: ClusterMeta},
  nodes: {[string]: Array<NodeInfo>},
};


export const defaultState: ClusterInfoStore = {
  agents: {},
  discovery: {},
  events: {},
  meta: {},
  nodes: {},
};


export function reducer(state: ClusterInfoStore = defaultState, action: ClusterInfoAction) {
  switch (action.type) {
    case CLUSTER_STORE_AGENTS: return storeAgents(state, action);
    case CLUSTER_STORE_DISCOVERY: return storeDiscovery(state, action);
    case CLUSTER_STORE_EVENTS: return storeEvents(state, action);
    case CLUSTER_STORE_META: return storeMeta(state, action);
    case CLUSTER_STORE_NODES: return storeNodes(state, action);

    default:
      return state;
  }
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
