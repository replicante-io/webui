import { DASHBOARD_CLUSTERS_SET } from '../action';
import { storeClusters } from '../action';


describe('Dashboard', () => {
  describe('action', () => {

    test('storeClusters', () => {
      let clusters = [{
        kinds: ['MongoDB'],
        name: 'test1',
        nodes: 1
      }, {
        kinds: ['Kafka'],
        name: 'test2',
        nodes: 4
      }];
      let action = storeClusters(clusters);
      expect(action).toEqual({
        type: DASHBOARD_CLUSTERS_SET,
        clusters: clusters,
      });
    });

  });
});
