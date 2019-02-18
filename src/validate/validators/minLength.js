// assume value is always a string or falsy
function validate(value, context, { valid, show, message } = {}) {
  const output = {
    valid: false,
    message
  };
  const length = value && value.length;

  // type check valid so that 0 is compared while other falsy values are treated as always valid
  if (valid || typeof valid === "number") {
    const min = valid ? parseInt(valid, 10) : 0;
    output.valid = length >= min;
  } else {
    output.valid = true;
  }

  // only add show to validation if its defined, otherwise leave default behavior to the ui
  if (show || typeof show === "number") {
    const min = show ? parseInt(show, 10) : 0;
    output.show = length >= min;
  }
  return output;
}

export default {
  validate,
  showKeys: true
};
