import { stringSplice } from "./string";

describe("test string.ts module", () => {
  test("test stringSplice", () => {
    expect(stringSplice("hello", 1, 2, "a")).toBe("halo");
  });
});
