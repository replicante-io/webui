import { EVENTS_FETCH } from '../action';
import { fetchEvents } from '../action';


describe('Events', () => {
  describe('action', () => {

    test('fetchEvents', () => {
      let action = fetchEvents();
      expect(action).toEqual({
        type: EVENTS_FETCH
      });
    });

  });
});
