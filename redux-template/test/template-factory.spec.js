import { expect } from 'chai';

import templateFactory from '../src/template-factory';

describe('Template factory', () => {
  it('should do something', () => {
    expect(templateFactory().methodOne()).to.equal('method one');
    return Promise.resolve();
  });
});
