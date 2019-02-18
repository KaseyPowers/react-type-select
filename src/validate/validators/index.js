import minLength from "./minLength";

const allValidators = {
  minLength
};

const validators = [];
// go through validators, sure if they have showKey true, convert it to a string
Object.keys(allValidators).forEach(key => {
  const validator = allValidators[key];
  validators.push(validator);

  const useKey = validator.key || key;
  if (!validator.key) {
    validator.key = useKey;
  }
  if (validator.showKey && typeof validator.showKey !== "string") {
    const capitalized = useKey.charAt(0).toUpperCase() + useKey.slice(1);
    validator.showKey = `show${capitalized}`;
  }
});

export default allValidators;

export const validators;
export const validatorKeys = validators
  .reduce((output, { key, showKey, otherKeys }) => {
    return output.concat(key, showKey, otherKeys);
  })
  .filter(val => !!val);

