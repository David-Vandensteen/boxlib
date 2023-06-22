import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { Store } from '#src/lib/store';

describe('Store', () => {
  let store;

  beforeEach(() => {
    store = new Store();
  });

  describe('get', () => {
    it('should return undefined if namespace does not exist', () => {
      const result = store.get('key');
      expect(result).to.be.undefined;
    });

    it('should return the value for the specified key in the default namespace', () => {
      store.defaultStore = { key: 'value' };
      const result = store.get('key');
      expect(result).to.equal('value');
    });

    it('should return the value for the specified key in the specified namespace', () => {
      store.namespace1 = { key: 'value' };
      const result = store.get('key', { nameSpace: 'namespace1' });
      expect(result).to.equal('value');
    });
  });

  describe('set', () => {
    let emitCalled;
    let emitArgs;

    beforeEach(() => {
      emitCalled = false;
      emitArgs = null;

      store.on = (eventName, callback) => {
        emitCalled = true;
        emitArgs = [eventName, callback];
      };
    });

    it('should create the default namespace if it does not exist', () => {
      store.set('key', 'value');
      expect(store.defaultStore).to.deep.equal({ key: 'value' });
    });

    it('should set the value for the specified key in the default namespace', () => {
      store.set('key', 'value');
      expect(store.defaultStore.key).to.equal('value');
    });

    it('should emit an event with the specified namespace and key', () => {
      store.set('key', 'value', { nameSpace: 'namespace1' });
      expect(emitCalled).to.be.true;
      expect(emitArgs[0]).to.equal('namespace1:key');
      expect(emitArgs[1]).to.be.a('function');

      // Test the emitted callback separately
      const callback = emitArgs[1];
      let callbackCalled = false;
      callback((arg) => {
        callbackCalled = true;
        expect(arg).to.equal('value');
      });
      expect(callbackCalled).to.be.true;
    });

    it('should not emit an event if the value for the specified key is the same', () => {
      store.defaultStore = { key: 'value' };
      store.set('key', 'value');
      expect(emitCalled).to.be.false;
    });
  });
});
