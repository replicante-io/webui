'use strict';
//@flow


// TODO: restructure component as follows:
//
//   * datafetch/index.js: re-export needed things.
//   * datafetch/store.js: default state and reducer for store.
//   * datafetch/actions.js: functions to create actions for dispatch.
//   * datafetch/button.js: the button react compoment to trigger fetches.


import Button from './button';


export { Button as FetchButton };
