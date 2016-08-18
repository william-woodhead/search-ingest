jest.unmock('../index');

describe('The elastic search client', () => {
  let Elasticsearch;

  beforeEach(() => {
    Elasticsearch = require('../index').Elasticsearch;
  });

  describe('The AWS keys', () => {
    it('should throw an error if there are no aws keys', () => {
      function testit() {
        const elasticsearch = new Elasticsearch();
      }
      expect(testit).toThrow();
    });

    it('should instantiate when there are AWS keys', () => {
      process.env.AWS_ACCESS_KEY_ID = 'hello';
      process.env.AWS_SECRET_ACCESS_KEY = 'yeah';
      function testit() {
        const elasticsearch = new Elasticsearch();
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
      const elasticsearch = new Elasticsearch();
      const elasticsearch2 = new Elasticsearch();
      expect(elasticsearch.getClient()).toBe(elasticsearch2.getClient());
      delete process.env.AWS_ACCESS_KEY_ID;
      delete process.env.AWS_SECRET_ACCESS_KEY;
    });
  });
});
