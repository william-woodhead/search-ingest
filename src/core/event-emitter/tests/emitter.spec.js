jest.unmock('../index');
jest.mock('events');

describe('The Event emitter', () => {
  let emit;
  let Emitter;
  beforeEach(() => {
    Emitter = require('events');
    emit = require('../index').emit;
  });

  describe('When subscribe is called', () => {
    it('should not throw an error', () => {
      function testIt() {
        emit('cool');
      }
      expect(testIt).not.toThrow();
    });

    it('should not emit an event on the event emitter', () => {
      function testIt() {
        emit('cool');
      }
      emit('cool', { pay: 'load' });
      expect(Emitter.mock.instances[0].emit).toBeCalledWith('event', { type: 'cool' }, { pay: 'load' });
    });
  });

  describe('When emit is called without a type', () => {
    it('should throw an error', () => {
      function testIt() {
        emit();
      }
      expect(testIt).toThrow();
    });
  });

  describe('When emit is called with a type', () => {
    it('should not throw an error', () => {
      function testIt() {
        emit('cool');
      }
      expect(testIt).not.toThrow();
    });

    it('should not emit an event on the event emitter', () => {
      function testIt() {
        emit('cool');
      }
      emit('cool', {pay: 'load'});
      expect(Emitter.mock.instances[0].emit).toBeCalledWith('event', { type: 'cool' }, { pay: 'load' });
    });
  });
});
