// jest.mock("./validation");
// import {isConfigObj, standardizeValidationObj, standardizeValidationInOption} from './validaiton';
// import { validatorsArray, validatorKeys } from "../../validate";

const mockValidatorsArray = [
  {
    key: "testKey1"
  },
  {
    key: "testKey2",
    showKey: "showKey2"
  },
  {
    key: "testKey3",
    showKey: "showKey3",
    otherKeys: ["otherKey3"]
  },
  {
    key: "testKey4",
    otherKeys: ["otherKey4.1", "otherKey4.2"]
  }
];
const mockValidatorKeys = mockValidatorsArray
  .reduce((output, { key, showKey, otherKeys }) => {
    return output.concat(key, showKey, otherKeys);
  }, [])
  .filter(val => !!val);

jest.mock("../../validate", () => {
  return {
    validatorsArray: mockValidatorsArray,
    validatorKeys: mockValidatorKeys
  };
});

describe("standardize validation", () => {
  describe("isConfigObj", () => {
    const { isConfigObj } = jest.requireActual("./validaiton");

    test("should return true for function", () => {
      expect(isConfigObj(() => {})).toBeTruthy();
    });

    test('should return true if object with "valid", "show", or "message', () => {
      expect(isConfigObj({ valid: true })).toBeTruthy();
      expect(isConfigObj({ show: true })).toBeTruthy();
      expect(isConfigObj({ message: true })).toBeTruthy();
      expect(isConfigObj({ other: true })).toBeFalsy();
    });

    test("should accept more keys to compare against", () => {
      const testOtherKeys = ["hello", "world"];
      const testObj1 = { hello: true };
      const testObj2 = { world: true };
      const alwaysTrue = { valid: true };
      expect(isConfigObj(alwaysTrue)).toBeTruthy();
      expect(isConfigObj(testObj1)).toBeFalsy();
      expect(isConfigObj(testObj2)).toBeFalsy();

      expect(isConfigObj(alwaysTrue, testOtherKeys)).toBeTruthy();
      expect(isConfigObj(testObj1, testOtherKeys)).toBeTruthy();
      expect(isConfigObj(testObj2, testOtherKeys)).toBeTruthy();
    });
  });

  describe("standardizeValidationObj", () => {
    const { standardizeValidationObj } = jest.requireActual("./validaiton");

    test("should return custom keys (keys not in validators) as is", () => {
      const testObj = {
        newTestKey: {
          hello: "world"
        },
        newTestKey2: "test string"
      };
      expect(
        Object.keys(testObj).filter(key => mockValidatorKeys.indexOf(key) >= 0)
      ).toHaveLength(0);

      expect(standardizeValidationObj(testObj)).toEqual(testObj);
    });

    test("should return pre-difined keys as is if a function is passed in", () => {
      const testObj = {
        [mockValidatorKeys[0]]: () => {}
      };
      expect(
        Object.keys(testObj).filter(key => mockValidatorKeys.indexOf(key) >= 0)
      ).toHaveLength(1);

      expect(standardizeValidationObj(testObj)).toEqual(testObj);
    });
  });
});
