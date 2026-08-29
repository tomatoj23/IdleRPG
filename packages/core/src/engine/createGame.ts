import type { ContentRegistry } from "../content/registry.js";
import { migrateSnapshot, SAVE_VERSION, type GameStateV1 } from "../save/migrations.js";
import type { Clock, GameEvent, GameListener, Rng, SaveStore, Snapshot } from "../types.js";

export interface Game {
  /** Subscribe to the engine event stream. Returns an unsubscribe function. */
  subscribe(listener: GameListener): () => void;
  currentRealm(): { id: string; name: string };
  progress(): { resourceId: string; current: number; cap: number };
  resourceAmount(resourceId: string): number;
  activeActivity(): { id: string; name: string } | null;
  startActivity(activityId: string): void;
  stopActivity(): void;
  /**
   * Settle time-based accrual up to the clock's current time. A single gap is
   * capped at the content-defined maximum, which is what makes long offline
   * gaps safe while leaving short online ticks untouched.
   */
  sync(): void;
  snapshot(): Snapshot<GameStateV1>;
}

export interface CreateGameOptions {
  content: ContentRegistry;
  clock: Clock;
  rng: Rng;
  /** Restored state; when omitted a fresh state is created. */
  state?: GameStateV1;
}

function round6(value: number): number {
  return Math.round(value * 1e6) / 1e6;
}

export function createGame(options: CreateGameOptions): Game {
  const { content, clock } = options;
  // rng participates from the combat/loot slices onward; the facade contract
  // keeps it injectable from day one so those slices stay deterministic.
  void options.rng;
  const listeners = new Set<GameListener>();

  const state: GameStateV1 = options.state ?? {
    realmId: content.startingRealmId,
    resources: {},
    activeActivityId: null,
    lastAccrualTimestamp: clock.now(),
  };

  function emit(event: GameEvent): void {
    for (const listener of listeners) listener(event);
  }

  function sync(): void {
    const now = clock.now();
    const elapsedSeconds = (now - state.lastAccrualTimestamp) / 1000;
    if (elapsedSeconds <= 0) return;
    const cap = content.offlineCapSeconds;
    const effective = Math.min(elapsedSeconds, cap);
    state.lastAccrualTimestamp = now;

    const amounts: Record<string, number> = {};
    if (state.activeActivityId) {
      const activity = content.activity(state.activeActivityId);
      for (const rate of activity.rates) {
        amounts[rate.resourceId] = round6((amounts[rate.resourceId] ?? 0) + rate.perSecond * effective);
      }
      for (const [resourceId, amount] of Object.entries(amounts)) {
        state.resources[resourceId] = round6((state.resources[resourceId] ?? 0) + amount);
      }
    }
    const totals: Record<string, number> = {};
    for (const resourceId of Object.keys(amounts)) {
      totals[resourceId] = state.resources[resourceId] ?? 0;
    }
    emit({
      type: "resourcesAccrued",
      amounts,
      totals,
      elapsedSeconds: round6(effective),
      capped: elapsedSeconds > cap,
      timestamp: now,
    });
  }

  return {
    subscribe(listener: GameListener): () => void {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },

    // Realm advancement (rolling progress into the next realm) lands with the
    // progression slice; until then accrual may exceed the current cap.
    currentRealm() {
      const realm = content.realm(state.realmId);
      return { id: realm.id, name: realm.name };
    },

    progress() {
      const realm = content.realm(state.realmId);
      return {
        resourceId: realm.progress.resourceId,
        current: round6(state.resources[realm.progress.resourceId] ?? 0),
        cap: realm.progress.cap,
      };
    },

    resourceAmount(resourceId: string): number {
      return round6(state.resources[resourceId] ?? 0);
    },

    activeActivity() {
      if (!state.activeActivityId) return null;
      const activity = content.activity(state.activeActivityId);
      return { id: activity.id, name: activity.name };
    },

    startActivity(activityId: string): void {
      const activity = content.activity(activityId); // throws on unknown id
      if (state.activeActivityId === activityId) return;
      state.activeActivityId = activityId;
      emit({ type: "activityStarted", activityId, activityName: activity.name });
    },

    stopActivity(): void {
      if (!state.activeActivityId) return;
      const previous = state.activeActivityId;
      const activity = content.activity(previous);
      state.activeActivityId = null;
      emit({ type: "activityStopped", activityId: previous, activityName: activity.name });
    },

    sync,

    snapshot(): Snapshot<GameStateV1> {
      return { version: SAVE_VERSION, data: structuredClone(state) };
    },
  };
}

export interface RestoreGameOptions extends CreateGameOptions {
  save: SaveStore;
}

/**
 * Load path: pull the snapshot from the store, migrate it to the current
 * version, then build the game on top of it. Hosts call sync() right after
 * restore to settle the offline gap.
 */
export async function restoreGame(options: RestoreGameOptions): Promise<Game> {
  const snapshot = await options.save.load();
  if (!snapshot) return createGame(options);
  const state = migrateSnapshot<GameStateV1>(snapshot);
  state.lastAccrualTimestamp = Math.min(state.lastAccrualTimestamp, options.clock.now());
  return createGame({ ...options, state });
}
