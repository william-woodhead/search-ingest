jest.unmock('../index');
jest.unmock('../../../../core/enums');
import { EVENTS } from '../../../../core/enums';

describe('The get from db layer', () => {

  let listener;
  let requestListingContext;
  let emit;
  beforeEach(() => {
    listener = require('../index').listener;
    requestListingContext = require('../../../../services/content-db').requestListingContext;
    emit = require('../../../../core/event-emitter').emit;
  });

  describe('When an method create event occurs', () => {
    it('should request listing contexts', () => {
      requestListingContext.mockImplementation(() => {
        return Promise.resolve();
      });
      const config =  { this: 'is config' };
      listener({ type: EVENTS.METHOD_CREATE }, config);
      expect(requestListingContext).toBeCalledWith(config);
    });

    describe('When the listing context request is successful', () => {
      it('should emit a response from db event', () => {
        requestListingContext.mockImplementation(() => {
          return Promise.resolve('coolio');
        });
        const config =  { this: 'is config' };
        return listener({ type: EVENTS.METHOD_CREATE }, config).then(() => {
          expect(emit).toBeCalledWith(EVENTS.RESPONSE_FROM_DB, {  this: 'is config', result: 'coolio' });
        }).catch(() => {
          expect(false).toBe(true);
        });
      });
    });

    describe('When the listing context request fails', () => {
      it('should emit a response from db event', () => {
        requestListingContext.mockImplementation(() => {
          return Promise.reject('not coolio');
        });
        const config =  { this: 'is config' };
        return listener({ type: EVENTS.METHOD_CREATE }, config).then(() => {
          expect(false).toBe(true);
        }).catch(() => {
          expect(emit).toBeCalledWith(EVENTS.ERROR, 'not coolio');
        });
      });
    });
  });

  describe('When an response from es event occurs', () => {
    it('should request listing contexts', () => {
      requestListingContext.mockImplementation(() => {
        return Promise.resolve();
      });
      const config =  { this: 'is config' };
      listener({ type: EVENTS.RESPONSE_FROM_ES }, config);
      expect(requestListingContext).toBeCalledWith(config);
    });

    describe('When the listing context request is successful', () => {
      it('should emit a response from db event', () => {
        requestListingContext.mockImplementation(() => {
          return Promise.resolve('coolio');
        });
        const config =  { this: 'is config' };
        return listener({ type: EVENTS.RESPONSE_FROM_ES }, config).then(() => {
          expect(emit).toBeCalledWith(EVENTS.RESPONSE_FROM_DB, {  this: 'is config', result: 'coolio' });
        }).catch(() => {
          expect(false).toBe(true);
        });
      });
    });

    describe('When the listing context request fails', () => {
      it('should emit a response from db event', () => {
        requestListingContext.mockImplementation(() => {
          return Promise.reject('not coolio');
        });
        const config =  { this: 'is config' };
        return listener({ type: EVENTS.RESPONSE_FROM_ES }, config).then(() => {
          expect(false).toBe(true);
        }).catch(() => {
          expect(emit).toBeCalledWith(EVENTS.ERROR, 'not coolio');
        });
      });
    });
  });
});
