import mergeValidations from "./validate";

function mergeOptions(a = {}, b = {}) {
  const { validate: validateA, ...restA } = a;
  const { validate: validateB, ...restB } = b;

  return {
    ...restA,
    ...restB,
    validate: mergeValidations(validateA, validateB)
  };
}

export default mergeOptions;
