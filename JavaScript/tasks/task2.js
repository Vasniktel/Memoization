'use strict';

/**
 * Task 2:
 * implement memoize with max records count and removing least used
 */

const generateKey = args => (
  args.map(x => x.toString() + ':' + typeof(x)).join('|')
);

const memoize = (fn, limit) => {
  const cache = []; // array of objects { data, used, key }
  const keys = new Map(); // key: ref to { data, used, key }
  return (...args) => {
    const key = generateKey(args);
    const val = keys.get(key);
    console.dir({ key, val });
    if (val) {
      val.used++;
      cache.sort((a, b) => b.used - a.used);
      console.dir({ cache });
      return val.data;
    }
    if (cache.length === limit) keys.delete(cache.pop().key);
    const res = { data: fn(...args), used: 0, key };
    cache.push(res);
    keys.set(key, res);
    console.dir({ cache, keys });
    return res.data;
  };
};

/*
// Unkonwn behaviour
const memoize = (fn, limit) => {
  const cache = []; // array of arrays [val, used]
  //const keys = []; // key: ref to [val, used, key] UNKNOWN BEHAVIOUR
  return (...args) => {
    const key = generateKey(args);
    const val = cache[key];
    console.dir({ key, val });
    if (val) {
      val[1]++;
      cache.sort((a, b) => b[1] - a[1]);
      console.dir({ cache });
      return val[0];
    }
    if (cache.length === limit) cache.pop();
    const res = [fn(...args), 0];
    //cache.push(res);
    cache[key] = res;
    console.dir({ cache, keys });
    return res[0];
  };
};
*/

// Usage

const square = a => a * a;
const memoized = memoize(square, 3);

console.log(memoized(3));
console.log(memoized(3));
console.log(memoized(4));
console.log(memoized(4));
console.log(memoized(4));
console.log(memoized(5));
console.log(memoized(5));
console.log(memoized(6));
console.log(memoized(5));
