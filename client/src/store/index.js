'use strict';
//@flow

import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { defaultState as datafetchDefault } from '../component/datafetch';
import { reducer as datafetch } from '../component/datafetch';
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


/** Create and export the store. */
const store = createStore(mainReducer, defaultState, composeWithDevTools(
  // TODO
));
export default store;
