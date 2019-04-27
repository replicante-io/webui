'use strict';
//@flow

import { all } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';

import { CLUSTER_FETCH_DISCOVERY } from './action';
import { CLUSTER_FETCH_META } from './action';
import { CLUSTER_STORE_DISCOVERY } from './action';
import { CLUSTER_STORE_META } from './action';

import { fetchDiscovery as fetchDiscoveryApi } from './api';
import { fetchMeta as fetchMetaApi } from './api';

import type { ClusterFetchDiscoveryAction } from './action';
import type { ClusterFetchMetaAction } from './action';


/**
 * Fetches a cluster discovery and stores it in redux.
 */
export function* fetchDiscovery(action: ClusterFetchDiscoveryAction): any {
  let discovery = yield call(fetchDiscoveryApi, action.cluster_id);
  yield put({type: CLUSTER_STORE_DISCOVERY, discovery: discovery});
}

/**
 * Fetches a cluster metadata and stores it in redux.
 */
export function* fetchMeta(action: ClusterFetchMetaAction): any {
  let meta = yield call(fetchMetaApi, action.cluster_id);
  yield put({type: CLUSTER_STORE_META, meta: meta});
}

/** Main saga for the datafetch component. */
export function* saga(): any {
  yield all([
    takeEvery(CLUSTER_FETCH_DISCOVERY, fetchDiscovery),
    takeEvery(CLUSTER_FETCH_META, fetchMeta)
  ]);
}
