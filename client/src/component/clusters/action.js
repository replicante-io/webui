'use strict';
//@flow


/** Name actions for type checking. */
export const CLUSTERS_SEARCH = 'CLUSTERS_SEARCH';


/** Type enum of all possible fetch actions. */
export type SearchClustersAction = {
  +type: typeof CLUSTERS_SEARCH,
  +search: string,
};

export type ClustersAction =
  SearchClustersAction |
  {type: 'FLOW_CATCH_ALL'};


export function searchClusters(search: string): SearchClustersAction {
  return {
    type: CLUSTERS_SEARCH,
    search: search,
  };
}
