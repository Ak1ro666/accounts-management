import { describe, expect, test } from "vitest";

import { getSortByDateAsc } from "./account";
import { testChargesAsc, testChargesDesc } from "../__test__/stub";

describe("manage-check/domain/account", () => {
  test("getSortByDateAsc", () => {
    const res = getSortByDateAsc(testChargesDesc);

    expect(res).toEqual(getSortByDateAsc(testChargesAsc));
  });
});
