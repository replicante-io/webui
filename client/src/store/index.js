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

import { defaultState as dashboardDefault } from '../component/dashboard';
import { reducer as dashboard } from '../component/dashboard';
import type { DashboardStore } from '../component/dashboard';

import { defaultState as clusterinfoDefault } from '../component/clusterinfo';
import { reducer as clusterinfo } from '../component/clusterinfo';
import { saga as clusterinfoSaga } from '../component/clusterinfo';
import type { ClusterInfoStore } from '../component/clusterinfo';

import { defaultState as clustersDefault } from '../component/clusters';
import { reducer as clusters } from '../component/clusters';
import { saga as clustersSaga } from '../component/clusters';
import type { ClustersStore } from '../component/clusters';


/** Type for the full application state. */
type Store = {
  clusterinfo: ClusterInfoStore,
  clusters: ClustersStore,
  dashboard: DashboardStore,
  datafetch: DatafetchStore,
};


/** Default state for the full application. */
const defaultState: Store = {
  clusterinfo: clusterinfoDefault,
  clusters: clustersDefault,
  datafetch: datafetchDefault,
  dashboard: dashboardDefault,
};


/** Main reducer function. */
const mainReducer = combineReducers({
  clusterinfo,
  clusters,
  datafetch,
  dashboard,
});


/** Main saga function. */
function* mainSaga() {
  yield all([
    clusterinfoSaga(),
    clustersSaga(),
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
