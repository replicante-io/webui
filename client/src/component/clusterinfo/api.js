'use strict';
//@flow

import type { ClusterMeta } from '../dashboard/action';


export function fetchMeta(cluster: string): Promise<ClusterMeta> {
  let url = `/webui/cluster/${cluster}/meta`;
  return fetch(url).then((response) => {
    return response.json().then((body) => {
      if (!response.ok) {
        throw Error('Fetch error: ' + body.error);
      }
      return body;
    });
  });
}
