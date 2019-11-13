//@ts-ignore
import { codeSlice } from "../../../../helpers/slice-helpers/single-slice-helpers/codeSlice";

describe("codeSlice", () => {
  test("codeSlice - should be defined and function", () => {
    expect(codeSlice).toBeDefined();
    expect(codeSlice).toBeInstanceOf(Object);
    expect(typeof codeSlice === "function").toBeTruthy();
  });

  test("codeSlice - should return null when wrong type of data provided", () => {
    expect(codeSlice("string")).toBeNull();
    expect(codeSlice(1234)).toBeNull();
    expect(codeSlice([])).toBeNull();
    expect(codeSlice({})).toBeNull();
  });

  test("codeSlice - should return object when correct data provided", () => {
    const data = {
      slice_type: "code_component",
      primary: {
        code: [{ text: "code" }]
      }
    };
    const codeSliceData = codeSlice(data);
    expect(codeSliceData).toBeInstanceOf(Object);
    expect(codeSliceData).toHaveProperty("type");
    expect(codeSliceData).toHaveProperty("title");
    expect(codeSliceData).toHaveProperty("language");
    expect(codeSliceData).toHaveProperty("code");
    expect(codeSliceData).toHaveProperty("margin_top");
    expect(codeSliceData).toHaveProperty("margin_bottom");
  });
});
