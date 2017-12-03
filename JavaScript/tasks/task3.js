'use strict';

/**
 * Task 3:
 * implement memoize with max total stored data size
 */

const generateKey = args => (
  args.map(x => x.toString() + ':' + typeof(x)).join('|')
);

const memoize = (fn, maxSize) => {
  const cache = new Map(); // key: { data, size }
  let totalSize = 0;
  return (...args) => {
    const key = generateKey(args);
    const val = cache.get(key);
    console.dir({ key, val });
    if (val) return val.data;
    const data = fn(...args);
    const size = ('' + data).length;
    if (size + totalSize > maxSize)
      throw new Error('Cache has reached the memory limit');
    const entry = { data, size };
    cache.set(key, entry);
    totalSize += size;
    console.dir({ cache, totalSize });
    return data;
  };
};

// Usage

const fn = str => str;
const memoized = memoize(fn, 10);

console.log(memoized('a'));
console.log(memoized('a'));
console.log(memoized('ab'));
console.log(memoized('ab'));
console.log(memoized('abcd'));
console.log(memoized('abcd'));
console.log(memoized('ef'));
//console.log(memoized('efg')); // exception will be thrown
console.log(memoized('g'));

