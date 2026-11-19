import { expect, test } from "vitest";
import { VERSION } from "./version.ts";

test("VERSION is a semver string", () => {
  expect(VERSION).toMatch(/^\d+\.\d+\.\d+/);
});
