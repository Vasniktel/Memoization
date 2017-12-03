'use strict';

/**
 * Task 5:
 * implement functional object
 * with following properties methods and events:
 *
 *  memoized.clear() - clear cache
 *  memoized.add(key, value) - add value to cache
 *  memoized.del(key) - remove value from cache
 *  memoized.get(key) - returns saved value
 *  !memoized.timeout: Number - cache timout
 *  !memoized.maxSize: Number - maximum cache size in bytes
 *  !memoized.maxCount: Number - maximum cache size in item count
 *  memoized.on('add', Function)
 *  memoized.on('del', Function)
 *  memoized.on('clear', Function)
 */

const generateKey = args => (
  args.map(x => x.toString() + ':' + typeof(x)).join('|')
);

const memoize = fn => {
  const cache = new Map();
  const memoized = (...args) => {
    const key = generateKey(args);
    const val = cache.get(key);
    if (val) {
      console.log('returned from cache:');
      return val;
    }
    const res = fn(...args);
    cache.set(key, res);
    return res;
  };

  const mixin = {
    events: {},
    clear() {
      cache.clear();
      this.emit('clear');
    },
    add(key, value) {
      cache.set(key, value);
      this.emit('add', { key, value });
    },
    del(key) {
      cache.delete(key);
      this.emit('del', key);
    },
    get(key) {
      return cache.get(key);
    },
    on(event, fn) {
      this.events[event] ?
        this.events[event].push(fn) :
        this.events[event] = [fn];
    },
    emit(event, ...args) {
      if (this.events[event])
        this.events[event].forEach(fn => fn(...args));
    }
  };

  mixin.on('add', (...args) => console.log('added', ...args));
  mixin.on('clear', () => console.log('cleared'));
  mixin.on('del', (arg) => console.log('deleted', arg));
  return Object.assign(memoized, mixin);
};

// Usage

const memoized = memoize(str => str);

console.log(memoized('abcd'));
console.log(memoized('abcd'));
memoized.add('qwe:string', 'qwe');
memoized.del('qwe:string');
memoized.clear();
