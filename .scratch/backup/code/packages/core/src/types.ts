/**
 * Platform-facing ports the engine depends on. Everything here is pure:
 * no DOM, no timers, no fetch. Hosts (web, mini-program, desktop) provide
 * the implementations (ADR-0002).
 */

export interface Clock {
  /** Current time in milliseconds. */
  now(): number;
}

/** Deterministic random source, injected so simulations are reproducible. */
export interface Rng {
  next(): number;
}

export interface Snapshot<T = unknown> {
  version: number;
  data: T;
}

export interface SaveStore {
  load(): Promise<Snapshot | null>;
  save(snapshot: Snapshot): Promise<void>;
}

export type GameEvent =
  | { type: "activityStarted"; activityId: string; activityName: string }
  | { type: "activityStopped"; activityId: string; activityName: string }
  | {
      type: "resourcesAccrued";
      amounts: Record<string, number>;
      totals: Record<string, number>;
      elapsedSeconds: number;
      capped: boolean;
      timestamp: number;
    };

export type GameListener = (event: GameEvent) => void;
