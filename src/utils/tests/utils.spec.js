jest.unmock('../index');

describe('The utils module', () => {
  describe('The sqsMessageToObj function', () => {
    it('should return a mapped object', () => {
      const message = {
        MessageAttributes: {
          index: {
            StringValue: 'public'
          },
          type: {
            StringValue: 'users'
          },
          method: {
            StringValue: 'CREATE'
          },
          slugs: {
            StringValue: '123,124,125'
          }
        }
      };
      const { sqsMessageToObj } = require('../index');

      expect(sqsMessageToObj(message)).toEqual({
        index: 'public',
        type: 'users',
        method: 'CREATE',
        slugs: ['123', '124', '125']
      });
    });
  });
});
