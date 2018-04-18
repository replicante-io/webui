'use strict';
//@flow

import type { ClusterMeta } from '../dashboard/action';
import type { ClusterDiscovery } from './action';


export function fetchDiscovery(cluster: string): Promise<ClusterDiscovery> {
  let url = `/webui/cluster/${cluster}/discovery`;
  return fetch(url).then((response) => {
    return response.json().then((body) => {
      if (!response.ok) {
        throw Error('Fetch error: ' + body.error);
      }
      return body;
    });
  });
}


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
