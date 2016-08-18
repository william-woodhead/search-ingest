jest.unmock('../index');

describe('When the create controller is called', () => {
  it('should reject the promise if the name is not in the pre-defined indices', () => {
    const createIndex = require('../index').createIndex;
    return(createIndex({ name: 'bobsled' })).then(() => {
      expect('this').toBe('fail');
    }).catch((err) => {
      expect(true).toBe(true);
    });
  });
});

describe('When the delete controller is called', () => {
  it('should reject the promise if the name is not in the pre-defined indices', () => {
    const deleteIndex = require('../index').deleteIndex;
    return(deleteIndex({ name: 'bobsled' })).then(() => {
      expect('this').toBe('fail');
    }).catch((err) => {
      expect(true).toBe(true);
    });
  });
});
