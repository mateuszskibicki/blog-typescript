import { singleArticleHelper } from "../../../helpers/article/ArticleHelpers";

describe("ArticleHelpers (single article)", () => {
  describe("singleArticleHelper", () => {
    test("singleArticleHelper - should be a function and defined", () => {
      expect(singleArticleHelper).toBeDefined();
      expect(singleArticleHelper).toBeInstanceOf(Object);
    });

    test("singleArticleHelper - should return null when provided data is incorrect", () => {
      expect(singleArticleHelper("string")).toBeNull();
      expect(singleArticleHelper({})).toBeNull();
      expect(singleArticleHelper([])).toBeNull();
      expect(singleArticleHelper(12345)).toBeNull();
      expect(singleArticleHelper({ dummy: 123 })).toBeNull();
    });

    test("singleArticleHelper - should return data with author when correct data is provided", () => {
      const successResponse = {
        uid: "some-uid",
        data: {
          author: { data: { uid: "some author" } }
        }
      };
      expect(singleArticleHelper(successResponse)).toHaveProperty("author");
      expect(singleArticleHelper(successResponse)).toHaveProperty("SEO");
      expect(singleArticleHelper(successResponse)).toHaveProperty("uid");
    });
  });
});
