import EventEmitter from 'events';

export default class Store extends EventEmitter {
  register(id) {
    this.id = id;
    if (!this[id]) this[id] = {};
    return this;
  }

  get(location) {
    return this[this.id][location];
  }

  set(location, value) {
    if (this[this.id][location] !== value) {
      this[this.id][location] = value;
      this.emit(location, value);
    }
    return this;
  }
}

export { Store };
