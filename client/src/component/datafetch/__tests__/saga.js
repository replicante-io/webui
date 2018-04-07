import { call, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';

import { FETCH_COMPLETE } from '../action';
import { FETCH_DATA } from '../action';
import { FETCH_START } from '../action';

import { fetchData } from '../saga';
import { saga } from '../saga';


describe('datafetch', () => {
  describe('saga', () => {

    test('emit FETCH_START', () => {
      let promise = new Promise(() => {});
      let action = {
        type: FETCH_DATA,
        id: 'test',
        start: () => promise
      };
      const run = fetchData(action);
      expect(run.next().value).toEqual(put({
        type: FETCH_START,
        id: 'test'
      }));
    });

    test('calls the start function', () => { 
      let promise = new Promise(() => {});
      let action = {
        type: FETCH_DATA,
        id: 'test',
        start: () => promise
      };
      const run = fetchData(action);
      run.next();  // Skip FETCH_START
      expect(run.next().value).toEqual(
        call(action.start)
      );
    });

    test('clears the state', () => { 
      let promise = new Promise(() => {});
      let action = {
        type: FETCH_DATA,
        id: 'test',
        start: () => promise
      };
      const run = fetchData(action);
      run.next();  // Skip FETCH_START
      run.next();  // Skip call to start.
      expect(run.next().value).toEqual(put({
        type: FETCH_COMPLETE,
        id: 'test'
      }));
    });

    test('clears the state on error', () => { 
      let action = {
        type: FETCH_DATA,
        id: 'test',
        start: () => { throw Error("Test") },
      };
      const run = fetchData(action);
      run.next();  // Skip FETCH_START
      run.next();  // Skip call to start.
      expect(run.next().value).toEqual(put({
        type: FETCH_COMPLETE,
        id: 'test'
      }));
    });

    test('saga takes every', () => {
      const run = saga();
      expect(run.next().value).toEqual(
        takeEvery(FETCH_DATA, fetchData)
      );
    });

  });
});
