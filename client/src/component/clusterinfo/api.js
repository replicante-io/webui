'use strict';
//@flow

import type { AgentDetails } from './action';
import type { ClusterMeta } from '../dashboard/action';
import type { ClusterDiscovery } from './action';
import type { Event } from '../events/action';
import type { Action } from './action';
import type { ActionsSearchStore } from './store';
import type { NodeInfo } from './action';


export function fetchAction(cluster_id: string, action_id: string): Promise<Action> {
  let url = `/api/cluster/${cluster_id}/action/${action_id}`;
  return fetch(url).then((response) => {
    return response.json().then((body) => {
      if (!response.ok) {
        throw Error('Fetch error: ' + body.error);
      }
      return body;
    });
  });
}


export function fetchActions(cluster_id: string, search: ActionsSearchStore): Promise<Array<Action>> {
  let payload = {
    action_kind: search.action_kind,
    action_state: search.action_state,
    from: search.from.toISOString(),
    node_id: search.node_id,
    until: search.until.toISOString(),
  };
  let url = `/api/cluster/${cluster_id}/actions`;
  let options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(payload),
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
