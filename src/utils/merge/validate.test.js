import mergeValidate from "./validate";

describe("mergeValidations", () => {
  test("should accept empty options", () => {
    expect(mergeValidate()).toEqual({});
  });

  test("should combine objects without overlapping keys", () => {
    const a = { a: 1, c: 3 };
    const b = { b: 2, d: 4 };
    const expected = { a: 1, b: 2, c: 3, d: 4 };
    expect(mergeValidate(a, b)).toEqual(expected);
  });

  test("should shallow merge child objects", () => {
    const test1 = {
      a: 1,
      b: 2,
      c: 3
    };
    const test2 = {
      b: 4,
      d: 5
    };
    const expectedTest = { a: 1, b: 4, c: 3, d: 5 };
    const a = { test: test1, hello: "world" };
    const b = { test: test2, world: "hello" };
    const expected = { test: expectedTest, hello: "world", world: "hello" };
    expect(mergeValidate(a, b)).toEqual(expected);
  });

  test("should not try to merge functions", () => {
    const testFn = () => {};
    const testOther = "hello";

    expect(mergeValidate({ test: testFn }, { test: testOther })).toEqual({
      test: testOther
    });
    expect(mergeValidate({ test: testOther }, { test: testFn })).toEqual({
      test: testFn
    });
  });
});
