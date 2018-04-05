'use strict';
//@flow

import { createStore } from 'redux';
import { defaultState, mainReducer } from './reducers';

const store = createStore(mainReducer, defaultState);
export default store;
