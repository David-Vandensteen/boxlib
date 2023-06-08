import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { Store } from '#src/lib/store';

describe('Store', () => {
  let store;

  beforeEach(() => {
    store = new Store();
  });

  it('should register a new id', () => {
    const id = 'example';
    store.register(id);
    expect(store.id).to.equal(id);
    expect(store[id]).to.be.an('object');
  });

  it('should get the value at a specific location', () => {
    const id = 'example';
    const location = 'key';
    const value = 'value';

    store.register(id);
    store[id][location] = value;

    expect(store.get(location)).to.equal(value);
  });

  it('should set a new value at a specific location', () => {
    const id = 'example';
    const location = 'key';
    const value = 'value';

    store.register(id);
    store.set(location, value);

    expect(store[id][location]).to.equal(value);
  });

  it('should emit an event when setting a new value', (done) => {
    const id = 'example';
    const location = 'key';
    const value = 'value';

    store.register(id);

    store.on(location, (newValue) => {
      expect(newValue).to.equal(value);
      done();
    });

    store.set(location, value);

    const listeners = store.listeners(location);
    expect(listeners).to.have.lengthOf(1);
  });
});
