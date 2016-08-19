jest.unmock('../index');
jest.unmock('../../../../core/enums');
import { EVENTS } from '../../../../core/enums';

describe('The get from db layer', () => {

  let listener;
  let getListingContexts;
  let emit;
  beforeEach(() => {
    listener = require('../index').listener;
    getListingContexts = require('../../../../services/elasticsearch').getListingContexts;
    emit = require('../../../../core/event-emitter').emit;
  });

  describe('When an method update event occurs', () => {
    it('should request listing contexts', () => {
      getListingContexts.mockImplementation(() => {
        return Promise.resolve();
      });
      const config =  { this: 'is config' };
      listener({ type: EVENTS.METHOD_UPDATE }, config);
      expect(getListingContexts).toBeCalledWith(config);
    });

    describe('When the listing context request is successful', () => {
      it('should emit a response from db event', () => {
        getListingContexts.mockImplementation(() => {
          return Promise.resolve({ hits: { hits: [{ _id: '123' }] } });
        });
        const config =  { this: 'is config' };
        return listener({ type: EVENTS.METHOD_UPDATE }, config).then(() => {
          expect(emit).toBeCalledWith(EVENTS.RESPONSE_FROM_ES, {  this: 'is config', id: '123' });
        }).catch(() => {
          expect(false).toBe(true);
        });
      });
    });

    describe('When the listing context request fails', () => {
      it('should emit a response from db event', () => {
        getListingContexts.mockImplementation(() => {
          return Promise.reject('not coolio');
        });
        const config =  { this: 'is config' };
        return listener({ type: EVENTS.METHOD_UPDATE }, config).then(() => {
          expect(false).toBe(true);
        }).catch(() => {
          expect(emit).toBeCalledWith(EVENTS.ERROR, 'not coolio');
        });
      });
    });
  });
});
