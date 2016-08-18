jest.unmock('../index');

describe('The sqs client', () => {
  let SQS;

  beforeEach(() => {
    SQS = require('../index').SQS;
  });

  describe('The AWS keys', () => {
    it('should throw an error if there are no aws keys', () => {
      function testit() {
        const sqs = new SQS();
      }
      expect(testit).toThrow();
    });

    it('should instantiate when there are AWS keys', () => {
      process.env.AWS_ACCESS_KEY_ID = 'hello';
      process.env.AWS_SECRET_ACCESS_KEY = 'yeah';
      function testit() {
        const sqs = new SQS();
      }
      expect(testit).not.toThrow();
      delete process.env.AWS_ACCESS_KEY_ID;
      delete process.env.AWS_SECRET_ACCESS_KEY;
    });
  });
});
