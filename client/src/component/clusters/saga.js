'use strict';
//@flow

import { call, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';

import { CLUSTERS_LIST } from './action';
import { CLUSTERS_SEARCH } from './action';
import { searchClusters as searchClustersApi } from './api';

import type { SearchClustersAction } from './action';


/**
 * Searches for clusters matching the given name.
 */
export function* searchClusters(action: SearchClustersAction): any {
  try {
    let clusters = yield call(searchClustersApi, action.search);
    yield put({type: CLUSTERS_LIST, clusters: clusters});
  } catch(error) {
    console.error("Failed to search for clusters", error);
  }
}

/** Main saga for the datafetch component. */
export function* saga(): any {
  yield takeEvery(CLUSTERS_SEARCH, searchClusters);
}
