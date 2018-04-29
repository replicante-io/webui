'use strict';
//@flow

import { call, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';

import { EVENTS_FETCH } from './action';
import { EVENTS_STORE } from './action';

import { fetchEvents as fetchEventsApi } from './api';

import type { EventsFetchAction } from './action';


/**
 * Fetches the list of recent events.
 */
export function* fetchEvents(action: EventsFetchAction): any {
  let events = yield call(fetchEventsApi);
  yield put({type: EVENTS_STORE, events: events});
}

/** Main saga for the datafetch component. */
export function* saga(): any {
  yield takeEvery(EVENTS_FETCH, fetchEvents);
}
