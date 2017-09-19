const { expect } = require('chai');

const fileOne = require('../src/file-one');

describe('File one', function() {
    it('should do', function(done) {
        expect(fileOne.methodOne()).to.equal('method-one');
        done();
    })
});