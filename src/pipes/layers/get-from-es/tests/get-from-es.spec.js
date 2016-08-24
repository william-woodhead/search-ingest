jest.unmock('../index');
jest.unmock('../../../../core/enums');
import { EVENTS } from '../../../../core/enums';

describe('The get from db layer', () => {

  let listener;
  let getDocuments;
  let emit;
  beforeEach(() => {
    listener = require('../index').listener;
    getDocuments = require('../../../../services/elasticsearch').getDocuments;
    emit = require('../../../../core/event-emitter').emit;
  });

  describe('When an method update event occurs', () => {
    it('should request content', () => {
      getDocuments.mockImplementation(() => {
        return Promise.resolve();
      });
      const config =  { this: 'is config' };
      listener({ type: EVENTS.METHOD_UPDATE }, config);
      expect(getDocuments).toBeCalledWith(config);
    });

    describe('When the content request is successful', () => {
      it('should emit a response from db event', () => {
        getDocuments.mockImplementation(() => {
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

    describe('When the content request fails', () => {
      it('should emit a response from db event', () => {
        getDocuments.mockImplementation(() => {
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
