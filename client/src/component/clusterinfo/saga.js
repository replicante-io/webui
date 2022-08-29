'use strict';
//@flow

import { all } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';

import { CLUSTER_ACTIONS_SEARCH } from './action';
import { CLUSTER_ACTIONS_SEARCH_STATE } from './action';
import { CLUSTER_FETCH_ACTION } from './action';
import { CLUSTER_FETCH_AGENTS } from './action';
import { CLUSTER_FETCH_DISCOVERY } from './action';
import { CLUSTER_FETCH_EVENTS } from './action';
import { CLUSTER_FETCH_META } from './action';
import { CLUSTER_FETCH_NODES } from './action';
import { CLUSTER_FETCH_ORCHESTRATE_REPORT } from './action';
import { CLUSTER_FETCH_ORCHESTRATOR_ACTION } from './action';
import { CLUSTER_ORCHESTRATOR_ACTIONS_SEARCH } from './action';
import { CLUSTER_ORCHESTRATOR_ACTIONS_SEARCH_STATE } from './action';
import { CLUSTER_STORE_ACTION } from './action';
import { CLUSTER_STORE_ACTIONS } from './action';
import { CLUSTER_STORE_AGENTS } from './action';
import { CLUSTER_STORE_DISCOVERY } from './action';
import { CLUSTER_STORE_EVENTS } from './action';
import { CLUSTER_STORE_META } from './action';
import { CLUSTER_STORE_NODES } from './action';
import { CLUSTER_STORE_ORCHESTRATE_REPORT } from './action';
import { CLUSTER_STORE_ORCHESTRATOR_ACTION } from './action';
import { CLUSTER_STORE_ORCHESTRATOR_ACTIONS } from './action';

import { fetchAction as fetchActionApi } from './api';
import { fetchActions as fetchActionsApi } from './api';
import { fetchAgents as fetchAgentsApi } from './api';
import { fetchDiscovery as fetchDiscoveryApi } from './api';
import { fetchEvents as fetchEventsApi } from './api';
import { fetchMeta as fetchMetaApi } from './api';
import { fetchNodes as fetchNodesApi } from './api';
import { fetchOrchestrateReport as fetchOrchestrateReportApi } from './api';
import { fetchOrchestratorAction as fetchOrchestratorActionApi } from './api';
import { fetchOrchestratorActions as fetchOrchestratorActionsApi } from './api';

import type { ClusterActionsSearchAction } from './action';
import type { ClusterFetchActionAction } from './action';
import type { ClusterFetchAgentsAction } from './action';
import type { ClusterFetchDiscoveryAction } from './action';
import type { ClusterFetchEventsAction } from './action';
import type { ClusterFetchMetaAction } from './action';
import type { ClusterFetchNodesAction } from './action';
import type { ClusterFetchOrchestrateReportAction } from './action';


/**
 * Fetches a cluster's agents and stores them in redux.
 */
export function* fetchAgents(action: ClusterFetchAgentsAction): any {
  let agents = yield call(fetchAgentsApi, action.cluster_id);
  yield put({type: CLUSTER_STORE_AGENTS, agents: agents, cluster_id: action.cluster_id});
}

/**
 * Fetches a cluster's action and stores it in redux.
 */
export function* fetchAction(action: ClusterFetchActionAction): any {
  let details = yield call(fetchActionApi, action.cluster_id, action.action_id);
  yield put({
    type: CLUSTER_STORE_ACTION,
    cluster_id: action.cluster_id,
    action: details,
  });
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

/**
 * Fetches a cluster's orchestrate report and stores them in redux.
 */
 export function* fetchOrchestrateReport(action: ClusterFetchOrchestrateReportAction): any {
  let report = yield call(fetchOrchestrateReportApi, action.cluster_id);
  yield put({
    type: CLUSTER_STORE_ORCHESTRATE_REPORT,
    cluster_id: action.cluster_id,
    report: report
  });
}

/**
 * Fetches a cluster's orchestrator action and stores it in redux.
 */
 export function* fetchOrchestratorAction(action): any {
  let details = yield call(fetchOrchestratorActionApi, action.cluster_id, action.action_id);
  yield put({
    type: CLUSTER_STORE_ORCHESTRATOR_ACTION,
    cluster_id: action.cluster_id,
    action: details,
  });
}

/** Execute an actions search. */
export function* searchActions(action: ClusterActionsSearchAction): any {
  yield put({type: CLUSTER_ACTIONS_SEARCH_STATE, cluster_id: action.cluster_id, state: true});
  try {
    let actions = yield call(fetchActionsApi, action.cluster_id, action.search);
    yield put({type: CLUSTER_STORE_ACTIONS, cluster_id: action.cluster_id, actions})
  } catch (error) {
    console.error("Failed to search for actions", error);
  } finally {
    yield put({type: CLUSTER_ACTIONS_SEARCH_STATE, cluster_id: action.cluster_id, state: false});
  }
}

/** Execute an orchestrator actions search. */
export function* searchOrchestratorActions(action: ClusterActionsSearchAction): any {
  yield put({
    type: CLUSTER_ORCHESTRATOR_ACTIONS_SEARCH_STATE,
    cluster_id: action.cluster_id,
    state: true,
  });
  try {
    let actions = yield call(fetchOrchestratorActionsApi, action.cluster_id, action.search);
    yield put({type: CLUSTER_STORE_ORCHESTRATOR_ACTIONS, cluster_id: action.cluster_id, actions})
  } catch (error) {
    console.error("Failed to search for orchestrator actions", error);
  } finally {
    yield put({
      type: CLUSTER_ORCHESTRATOR_ACTIONS_SEARCH_STATE,
      cluster_id: action.cluster_id,
      state: false,
    });
  }
}

/** Main saga for the datafetch component. */
export function* saga(): any {
  yield all([
    takeEvery(CLUSTER_ACTIONS_SEARCH, searchActions),
    takeEvery(CLUSTER_FETCH_ACTION, fetchAction),
    takeEvery(CLUSTER_FETCH_AGENTS, fetchAgents),
    takeEvery(CLUSTER_FETCH_DISCOVERY, fetchDiscovery),
    takeEvery(CLUSTER_FETCH_EVENTS, fetchEvents),
    takeEvery(CLUSTER_FETCH_META, fetchMeta),
    takeEvery(CLUSTER_FETCH_NODES, fetchNodes),
    takeEvery(CLUSTER_FETCH_ORCHESTRATE_REPORT, fetchOrchestrateReport),
    takeEvery(CLUSTER_FETCH_ORCHESTRATOR_ACTION, fetchOrchestratorAction),
    takeEvery(CLUSTER_ORCHESTRATOR_ACTIONS_SEARCH, searchOrchestratorActions),
  ]);
}
