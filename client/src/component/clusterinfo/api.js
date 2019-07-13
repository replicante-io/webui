'use strict';
//@flow

import type { AgentDetails } from './action';
import type { ClusterMeta } from '../dashboard/action';
import type { ClusterDiscovery } from './action';
import type { Event } from '../events/action';
import type { NodeInfo } from './action';


export function fetchAgents(cluster_id: string): Promise<Array<AgentDetails>> {
  let url = `/api/cluster/${cluster_id}/agents`;
  return fetch(url).then((response) => {
    return response.json().then((body) => {
      if (!response.ok) {
        throw Error('Fetch error: ' + body.error);
      }
      return body;
    });
  });
}


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


export function fetchEvents(cluster_id: string): Promise<Array<Event>> {
  let url = `/api/cluster/${cluster_id}/events`;
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


export function fetchNodes(cluster_id: string): Promise<Array<NodeInfo>> {
  let url = `/api/cluster/${cluster_id}/nodes`;
  return fetch(url).then((response) => {
    return response.json().then((body) => {
      if (!response.ok) {
        throw Error('Fetch error: ' + body.error);
      }
      return body;
    });
  });
}
