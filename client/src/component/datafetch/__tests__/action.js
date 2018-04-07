import { FETCH_DATA } from '../action';
import { fetchData } from '../action';


describe('datafetch', () => {
  describe('action', () => {

    test('fetchData action', () => {
      let start = () => new Promise(() => {});
      let action = fetchData('test', start);
      expect(action).toEqual({
        type: FETCH_DATA,
        id: 'test',
        start: start,
      });
    });

  });
});
