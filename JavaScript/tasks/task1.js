'use strict';

/**
 * Task 1:
 *
 * implement time expiration cash
 */

const generateKey = args => (
  args.map(x => x.toString() + ':' + typeof(x)).join('|')
);

const memoize = fn => {
  const cache = new Map();
  return (exp, ...args) => {
    const key = generateKey(args);
    const val = cache.get(key);
    if (val) {
      console.log('returned from cache:');
      return val;
    }
    const res = fn(...args);
    cache.set(key, res);
    setTimeout(() => cache.delete(key), exp);
    return res;
  };
};


const square = a => a * a;
const memoized = memoize(square);
console.log(memoized(2000, 5));
console.log(memoized(2000, 5));
setTimeout(() => console.log(memoized(2000, 5)), 3000);
