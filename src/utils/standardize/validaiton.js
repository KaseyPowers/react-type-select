import { validatorsArray, validatorKeys } from "../../validate";
import { mergeValidations } from "../utils";

function isConfigObj(value, otherKeys = []) {
  return (
    value instanceof Function ||
    otherKeys
      .concat(["valid", "show", "message"])
      .some(configKey => configKey && typeof value[configKey] !== "undefined")
  );
}

// take a validation config and put it into standardized format for clean merging
export function standardizeValidationObj(validation = {}) {
  const output = {};
  const customKeys = Object.keys(validation).filter(
    key => validatorKeys.indexOf(key) < 0
  );
  customKeys.forEach(key => {
    output[key] = validation[key];
  });

  validatorsArray.forEach(validator => {
    const { key, showKey, otherKeys, buildConfig, configKeys = [] } = validator;
    let outputValue = {};
    const currentValue = validation[key];
    // if current value is a function, assume custom implementation and skip buildConfig
    if (currentValue instanceof Function) {
      output[key] = currentValue;
      return;
    }
    // or has keys associated with a config object, use this
    if (isConfigObj(value, configKeys)) {
      outputValue = currentValue;
    } else {
      outputValue.valid = currentValue;
    }

    if (showKey && typeof validation[showKey] !== "undefined") {
      const showValue = validation[showKey];
      if (isValidationObj(showValue)) {
        output[showKey] = showValue;
      } else {
        outputValue.show = validation[showKey];
      }
    }
    if (otherKeys) {
      (Array.isArray(otherKeys) ? otherKeys : [otherKeys]).forEach(otherKey => {
        if (otherKey && typeof validation[otherKey] !== "undefined") {
          const otherValue = validation[otherKey];
          (isValidationObj(otherValue) ? output : outputValue)[
            otherKey
          ] = otherValue;
        }
      });
    }
    output[key] = buildConfig ? buildConfig(outputValue) : outputValue;
  });

  return output;
}

export function standardizeValidationInOption(option) {
  const output = {};
  const { validate: rawCurrentValidate, ...rest } = option;
  const currentValidate = standardizeValidationObj(rawCurrentValidate);
  const rawNewValidate = {};

  Object.keys(rest).forEach(key => {
    const value = rest[key];
    if (validatorKeys.indexOf(key) >= 0) {
      rawNewValidate[key] = value;
    } else {
      output[key] = value;
    }
  });

  const newValidate = standardizeValidationObj(rawNewValidate);

  output.validate = mergeValidations(currentValidate, newValidate);

  return output;
}
