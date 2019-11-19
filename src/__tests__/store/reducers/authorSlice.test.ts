import {
  getAuthorByUID,
  setAuthorErrorTrue
} from "../../../store/reducers/authorSlice";

console.log(getAuthorByUID);

describe("Redux - authors", () => {
  test("authors", () => {
    // console.log("authors", authors);
    console.log("getAuthorByUID", getAuthorByUID);
    console.log("setAuthorErrorTrue", setAuthorErrorTrue);
    expect(1).toBe(1);
  });
});
