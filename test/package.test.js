import { expect } from 'chai';
import { describe, it } from 'mocha';

import {
  pkg,
  name,
  author,
  version,
  license,
} from '#src/lib/package';

describe('Package', () => {
  it('should export the package object', () => {
    expect(pkg).to.be.an('object');
    expect(pkg.name).to.equal(name);
    expect(pkg.author).to.equal(author);
    expect(pkg.version).to.equal(version);
    expect(pkg.license).to.equal(license);
  });

  it('should export the package properties', () => {
    expect(name).to.be.a('string');
    expect(author).to.be.a('string');
    expect(version).to.be.a('string');
    expect(license).to.be.a('string');
  });
});
