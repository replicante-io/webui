import { DASHBOARD_CLUSTERS_SET } from '../action';
import { defaultState } from '../store';
import { reducer } from '../store';


describe('Dashboard', () => {
  describe('store', () => {

    test('DASHBOARD_CLUSTERS_SET', () => {
      let cluster = {
          kinds: ['Kafka'],
          name: 'test',
          nodes: 4
      };
      let action = {
        type: DASHBOARD_CLUSTERS_SET,
        clusters: [cluster]
      };
      let state = reducer(defaultState, action);
      expect(state).toEqual({clusters: [cluster]});
    });

    test('other transition', () => {
      let action = {type: 'OTHER'};
      let state = reducer(undefined, action);
      expect(state).toEqual(defaultState);
    });

  });
});
