'use strict';
//@flow

import type { ClusterMeta } from '../dashboard/action';


/** Name actions for type checking. */
export const CLUSTERS_LIST = 'CLUSTERS_LIST';
export const CLUSTERS_SEARCH = 'CLUSTERS_SEARCH';


/** Type enum of all possible fetch actions. */
export type ListClustersAction = {
  +type: typeof CLUSTERS_LIST,
  +clusters: Array<ClusterMeta>,
};

export type SearchClustersAction = {
  +type: typeof CLUSTERS_SEARCH,
  +search: string,
};

export type ClustersAction =
  ListClustersAction |
  SearchClustersAction |
  {type: 'FLOW_CATCH_ALL'};


export function searchClusters(search: string): SearchClustersAction {
  return {
    type: CLUSTERS_SEARCH,
    search: search,
  };
}
