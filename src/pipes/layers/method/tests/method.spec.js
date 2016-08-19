jest.unmock('../index');
jest.unmock('../../../../core/enums');
import { EVENTS } from '../../../../core/enums';

describe('The method layer', () => {
  let listener;
  let emit;

  beforeEach(() => {
    listener = require('../index').listener;
    emit = require('../../../../core/event-emitter').emit;
  });

  describe('When the iterator release event occurs', () => {
    describe('And it is a CREATE method', () => {
      it('should emit a method create event', () => {
        listener({ type: EVENTS.ITERATOR_RELEASE }, { method: 'CREATE' });
        expect(emit).toBeCalledWith(EVENTS.METHOD_CREATE, {method: 'CREATE'});
      });
    });

    describe('And it is a UPDATE method', () => {
      it('should emit a method update event', () => {
        listener({ type: EVENTS.ITERATOR_RELEASE }, { method: 'UPDATE' });
        expect(emit).toBeCalledWith(EVENTS.METHOD_UPDATE, {method: 'UPDATE'});
      });
    });
  });
});
