import minLength from "./minLength";

const validators = {
  minLength
};

const validatorsArray = [];
// go through validators, sure if they have showKey true, convert it to a string
Object.keys(validators).forEach(key => {
  const validator = validators[key];
  validatorsArray.push(validator);

  const useKey = validator.key || key;
  if (!validator.key) {
    validator.key = useKey;
  }
  if (validator.showKey && typeof validator.showKey !== "string") {
    const capitalized = useKey.charAt(0).toUpperCase() + useKey.slice(1);
    validator.showKey = `show${capitalized}`;
  }
});

const validatorKeys = validatorsArray
  .reduce((output, { key, showKey, otherKeys }) => {
    return output.concat(key, showKey, otherKeys);
  }, [])
  .filter(val => !!val);

export { validators, validatorsArray, validatorKeys };
