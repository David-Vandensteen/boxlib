/* eslint-disable max-classes-per-file */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import mixin from '#src/lib/mixin';

describe('mixin', () => {
  class ParentObject {
    parentMethod() {
      return 'Parent Method';
    }
  }

  class ChildObject {
    childMethod() {
      return 'Child Method';
    }
  }

  it('should merge methods from objects', () => {
    const parent = new ParentObject();
    const child = new ChildObject();
    const merged = mixin(parent, child);

    expect(merged.parentMethod).to.be.a('function');
    expect(merged.childMethod).to.be.a('function');
  });

  it('should bind methods to the merged object', () => {
    const parent = new ParentObject();
    const child = new ChildObject();
    const merged = mixin(parent, child);

    const parentMethod = merged.parentMethod.bind(merged);
    const childMethod = merged.childMethod.bind(merged);

    expect(parentMethod()).to.equal('Parent Method');
    expect(childMethod()).to.equal('Child Method');
  });

  it('should not override existing methods in the parent object', () => {
    class ExistingMethodObject {
      existingMethod() {
        return 'Existing Method';
      }
    }

    const parent = new ExistingMethodObject();
    const child = new ChildObject();
    const merged = mixin(parent, child);

    expect(merged.existingMethod).to.be.a('function');
    expect(merged.existingMethod()).to.equal('Existing Method');
  });
});
