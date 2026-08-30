import type { ActivityConfig, GameContentConfig, ResourceConfig, RealmConfig } from "./types.js";

function indexById<T extends { id: string }>(items: readonly T[], label: string): Map<string, T> {
  const map = new Map<string, T>();
  for (const item of items) {
    if (map.has(item.id)) throw new Error(`duplicate ${label} id: ${item.id}`);
    map.set(item.id, item);
  }
  return map;
}

/**
 * Read-only view over validated content. Hosts load raw JSON, run it through
 * the JSON Schema gate (scripts/check-content.mjs at build/CI time), then hand
 * the parsed config here. The registry additionally enforces referential
 * integrity so a broken content set fails loudly and immediately.
 */
export class ContentRegistry {
  private readonly realmsById: Map<string, RealmConfig>;
  private readonly activitiesById: Map<string, ActivityConfig>;
  private readonly resourcesById: Map<string, ResourceConfig>;

  private constructor(private readonly content: GameContentConfig) {
    this.realmsById = indexById(content.realms, "realm");
    this.activitiesById = indexById(content.activities, "activity");
    this.resourcesById = indexById(content.resources, "resource");

    if (!this.realmsById.has(content.startingRealmId)) {
      throw new Error(`startingRealmId not found: ${content.startingRealmId}`);
    }
    for (const activity of content.activities) {
      for (const rate of activity.rates) {
        if (!this.resourcesById.has(rate.resourceId)) {
          throw new Error(`activity ${activity.id} references unknown resource: ${rate.resourceId}`);
        }
      }
    }
    for (const realm of content.realms) {
      if (!this.resourcesById.has(realm.progress.resourceId)) {
        throw new Error(`realm ${realm.id} references unknown resource: ${realm.progress.resourceId}`);
      }
    }
  }

  static from(content: GameContentConfig): ContentRegistry {
    return new ContentRegistry(content);
  }

  get realms(): readonly RealmConfig[] {
    return this.content.realms;
  }

  get activities(): readonly ActivityConfig[] {
    return this.content.activities;
  }

  get resources(): readonly ResourceConfig[] {
    return this.content.resources;
  }

  get offlineCapSeconds(): number {
    return this.content.offlineCapSeconds;
  }

  get startingRealmId(): string {
    return this.content.startingRealmId;
  }

  realm(id: string): RealmConfig {
    const realm = this.realmsById.get(id);
    if (!realm) throw new Error(`unknown realm: ${id}`);
    return realm;
  }

  activity(id: string): ActivityConfig {
    const activity = this.activitiesById.get(id);
    if (!activity) throw new Error(`unknown activity: ${id}`);
    return activity;
  }

  resource(id: string): ResourceConfig {
    const resource = this.resourcesById.get(id);
    if (!resource) throw new Error(`unknown resource: ${id}`);
    return resource;
  }
}
