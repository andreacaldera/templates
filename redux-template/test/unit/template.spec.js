import { expect } from 'chai';

import template from '../../src/template';

describe('Template', () => {
  it('should do something', () => {
    expect(template.methodTwo()).to.equal('method two');
    return Promise.resolve();
  });
});
