import mergeOptions from "./option";
import mergeValidate from "./validate";

jest.mock("./validate");

const mockValidate = "validate";

const baseExpected = {
  validate: mockValidate
};

describe("mergeOptions", () => {
  beforeEach(() => {
    mergeValidate.mockReturnValue(mockValidate);
  });

  test("should accept empty options", () => {
    expect(mergeOptions()).toEqual(baseExpected);
  });

  test("should shallow merge all keys except validate", () => {
    const a = { test: "hello", other: { a: "a", b: "b" } };
    const b = { other: "world" };
    const expected = {
      ...baseExpected,
      test: "hello",
      other: "world"
    };
    expect(mergeOptions(a, b)).toEqual(expected);

    const expectedReverse = {
      ...baseExpected,
      ...a
    };
    expect(mergeOptions(b, a)).toEqual(expectedReverse);
  });
});
