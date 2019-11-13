import { imageSlice } from "../../../../helpers/slice-helpers/single-slice-helpers/imageSlice";

describe("imageSlice", () => {
  test("should be a function", () => {
    expect(imageSlice).toBeDefined();
    expect(typeof imageSlice === "function").toBeTruthy();
  });

  test("should return null when wrong content is provided", () => {
    expect(imageSlice([])).toBeNull();
    expect(imageSlice("string")).toBeNull();
    expect(imageSlice(12345)).toBeNull();
  });

  test("should return correct object when required data is provided", () => {
    const dummyResponse = {
      slice_type: "image",
      primary: {
        image: {
          url: "someurl",
          alt: "alternative text"
        }
      }
    };
    const correctObject = imageSlice(dummyResponse);
    expect(correctObject).toHaveProperty("type");
    expect(correctObject).toHaveProperty("width");
    expect(correctObject).toHaveProperty("margin_top");
    expect(correctObject).toHaveProperty("margin_bottom");
    expect(correctObject).toHaveProperty("image");
  });
});
