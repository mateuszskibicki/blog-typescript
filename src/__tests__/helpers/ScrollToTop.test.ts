import { ScrollToTop } from "../../helpers/ScrollToTop";

describe("ScrollToTop", () => {
  test("ScrollToTop - should be a function and defined", () => {
    expect(ScrollToTop).toBeDefined();
    expect(ScrollToTop).toBeInstanceOf(Object);
  });

  test("ScrollToTop - should return nothing", () => {
    expect(ScrollToTop()).toBe(undefined);
    expect(ScrollToTop(123)).toBe(undefined);
  });
});
