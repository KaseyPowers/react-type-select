import { mergeValidations } from "./validate";

export default function mergeOptions(a, b) {
  const { validate: validateA, ...restA } = a;
  const { validate: validateB, ...restB } = b;

  return {
    ...restA,
    ...restB,
    validate: mergeValidations(validateA, validateB)
  };
}
