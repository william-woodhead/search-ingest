jest.unmock('../index');
jest.unmock('../../../../core/enums');
import { EVENTS } from '../../../../core/enums';

describe('The get from db layer', () => {

  let listener;
  let requestContent;
  let emit;
  beforeEach(() => {
    listener = require('../index').listener;
    requestContent = require('../../../../services/content-db').requestContent;
    emit = require('../../../../core/event-emitter').emit;
  });

  describe('When an method create event occurs', () => {
    it('should request content', () => {
      requestContent.mockImplementation(() => {
        return Promise.resolve();
      });
      const config =  { this: 'is config' };
      listener({ type: EVENTS.METHOD_CREATE }, config);
      expect(requestContent).toBeCalledWith(config);
    });

    describe('When the content request is successful', () => {
      it('should emit a response from db event', () => {
        requestContent.mockImplementation(() => {
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

    describe('When the content request fails', () => {
      it('should emit a response from db event', () => {
        requestContent.mockImplementation(() => {
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
    it('should request content', () => {
      requestContent.mockImplementation(() => {
        return Promise.resolve();
      });
      const config =  { this: 'is config' };
      listener({ type: EVENTS.RESPONSE_FROM_ES }, config);
      expect(requestContent).toBeCalledWith(config);
    });

    describe('When the content request is successful', () => {
      it('should emit a response from db event', () => {
        requestContent.mockImplementation(() => {
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

    describe('When the content request fails', () => {
      it('should emit a response from db event', () => {
        requestContent.mockImplementation(() => {
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
