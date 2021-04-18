/* eslint-disable import/prefer-default-export */
interface Question {
  code: string,
}

export const questions: Question[] = [
  {
    code: '{} == 0', // error
  },
  {
    code: '{} - 1 == -1', // true
  },
  {
    code: '(1 / 0) == (1 / 0)', // true
  },
  {
    code: '{} + [] == 0', // true
  },
  {
    code: 'Math.PI * ({} + []) / -1 == -Infinity / Infinity', // false
  },
  {
    code: 'true + false == true', // true
  },
  {
    code: 'false / false == false / false', // false
  },
  {
    code: 'typeof void typeof void typeof undefined === "undefined"', // true
  },
  {
    code: 'null >= 0 || null <= 0', // true
  },
  {
    code: 'null > 0 || null < 0 || null === 0', // false
  },
  {
    code: 'new Date(-1) > new Date(-2)', // true
  },
  {
    code: 'new Date(0) > new Date(-1)', // true
  },
  {
    code: 'new Date(0) > new Date(Number.MIN_SAFE_INTEGER)', // false
  },
  {
    code: 'Date() instanceof Date', // false
  },
  {
    code: 'String() instanceof String', // false
  },
  {
    code: 'Error() instanceof Error', // true
  },
  {
    code: `(() => {
  var b = false;
  let b = true;
  return b;
})()`, // false
  },
  {
    code: `(() => {
  let count = 0;
  for (var i = 0; i < 10; i += 1) {
    count += 1;
  }
  for (var i = 0; i < 10; i += 1) {
    count += 1;
  }
  return count === 20;
})()`,
  }, // true
  {
    code: `(() => {
  const funcs = []
  for (var i = 0; i < 5; i += 1) {
    funcs.push(() => i);
  }
  return funcs[0] + funcs[1] + funcs[3] === 4;
})()`,
  }, // false
  {
    code: `(() => {
  Infinity = NaN;
  return Infinity != Infinity;
})()`
  }, // true
  {
    code: `(() => {
  return {} == {};
})()`
  }, // false
  {
    code: `(() => {
  const m = [].map;
  return 'length' in m;
})()`
  }, // true
  {
    code: `(() => {
  const m = [].map;
  const a = m(x => x);
  return 'length' in a;
})()`
  }, // false
  {
    code: `(() => {
  const keys = [];
  for (const key in [].__proto__) {
    keys.push(key);
  }
  return keys.length > 0;
})()`
  }, // false
  {
    code: `(() => {
  return Function(() => true)();
})()`
  }, // false
];
