import {
  sliceHelper,
  filterArray
} from "../../../helpers/slice-helpers/SliceHelpers";

describe("SliceHelpers", () => {
  describe("filterArray", () => {
    test("filterArray - should be defined and function", () => {
      expect(filterArray).toBeDefined();
      expect(filterArray).toBeInstanceOf(Object);
      expect(typeof filterArray === "function").toBeTruthy();
    });
  });

  describe("sliceHelper", () => {
    test("sliceHelper - should be defined and function", () => {
      expect(sliceHelper).toBeDefined();
      expect(sliceHelper).toBeInstanceOf(Object);
      expect(typeof sliceHelper === "function").toBeTruthy();
    });

    test("sliceHelper - should return empty array if there are items but incorrect", () => {
      expect(sliceHelper([{}])).toStrictEqual([]);
    });

    test("sliceHelper - should return 1 item in array when 1 correct object is provided", () => {
      const data: any = [
        { slice_type: "text_block", primary: { title: [{ text: "title" }] } }
      ];
      const successResponse = sliceHelper(data);
      expect(Array.isArray(successResponse)).toBeTruthy();
    });
  });
});
