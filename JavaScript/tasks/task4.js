'use strict';

const fs = require('fs');

/**
 * Task 4:
 *
 * implement universal memoize compatible
 * with both sync and async function
 */

// Weak memoization
const generateKey = args => (
  args.map(x => (
    (typeof(x) !== 'function' ? x.toString() : 'callback') +
    ':' + typeof(x)
  )).join('|')
);

const memoize = fn => {
  const cache = new Map();
  return (...args) => {
    const key = generateKey(args);
    const val = cache.get(key);
    const last = args.pop();
    if (val) {
      console.log('taken from cache:');
      if (typeof(last) !== 'function')
        return val.data;
      last(val.err, val.data);
    } else {
      if (typeof(last) !== 'function') {
        const data = fn(...args, last);
        cache.set(key, { data });
        return data;
      }
      fn(...args, (err, data) => {
        cache.set(key, { err, data });
        last(err, data);
      });
    }
  };
};

// Usage

const memoizedAsync = memoize(fs.readFile);
const memoizedSync = memoize(str => str);

memoizedAsync('task4.js', (err, data) => {
  if (!err) console.log('async: ', data.length);
});
setTimeout(() => (
  memoizedAsync('task4.js', (err, data) => {
    if (!err) console.log('async: ', data.length);
  })
), 1000);
console.log(memoizedSync('abcd'));
console.log(memoizedSync('abcd'));
