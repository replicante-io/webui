'use strict';
//@flow

import { call, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';

import { CLUSTERS_LIST } from './action';
import { CLUSTERS_SEARCH } from './action';
import { searchClusters as searchClustersApi } from './api';

import type { SearchClustersAction } from './action';


/**
 * Fetches data asyncronusly.
 *
 * The fetching process is actually perforemed by the
 * `action.start` function that must return a promise.
 */
export function* searchClusters(action: SearchClustersAction): any {
  let clusters = yield call(searchClustersApi, action.search);
  yield put({type: CLUSTERS_LIST, clusters: clusters});
}

/** Main saga for the datafetch component. */
export function* saga(): any {
  yield takeEvery(CLUSTERS_SEARCH, searchClusters);
}
