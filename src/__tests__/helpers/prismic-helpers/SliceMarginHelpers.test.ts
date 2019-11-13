import {
  marginTopHelper,
  marginBottomHelper
} from "../../../helpers/slice-helpers/SliceMarginHelpers";

describe("marginTopHelper", () => {
  test("should be a function", () => {
    expect(marginTopHelper).toBeDefined();
    expect(typeof marginTopHelper === "function").toBeTruthy();
  });

  test("should return mt-0 when no arg provided", () => {
    expect(marginTopHelper("")).toBe("mt-0");
  });

  test("should return mt-0 when arg is proivided but wrong one", () => {
    expect(marginTopHelper(123123123)).toBe("mt-0");
    expect(marginTopHelper("abc-dummy")).toBe("mt-0");
  });

  test("should return mt-1/mt-2 etc when correct number or string is provided", () => {
    expect(marginTopHelper(0)).toBe("mt-0");
    expect(marginTopHelper("0")).toBe("mt-0");
    expect(marginTopHelper(1)).toBe("mt-1");
    expect(marginTopHelper("1")).toBe("mt-1");
    expect(marginTopHelper(2)).toBe("mt-2");
    expect(marginTopHelper("2")).toBe("mt-2");
    expect(marginTopHelper(3)).toBe("mt-3");
    expect(marginTopHelper("3")).toBe("mt-3");
    expect(marginTopHelper(4)).toBe("mt-4");
    expect(marginTopHelper("4")).toBe("mt-4");
    expect(marginTopHelper(5)).toBe("mt-5");
    expect(marginTopHelper("5")).toBe("mt-5");
  });
});

describe("marginBottomHelper", () => {
  test("should be a function", () => {
    expect(marginBottomHelper).toBeDefined();
    expect(typeof marginBottomHelper === "function").toBeTruthy();
  });

  test("should return mb-0 when no arg provided", () => {
    expect(marginBottomHelper("")).toBe("mb-0");
  });

  test("should return mb-0 when arg is proivided but wrong one", () => {
    expect(marginBottomHelper(123123123)).toBe("mb-0");
    expect(marginBottomHelper("abc-dummy")).toBe("mb-0");
  });

  test("should return mb-1/mb-2 etc when correct number or string is provided", () => {
    expect(marginBottomHelper(0)).toBe("mb-0");
    expect(marginBottomHelper("0")).toBe("mb-0");
    expect(marginBottomHelper(1)).toBe("mb-1");
    expect(marginBottomHelper("1")).toBe("mb-1");
    expect(marginBottomHelper(2)).toBe("mb-2");
    expect(marginBottomHelper("2")).toBe("mb-2");
    expect(marginBottomHelper(3)).toBe("mb-3");
    expect(marginBottomHelper("3")).toBe("mb-3");
    expect(marginBottomHelper(4)).toBe("mb-4");
    expect(marginBottomHelper("4")).toBe("mb-4");
    expect(marginBottomHelper(5)).toBe("mb-5");
    expect(marginBottomHelper("5")).toBe("mb-5");
  });
});
