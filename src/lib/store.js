import EventEmitter from 'eventemitter3';

const defaultStore = 'defaultStore';

export default class Store extends EventEmitter {
  get(key, { nameSpace = defaultStore } = {}) {
    if (!this[nameSpace]) return undefined;
    return this[nameSpace][key];
  }

  set(key, value, { nameSpace = defaultStore } = {}) {
    if (!this[nameSpace]) this[nameSpace] = {};
    if (this[nameSpace][key] !== value) {
      this[nameSpace][key] = value;
      this.emit(`${nameSpace}:${key}`, value);
    }
  }
}

export { Store };
