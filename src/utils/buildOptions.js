import { standardizeOption } from "./standardize";
import { mergeOptions } from "./merge";

// build out this option, assume it is standardized
function buildOption(option) {
  let output = [];
  // if option has no children, return as is
  if (!option.options) {
    return [option];
  }
  const { options, ...baseOption } = option;
  const children = Array.isArray(options) ? options : [options];
  return children
    .map(opt => {
      const childOption = standardizeOption(opt);
      return childOption && mergeOptions(baseOption, childOption);
    })
    .filter(val => !!val);
}

function optionValid(option) {
  return option && typeof option.type === "string";
}

// wrap buildOption to save the validation for final merged values
function buildOptions(rawOption) {
  const option = standardizeOption(rawOption); // make sure initial input is standardized
  return buildOption(option).filter(val => optionValid(val));
}

export default buildOption;
