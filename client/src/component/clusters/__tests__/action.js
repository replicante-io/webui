import { CLUSTERS_SEARCH } from '../action';
import { searchClusters } from '../action';


describe('Clusters', () => {
  describe('action', () => {

    test('searchClusters', () => {
      let action = searchClusters('test');
      expect(action).toEqual({
        type: CLUSTERS_SEARCH,
        search: 'test',
      });
    });

  });
});
