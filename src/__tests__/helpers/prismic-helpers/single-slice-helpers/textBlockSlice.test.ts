import { textBlockSlice } from "../../../../helpers/slice-helpers/single-slice-helpers/textBlockSlice";

describe("textBlockSlice", () => {
  test("textBlockSlice - should be defined and function", () => {
    expect(textBlockSlice).toBeDefined();
    expect(textBlockSlice).toBeInstanceOf(Object);
    expect(typeof textBlockSlice === "function").toBeTruthy();
  });

  test("textBlockSlice - should return null when wrong type of data provided", () => {
    expect(textBlockSlice("string")).toBeNull();
    expect(textBlockSlice(1234)).toBeNull();
    expect(textBlockSlice([])).toBeNull();
    expect(textBlockSlice({})).toBeNull();
  });

  test("textBlockSlice - should return object when correct data provided", () => {
    const data = {
      slice_type: "text_block",
      primary: {
        title: [{ text: "title" }]
      }
    };
    const textBlockData = textBlockSlice(data);
    expect(textBlockData).toBeInstanceOf(Object);
    expect(textBlockData).toHaveProperty("type");
    expect(textBlockData).toHaveProperty("title");
    expect(textBlockData).toHaveProperty("text_align");
    expect(textBlockData).toHaveProperty("description");
    expect(textBlockData).toHaveProperty("button_title");
    expect(textBlockData).toHaveProperty("button_url");
    expect(textBlockData).toHaveProperty("margin_top");
    expect(textBlockData).toHaveProperty("margin_bottom");
  });
});
