jest.mock('winston', () => {
  return { log: jest.fn() };
});
jest.unmock('../index');
jest.unmock('../../../../core/enums');
import { EVENTS } from '../../../../core/enums';

describe('The error layer', () => {
  describe('When an error event occurs', () => {
    it('should log to winston', () => {
      const { listener } = require('../index');
      const winston = require('winston');
      listener({type: EVENTS.ERROR}, new Error('hello error layer'));
      expect(winston.log).toBeCalled();
    });
  });
});
