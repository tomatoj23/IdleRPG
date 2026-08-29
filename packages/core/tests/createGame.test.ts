import { describe, expect, it } from "vitest";
import { ContentRegistry } from "../src/content/registry.js";
import type { GameContentConfig } from "../src/content/types.js";
import { createGame, restoreGame } from "../src/engine/createGame.js";
import { SAVE_VERSION, type GameStateV1 } from "../src/save/migrations.js";
import type { Clock, GameEvent, Rng, SaveStore, Snapshot } from "../src/types.js";

class FakeClock implements Clock {
  constructor(private nowMs: number) {}
  now(): number {
    return this.nowMs;
  }
  advance(seconds: number): void {
    this.nowMs += seconds * 1000;
  }
}

const fixedRng: Rng = { next: () => 0.5 };

function makeContent(overrides: Partial<GameContentConfig> = {}): GameContentConfig {
  return {
    realms: [
      { id: "realm-01", name: "Realm One", progress: { resourceId: "res-a", cap: 100 } },
      { id: "realm-02", name: "Realm Two", progress: { resourceId: "res-a", cap: 300 } },
    ],
    activities: [
      { id: "act-alpha", name: "Alpha Activity", rates: [{ resourceId: "res-a", perSecond: 0.1 }] },
    ],
    resources: [{ id: "res-a", name: "Resource A" }],
    offlineCapSeconds: 3600,
    startingRealmId: "realm-01",
    ...overrides,
  };
}

class MemorySaveStore implements SaveStore {
  public snapshot: Snapshot | null = null;
  async load(): Promise<Snapshot | null> {
    return this.snapshot;
  }
  async save(snapshot: Snapshot): Promise<void> {
    this.snapshot = snapshot;
  }
}

describe("createGame", () => {
  it("creates a fresh state at the configured starting realm", () => {
    const clock = new FakeClock(1_000_000);
    const game = createGame({ content: ContentRegistry.from(makeContent()), clock, rng: fixedRng });
    expect(game.currentRealm()).toEqual({ id: "realm-01", name: "Realm One" });
    expect(game.resourceAmount("res-a")).toBe(0);
    expect(game.activeActivity()).toBeNull();
  });

  it("accrues resources while an activity is running", () => {
    const clock = new FakeClock(0);
    const game = createGame({ content: ContentRegistry.from(makeContent()), clock, rng: fixedRng });
    game.startActivity("act-alpha");
    clock.advance(10);
    game.sync();
    expect(game.resourceAmount("res-a")).toBeCloseTo(1, 6);
  });

  it("does not accrue without an active activity", () => {
    const clock = new FakeClock(0);
    const game = createGame({ content: ContentRegistry.from(makeContent()), clock, rng: fixedRng });
    clock.advance(60);
    game.sync();
    expect(game.resourceAmount("res-a")).toBe(0);
  });

  it("stops accruing after the activity is stopped", () => {
    const clock = new FakeClock(0);
    const game = createGame({ content: ContentRegistry.from(makeContent()), clock, rng: fixedRng });
    game.startActivity("act-alpha");
    clock.advance(10);
    game.sync();
    game.stopActivity();
    clock.advance(10);
    game.sync();
    expect(game.resourceAmount("res-a")).toBeCloseTo(1, 6);
  });

  it("rejects unknown activities", () => {
    const clock = new FakeClock(0);
    const game = createGame({ content: ContentRegistry.from(makeContent()), clock, rng: fixedRng });
    expect(() => game.startActivity("act-nope")).toThrow(/unknown activity/);
  });

  it("caps a single gap at the configured maximum", () => {
    const clock = new FakeClock(0);
    const game = createGame({ content: ContentRegistry.from(makeContent()), clock, rng: fixedRng });
    game.startActivity("act-alpha");
    clock.advance(3600 * 100); // 100 hours away, cap is 1 hour
    game.sync();
    expect(game.resourceAmount("res-a")).toBeCloseTo(360, 6);
  });

  it("reports progress against the current realm cap", () => {
    const clock = new FakeClock(0);
    const game = createGame({ content: ContentRegistry.from(makeContent()), clock, rng: fixedRng });
    game.startActivity("act-alpha");
    clock.advance(50);
    game.sync();
    const progress = game.progress();
    expect(progress.resourceId).toBe("res-a");
    expect(progress.cap).toBe(100);
    expect(progress.current).toBeCloseTo(5, 6);
  });

  it("emits context-rich events for activity changes and accrual", () => {
    const clock = new FakeClock(0);
    const game = createGame({ content: ContentRegistry.from(makeContent()), clock, rng: fixedRng });
    const events: GameEvent[] = [];
    game.subscribe((event) => events.push(event));
    game.startActivity("act-alpha");
    clock.advance(10);
    game.sync();

    expect(events[0]).toEqual({ type: "activityStarted", activityId: "act-alpha", activityName: "Alpha Activity" });
    const accrual = events[1];
    if (accrual?.type !== "resourcesAccrued") throw new Error("expected an accrual event");
    expect(accrual.amounts["res-a"]).toBeCloseTo(1, 6);
    expect(accrual.totals["res-a"]).toBeCloseTo(1, 6);
    expect(accrual.capped).toBe(false);
    expect(accrual.timestamp).toBe(10_000);

    game.stopActivity();
    expect(events[2]).toEqual({ type: "activityStopped", activityId: "act-alpha", activityName: "Alpha Activity" });
  });

  it("produces a versioned snapshot and restores from it deterministically", async () => {
    const clock = new FakeClock(0);
    const store = new MemorySaveStore();
    const game = createGame({ content: ContentRegistry.from(makeContent()), clock, rng: fixedRng });
    game.startActivity("act-alpha");
    clock.advance(20);
    game.sync();
    const snapshot = game.snapshot();
    expect(snapshot.version).toBe(SAVE_VERSION);
    await store.save(snapshot);

    clock.advance(30);
    const restored = await restoreGame({ content: ContentRegistry.from(makeContent()), clock, rng: fixedRng, save: store });
    restored.sync();
    expect(restored.resourceAmount("res-a")).toBeCloseTo(2 + 3, 6);
    expect(restored.activeActivity()).toEqual({ id: "act-alpha", name: "Alpha Activity" });
  });

  it("keeps lastAccrualTimestamp in the past from a travelling save", async () => {
    const clock = new FakeClock(1_000_000);
    const store = new MemorySaveStore();
    const futureState: GameStateV1 = {
      realmId: "realm-01",
      resources: {},
      activeActivityId: null,
      lastAccrualTimestamp: 99_000_000, // ahead of the current clock
    };
    await store.save({ version: SAVE_VERSION, data: futureState });
    const game = await restoreGame({ content: ContentRegistry.from(makeContent()), clock, rng: fixedRng, save: store });
    game.sync(); // must not accrue from a future timestamp
    expect(game.resourceAmount("res-a")).toBe(0);
  });
});

describe("ContentRegistry integrity", () => {
  it("rejects duplicate ids", () => {
    const content = makeContent({
      realms: [
        { id: "realm-01", name: "A", progress: { resourceId: "res-a", cap: 10 } },
        { id: "realm-01", name: "B", progress: { resourceId: "res-a", cap: 20 } },
      ],
    });
    expect(() => ContentRegistry.from(content)).toThrow(/duplicate realm id/);
  });

  it("rejects unknown resource references", () => {
    const content = makeContent({
      activities: [{ id: "act-alpha", name: "X", rates: [{ resourceId: "res-ghost", perSecond: 1 }] }],
    });
    expect(() => ContentRegistry.from(content)).toThrow(/unknown resource/);
  });

  it("rejects an unknown starting realm", () => {
    const content = makeContent({ startingRealmId: "realm-404" });
    expect(() => ContentRegistry.from(content)).toThrow(/startingRealmId not found/);
  });
});
