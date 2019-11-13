import { authorPageHelper } from "../../../helpers/author/AuthorPageHelpers";

describe("AuthorPageHelpers", () => {
  test("authorPageHelper - should be a function and defined", () => {
    expect(authorPageHelper).toBeDefined();
    expect(authorPageHelper).toBeInstanceOf(Object);
  });

  test("authorPageHelper - should return null when provided data is incorrect", () => {
    expect(authorPageHelper("string")).toBeNull();
    //@ts-ignore
    expect(authorPageHelper()).toBeNull();
    expect(authorPageHelper({})).toBeNull();
    expect(authorPageHelper([])).toBeNull();
    expect(authorPageHelper(12345)).toBeNull();
    expect(authorPageHelper({ dummy: 123 })).toBeNull();
  });

  test("authorPageHelper - should return correct data when correct object is provided", () => {
    const successReponse = {
      uid: "dummy-uid",
      id: "dummy-id",
      data: {
        full_name: [{ text: "dummy-name" }]
      }
    };
    expect(authorPageHelper).toBeInstanceOf(Object);
    expect(authorPageHelper(successReponse)).toBeDefined();
    expect(authorPageHelper(successReponse)[successReponse.uid]).toBeDefined();
    expect(
      authorPageHelper(successReponse)[successReponse.uid].SEO
    ).toBeDefined();
    expect(
      authorPageHelper(successReponse)[successReponse.uid].author
    ).toBeDefined();
    expect(
      authorPageHelper(successReponse)[successReponse.uid].author.uid
    ).toBe(successReponse.uid);
    expect(authorPageHelper(successReponse)[successReponse.uid].author.id).toBe(
      successReponse.id
    );
    expect(
      authorPageHelper(successReponse)[successReponse.uid].author.instagram
    ).toBeNull();
  });
});
