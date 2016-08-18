jest.unmock('../index');

describe('The s3 client', () => {
  let S3;

  beforeEach(() => {
    S3 = require('../index').S3;
  });

  describe('The AWS keys', () => {
    it('should throw an error if there are no aws keys', () => {
      function testit() {
        const s3 = new S3();
      }
      expect(testit).toThrow();
    });

    it('should instantiate when there are AWS keys', () => {
      process.env.AWS_ACCESS_KEY_ID = 'hello';
      process.env.AWS_SECRET_ACCESS_KEY = 'yeah';
      function testit() {
        const s3 = new S3();
      }
      expect(testit).not.toThrow();
      delete process.env.AWS_ACCESS_KEY_ID;
      delete process.env.AWS_SECRET_ACCESS_KEY;
    });
  });

  describe('When using the getClient method', () => {
    it('should return the singleton client', () => {
      process.env.AWS_ACCESS_KEY_ID = 'hello';
      process.env.AWS_SECRET_ACCESS_KEY = 'yeah';
      const s3 = new S3();
      const s3_2 = new S3();
      expect(s3.getClient()).toBe(s3_2.getClient());
      delete process.env.AWS_ACCESS_KEY_ID;
      delete process.env.AWS_SECRET_ACCESS_KEY;
    });
  });
});
