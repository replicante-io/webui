'use strict';
//@flow

import type { Event } from './action';


export function fetchEvents(): Promise<Array<Event>> {
  let url = '/api/events';
  return fetch(url).then((response) => {
    return response.json().then((body) => {
      if (!response.ok) {
        throw Error('Fetch error: ' + body.error);
      }
      return body;
    });
  });
}
