jest.unmock('../index');
jest.unmock('../../../../core/enums');
import { EVENTS } from '../../../../core/enums';

describe('The parse sqs layer', () => {

  let listener;
  let emit;
  let sqsMessageToObj;

  beforeEach(() => {
    listener = require('../index').listener;
    emit = require('../../../../core/event-emitter').emit;
    sqsMessageToObj = require('../../../../utils').sqsMessageToObj;
    sqsMessageToObj.mockReturnValue('returned value');
  });

  describe('When the listener is invoked', () => {
    it('should emit the parse sqs event', () => {
      listener();
      expect(emit).toBeCalledWith(EVENTS.PARSE_SQS, 'returned value');
    });
  });
});
