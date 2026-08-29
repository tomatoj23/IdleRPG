import { describe, expect, it } from "vitest";
import { SAVE_VERSION, migrateSnapshot } from "../src/save/migrations.js";

describe("migrateSnapshot", () => {
  it("passes through snapshots at the current version", () => {
    const data = { stageId: "stage-01", resources: { a: 1 }, activeActivityId: null, lastAccrualTimestamp: 5 };
    const out = migrateSnapshot<typeof data>({ version: SAVE_VERSION, data });
    expect(out).toEqual(data);
  });

  it("rejects saves from an unsupported future version", () => {
    expect(() => migrateSnapshot({ version: SAVE_VERSION + 1, data: {} })).toThrow(/unsupported save version/);
  });

  it("rejects version 0", () => {
    expect(() => migrateSnapshot({ version: 0, data: {} })).toThrow(/unsupported save version/);
  });
});
