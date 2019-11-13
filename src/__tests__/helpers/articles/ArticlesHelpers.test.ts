import {
  articlesListHelper,
  allArticlesPageSEOHelper
} from "../../../helpers/articles/ArticlesHelpers";

describe("ArticlesHelpers", () => {
  describe("articlesListHelper", () => {
    test("articlesListHelper - should be a function and defined", () => {
      expect(articlesListHelper).toBeDefined();
      expect(articlesListHelper).toBeInstanceOf(Object);
    });

    test("articlesListHelper - should return null when provided data is incorrect", () => {
      expect(articlesListHelper("string")).toBeNull();
      expect(articlesListHelper({})).toBeNull();
      expect(articlesListHelper([])).toBeNull();
      expect(articlesListHelper(12345)).toBeNull();
      expect(articlesListHelper({ dummy: 123 })).toBeNull();
    });

    test("articlesListHelper - should return empty array when there are empty results", () => {
      expect(articlesListHelper({ results: [] })).toStrictEqual([]);
      expect(Array.isArray(articlesListHelper({ results: [] }))).toBeTruthy();
    });

    test("articlesListHelper - should return array with objects without author when author is  not provided in query response", () => {
      const successResponse = {
        results: [{ uid: "dummy", data: { title: [{ text: "dummy-title" }] } }]
      };
      expect(articlesListHelper(successResponse)).toBeDefined();
    });

    test("articlesListHelper - should return array with objects with author when is provided", () => {
      const successResponse = {
        results: [
          {
            uid: "dummy",
            data: {
              title: [{ text: "dummy-title" }],
              author: { data: { uid: "author-uid" } }
            }
          }
        ]
      };
      expect(articlesListHelper(successResponse)).toBeDefined();
      //@ts-ignore
      expect(articlesListHelper(successResponse)[0].title).toBe(
        successResponse.results[0].data.title[0].text
      );
      //@ts-ignore
      expect(articlesListHelper(successResponse)[0].author).toBeDefined();
      //@ts-ignore
      expect(articlesListHelper(successResponse)[0].author).not.toBeNull();
      //@ts-ignore
      expect(articlesListHelper(successResponse)[0].author.uid).toBe(
        "author-uid"
      );
    });
  });

  describe("allArticlesPageSEOHelper", () => {
    test("allArticlesPageSEOHelper - should be a function and defined", () => {
      expect(allArticlesPageSEOHelper).toBeDefined();
      expect(allArticlesPageSEOHelper).toBeInstanceOf(Object);
    });

    test("allArticlesPageSEOHelper - should return null when wrong type of data is provided", () => {
      expect(allArticlesPageSEOHelper("string")).toBeNull();
      expect(allArticlesPageSEOHelper(123)).toBeNull();
      expect(allArticlesPageSEOHelper([])).toBeNull();
      expect(allArticlesPageSEOHelper({ data: 1234 })).toBeNull();
      expect(
        allArticlesPageSEOHelper({ data: { results: ["abc"] } })
      ).toBeNull();
    });

    test("allArticlesPageSEOHelper - should return correct SEO object when correct data is provided", () => {
      const successResponse = {
        results: [
          {
            data: {
              seo_title: [{ text: "SEO Title" }]
            }
          }
        ]
      };
      expect(allArticlesPageSEOHelper(successResponse)).toHaveProperty("title");
      expect(allArticlesPageSEOHelper(successResponse)).toHaveProperty(
        "og_title"
      );
      expect(allArticlesPageSEOHelper(successResponse)).toHaveProperty(
        "article_published_time"
      );
    });
  });
});
