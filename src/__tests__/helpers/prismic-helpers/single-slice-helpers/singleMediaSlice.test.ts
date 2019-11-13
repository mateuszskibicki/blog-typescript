import { singleMediaSlice } from "../../../../helpers/slice-helpers/single-slice-helpers/singleMediaSlice";

describe("singleMediaSlice", () => {
  test("singleMediaSlice - should be defined and function", () => {
    expect(singleMediaSlice).toBeDefined();
    expect(singleMediaSlice).toBeInstanceOf(Object);
    expect(typeof singleMediaSlice === "function").toBeTruthy();
  });

  test("singleMediaSlice - should return null when wrong type of data provided", () => {
    expect(singleMediaSlice("string")).toBeNull();
    expect(singleMediaSlice(1234)).toBeNull();
    expect(singleMediaSlice([])).toBeNull();
    expect(singleMediaSlice({})).toBeNull();
  });

  test("singleMediaSlice - should return object when correct data provided", () => {
    const data = {
      slice_type: "single_media_block",
      primary: {
        title: [{ text: "title" }]
      }
    };
    const singleMediaSliceData = singleMediaSlice(data);
    expect(singleMediaSliceData).toBeInstanceOf(Object);
    expect(singleMediaSliceData).toHaveProperty("type");
    expect(singleMediaSliceData).toHaveProperty("title");
    expect(singleMediaSliceData).toHaveProperty("description");
    expect(singleMediaSliceData).toHaveProperty("button_title");
    expect(singleMediaSliceData).toHaveProperty("button_url");
    expect(singleMediaSliceData).toHaveProperty("image");
    expect(singleMediaSliceData).toHaveProperty("media_position");
    expect(singleMediaSliceData).toHaveProperty("text_align");
    expect(singleMediaSliceData).toHaveProperty("media_type");
    expect(singleMediaSliceData).toHaveProperty("youtube");
    expect(singleMediaSliceData).toHaveProperty("margin_top");
    expect(singleMediaSliceData).toHaveProperty("margin_bottom");
  });
});
