import { standardizeValidationInOption } from "./validation";

export default function standardizeOption(option) {
  if (!option) {
    return option;
  }
  if (typeof option === "string") {
    return { value: option }; // can skip the validation here, just the one value
  }
  return standardizeValidationInOption(option);
}
