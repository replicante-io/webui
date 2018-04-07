'use strict';
//@flow

import { applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import { defaultState as datafetchDefault } from '../component/datafetch';
import { reducer as datafetch } from '../component/datafetch';
import { saga as datafetchSaga } from '../component/datafetch';
import type { FetchStore as DatafetchStore } from '../component/datafetch';


/** Type for the full application state. */
type Store = {
  datafetch: DatafetchStore,
};


/** Default state for the full application. */
const defaultState: Store = {
  datafetch: datafetchDefault,
};


/** Main reducer function. */
const mainReducer = combineReducers({
  datafetch,
});


/** Main saga function. */
function* mainSaga() {
  yield all([
    datafetchSaga(),
  ]);
}


/** Create and export the store. */
const sagaMiddleware = createSagaMiddleware();
const store = createStore(mainReducer, defaultState, composeWithDevTools(
  applyMiddleware(sagaMiddleware)
));
sagaMiddleware.run(mainSaga);
export default store;
