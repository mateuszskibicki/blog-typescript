import { multipleMediaSlice } from "../../../../helpers/slice-helpers/single-slice-helpers/multipleMediaSlice";

describe("multipleMediaSlice", () => {
  test("multipleMediaSlice - should be defined and function", () => {
    expect(multipleMediaSlice).toBeDefined();
    expect(multipleMediaSlice).toBeInstanceOf(Object);
    expect(typeof multipleMediaSlice === "function").toBeTruthy();
  });

  test("multipleMediaSlice - should return null when wrong type of data provided", () => {
    expect(multipleMediaSlice("string")).toBeNull();
    expect(multipleMediaSlice(1234)).toBeNull();
    expect(multipleMediaSlice([])).toBeNull();
    expect(multipleMediaSlice({})).toBeNull();
  });

  test("multipleMediaSlice - should return object when correct data provided", () => {
    const data = {
      slice_type: "multiple_media_blocks",
      primary: {
        title: [{ text: "title" }]
      }
    };
    const multipleMediaSliceData = multipleMediaSlice(data);
    expect(multipleMediaSliceData).toBeInstanceOf(Object);
    expect(multipleMediaSliceData).toHaveProperty("type");
    expect(multipleMediaSliceData).toHaveProperty("title");
    expect(multipleMediaSliceData).toHaveProperty("button_title");
    expect(multipleMediaSliceData).toHaveProperty("button_url");
    expect(multipleMediaSliceData).toHaveProperty("media");
    expect(multipleMediaSliceData).toHaveProperty("margin_top");
    expect(multipleMediaSliceData).toHaveProperty("margin_bottom");
  });
});
