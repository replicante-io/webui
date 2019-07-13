'use strict';
//@flow

import { all } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';

import { CLUSTER_FETCH_AGENTS } from './action';
import { CLUSTER_FETCH_DISCOVERY } from './action';
import { CLUSTER_FETCH_EVENTS } from './action';
import { CLUSTER_FETCH_META } from './action';
import { CLUSTER_FETCH_NODES } from './action';
import { CLUSTER_STORE_AGENTS } from './action';
import { CLUSTER_STORE_DISCOVERY } from './action';
import { CLUSTER_STORE_EVENTS } from './action';
import { CLUSTER_STORE_META } from './action';
import { CLUSTER_STORE_NODES } from './action';

import { fetchAgents as fetchAgentsApi } from './api';
import { fetchDiscovery as fetchDiscoveryApi } from './api';
import { fetchEvents as fetchEventsApi } from './api';
import { fetchMeta as fetchMetaApi } from './api';
import { fetchNodes as fetchNodesApi } from './api';

import type { ClusterFetchAgentsAction } from './action';
import type { ClusterFetchDiscoveryAction } from './action';
import type { ClusterFetchEventsAction } from './action';
import type { ClusterFetchMetaAction } from './action';
import type { ClusterFetchNodesAction } from './action';


/**
 * Fetches a cluster's agents and stores them in redux.
 */
export function* fetchAgents(action: ClusterFetchAgentsAction): any {
  let agents = yield call(fetchAgentsApi, action.cluster_id);
  yield put({type: CLUSTER_STORE_AGENTS, agents: agents, cluster_id: action.cluster_id});
}

/**
 * Fetches a cluster discovery and stores it in redux.
 */
export function* fetchDiscovery(action: ClusterFetchDiscoveryAction): any {
  let discovery = yield call(fetchDiscoveryApi, action.cluster_id);
  yield put({type: CLUSTER_STORE_DISCOVERY, discovery: discovery});
}

/**
 * Fetches a cluster's events and stores them in redux.
 */
export function* fetchEvents(action: ClusterFetchEventsAction): any {
  let events = yield call(fetchEventsApi, action.cluster_id);
  yield put({type: CLUSTER_STORE_EVENTS, cluster_id: action.cluster_id, events: events});
}

/**
 * Fetches a cluster metadata and stores it in redux.
 */
export function* fetchMeta(action: ClusterFetchMetaAction): any {
  let meta = yield call(fetchMetaApi, action.cluster_id);
  yield put({type: CLUSTER_STORE_META, meta: meta});
}

/**
 * Fetches a cluster's nodes and stores them in redux.
 */
export function* fetchNodes(action: ClusterFetchNodesAction): any {
  let nodes = yield call(fetchNodesApi, action.cluster_id);
  yield put({type: CLUSTER_STORE_NODES, cluster_id: action.cluster_id, nodes: nodes});
}

/** Main saga for the datafetch component. */
export function* saga(): any {
  yield all([
    takeEvery(CLUSTER_FETCH_AGENTS, fetchAgents),
    takeEvery(CLUSTER_FETCH_DISCOVERY, fetchDiscovery),
    takeEvery(CLUSTER_FETCH_EVENTS, fetchEvents),
    takeEvery(CLUSTER_FETCH_META, fetchMeta),
    takeEvery(CLUSTER_FETCH_NODES, fetchNodes),
  ]);
}
