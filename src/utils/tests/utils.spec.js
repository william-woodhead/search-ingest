jest.unmock('../index');

describe('The utils module', () => {
  describe('The sqsMessageToObj function', () => {
    it('should return a mapped object', () => {
      const message = {
        MessageAttributes: {
          city: {
            StringValue: 'LON'
          },
          type: {
            StringValue: 'listingContext'
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
        index: 'london',
        type: 'listingContext',
        method: 'CREATE',
        slugs: ['123', '124', '125']
      });
    });
  });
});
