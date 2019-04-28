'use strict';
//@flow


/** Name actions for type checking. */
export const DASHBOARD_CLUSTERS_SET = 'DASHBOARD_CLUSTERS_SET';


/** Types used by actions. */
export type ClusterMeta = {
  agents_down: number,
  cluster_display_name: string,
  cluster_id: string,
  kinds: Array<string>,
  nodes: number,
  nodes_down: number,
  shards_count: number,
  shards_primaries: number,
};


/** Type enum of all possible fetch actions. */
export type StoreClustersAction = {
  +type: typeof DASHBOARD_CLUSTERS_SET,
  +clusters: Array<ClusterMeta>,
};

export type DashboardAction = 
  StoreClustersAction |
  {type: 'FLOW_CATCH_ALL'};


export function storeClusters(clusters: Array<ClusterMeta>): StoreClustersAction {
  return {
    type: DASHBOARD_CLUSTERS_SET,
    clusters: clusters,
  }
}
