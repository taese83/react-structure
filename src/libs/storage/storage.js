export class Storage {
  constructor(type) {
    this.storage = window[type];
  }

  get(key) {
    try {
      const storedData = JSON.parse(this.storage.getItem(key));
      return storedData;
    } catch (e) {
      this.storage.removeItem(key);
      return null;
    }
  }

  set(key, value) {
    try {
      return this.storage.setItem(key, JSON.stringify(value));
    } catch (e) {
      return null;
    }
  }

  remove(key) {
    try {
      return this.storage.removeItem(key);
    } catch (e) {
      return null;
    }
  }

  clear() {
    try {
      return this.storage.clear();
    } catch (e) {
      return null;
    }
  }
}
