// assume validations are standardized structure
export function mergeValidations(a = {}, b = {}) {
  const output = {};
  const sharedKeys = [];

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  // go through keys, if they are unique to a or b, add to output now
  aKeys.forEach(key => {
    if (bKeys.indexOf(key) < 0) {
      output[key] = a[key];
    } else if (sharedKeys.indexOf(key) < 0) {
      sharedKeys.push(key);
    }
  });
  bKeys.forEach(key => {
    if (aKeys.indexOf(key) < 0) {
      output[key] = b[key];
    } else if (sharedKeys.indexOf(key) < 0) {
      sharedKeys.push(key);
    }
  });

  // mege shared values
  sharedKeys.forEach(key => {
    const aVal = a[key];
    const bVal = b[key];
    let finalVal = {};
    // if merging in function, use it, if old value is function, throw it away
    if (bVal instanceof Function || aVal instanceof Function) {
      finalVal = bVal;
    } else {
      // do a shallow merge of a and b
      Object.assign(finalVal, aVal, bVal);
    }

    output[key] = finalVal;
  });

  return output;
}
