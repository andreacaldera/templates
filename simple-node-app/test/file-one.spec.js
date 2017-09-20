const { expect } = require('chai');

const fileOne = require('../src/file-one');

describe('File one', () => {
  it('should do some stuff', (done) => {
    expect(fileOne.methodOne()).to.equal('method-one');
    done();
  });

  it('should do some promise stuff', () =>
    fileOne.promiseOne()
      .then((result) => {
        expect(result).to.equal('promise one');
      })
  );
});
