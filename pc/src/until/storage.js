const PREFIX = 'cache_';

class Store {
    constructor(device) {
        this.store = device;
    }

    get(key) {
        return this.store.get(`${PREFIX}${key}`);
    }

    set(key, value) {
        return this.store.set(`${PREFIX}${key}`, value);
    }

    remove(key) {
        return this.store.remove(`${PREFIX}${key}`);
    }

    clear() {
        return this.store.clear();
    }
}

class localStorage {
    constructor() {
        this.store = window.localStorage;
    }

    get(key) {
        return this.store.getItem(key);
    }

    set(key, value) {
        return this.store.setItem(key, value);
    }

    remove(key) {
        return this.store.removeItem(key);
    }

    clear() {
        return this.store.clear();
    }
}

export const storage = new Store(new localStorage());

