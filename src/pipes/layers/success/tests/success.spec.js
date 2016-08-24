jest.mock('winston', () => {
  return { log: jest.fn() };
});
jest.unmock('../index');
jest.unmock('../../../../core/enums');
import { EVENTS } from '../../../../core/enums';

describe('The success layer', () => {
  describe('When an document indexed event occurs', () => {
    it('should log to winston', () => {
      const { listener } = require('../index');
      const winston = require('winston');
      listener({type: EVENTS.DOCUMENT_INDEXED}, { slug: 'slugly' });
      expect(winston.log).toBeCalledWith('info', 'indexed');
    });
  });
});
