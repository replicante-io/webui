'use strict';
//@flow

import { call, delay, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';

import { FETCH_COMPLETE } from './action';
import { FETCH_DATA } from './action';
import { FETCH_ERROR } from './action';
import { FETCH_START } from './action';
import { FETCH_SUCCESS } from './action';
import type { FetchData } from './action';


/**
 * Fetches data asyncronusly.
 *
 * The fetching process is actually perforemed by the
 * `action.start` function that must return a promise.
 */
export function* fetchData(action: FetchData): any {
  try {
    yield put({type: FETCH_START, id: action.id});
    yield call(action.start);
    yield put({type: FETCH_SUCCESS, id: action.id});

  } catch (error) {
    yield put({type: FETCH_ERROR, id: action.id, error: error});

  } finally {
    yield delay(1500);
    yield put({type: FETCH_COMPLETE, id: action.id});
  }
}


/** Main saga for the datafetch component. */
export function* saga(): any {
  yield takeEvery(FETCH_DATA, fetchData);
}
