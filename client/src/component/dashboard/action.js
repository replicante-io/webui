'use strict';
//@flow


/** Name actions for type checking. */
export const DASHBOARD_CLUSTERS_SET = 'DASHBOARD_CLUSTERS_SET';


/** Types used by actions. */
export type ClusterItem = {
  kinds: Array<string>,
  name: string,
  nodes: number,
};


/** Type enum of all possible fetch actions. */
export type StoreClustersAction = {
  +type: typeof DASHBOARD_CLUSTERS_SET,
  +clusters: Array<ClusterItem>,
};

export type DashboardAction = 
  StoreClustersAction |
  {type: 'FLOW_CATCH_ALL'};


export function storeClusters(clusters: Array<ClusterItem>): StoreClustersAction {
  return {
    type: DASHBOARD_CLUSTERS_SET,
    clusters: clusters,
  }
}
