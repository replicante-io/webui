'use strict';
//@flow

import type { ClusterMeta } from '../dashboard/action';
import type { ClusterDiscovery } from './action';


export function fetchDiscovery(cluster_id: string): Promise<ClusterDiscovery> {
  let url = `/api/cluster/${cluster_id}/discovery`;
  return fetch(url).then((response) => {
    return response.json().then((body) => {
      if (!response.ok) {
        throw Error('Fetch error: ' + body.error);
      }
      return body;
    });
  });
}


export function fetchMeta(cluster_id: string): Promise<ClusterMeta> {
  let url = `/api/cluster/${cluster_id}/meta`;
  return fetch(url).then((response) => {
    return response.json().then((body) => {
      if (!response.ok) {
        throw Error('Fetch error: ' + body.error);
      }
      return body;
    });
  });
}
