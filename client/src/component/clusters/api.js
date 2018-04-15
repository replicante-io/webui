'use strict';
//@flow

import type { ClusterItem } from '../dashboard/action';


export function searchClusters(search: string): Promise<Array<ClusterItem>> {
  let url = '/webui/clusters/search';
  let options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({search: search}),
    method: 'POST',
  };
  return fetch(url, options).then((response) => {
    return response.json().then((body) => {
      if (!response.ok) {
        throw Error('Fetch error: ' + body.error);
      }
      return body;
    });
  });
}
