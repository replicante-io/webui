'use strict';
//@flow

import { call, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';

import { CLUSTER_FETCH_META } from './action';
import { CLUSTER_STORE_META } from './action';
import { fetchMeta as fetchMetaApi } from './api';

import type { ClusterFetchMetaAction } from './action';


/**
 * Fetches a cluster metadata and stores it in redux.
 */
export function* fetchMeta(action: ClusterFetchMetaAction): any {
  let meta = yield call(fetchMetaApi, action.cluster);
  yield put({type: CLUSTER_STORE_META, meta: meta});
}

/** Main saga for the datafetch component. */
export function* saga(): any {
  yield takeEvery(CLUSTER_FETCH_META, fetchMeta);
}
