jest.unmock('../index');
jest.unmock('../../../../core/enums');
import { EVENTS } from '../../../../core/enums';

describe('The index in es layer', () => {

  let listener;
  let postToIndex;
  let emit;
  beforeEach(() => {
    listener = require('../index').listener;
    postToIndex = require('../../../../services/elasticsearch').postToIndex;
    emit = require('../../../../core/event-emitter').emit;
  });

  describe('When an method update event occurs', () => {
    it('should request listing contexts', () => {
      postToIndex.mockImplementation(() => {
        return Promise.resolve();
      });
      const config =  { this: 'is config' };
      listener({ type: EVENTS.RESPONSE_FROM_DB }, config);
      expect(postToIndex).toBeCalledWith(config);
    });

    describe('When the listing context request is successful', () => {
      it('should emit a response from db event', () => {
        postToIndex.mockImplementation(() => {
          return Promise.resolve('coolio');
        });
        const config =  { this: 'is config' };
        return listener({ type: EVENTS.RESPONSE_FROM_DB }, config).then(() => {
          expect(emit).toBeCalledWith(EVENTS.DOCUMENT_INDEXED, {  this: 'is config', result: 'coolio' });
        }).catch(() => {
          expect(false).toBe(true);
        });
      });
    });

    describe('When the listing context request fails', () => {
      it('should emit a response from db event', () => {
        postToIndex.mockImplementation(() => {
          return Promise.reject('not coolio');
        });
        const config =  { this: 'is config' };
        return listener({ type: EVENTS.RESPONSE_FROM_DB }, config).then(() => {
          expect(false).toBe(true);
        }).catch(() => {
          expect(emit).toBeCalledWith(EVENTS.ERROR, 'not coolio');
        });
      });
    });
  });
});
