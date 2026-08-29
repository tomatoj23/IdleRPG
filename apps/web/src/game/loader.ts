import { ContentRegistry, restoreGame, type Game, type SaveStore } from "@idlerpg/core";
import activitiesData from "../../../../content/config/activities.json";
import resourcesData from "../../../../content/config/resources.json";
import settingsData from "../../../../content/config/settings.json";
import realmsData from "../../../../content/config/realms.json";
import { LocalSaveStore } from "./localSaveStore.js";

/**
 * Content is imported at build time for the web shell. Structural validity is
 * enforced by the content pipeline gate (`npm run content:check`) plus the
 * referential-integrity checks inside ContentRegistry.
 */
export function buildContentRegistry(): ContentRegistry {
  return ContentRegistry.from({
    realms: realmsData.realms,
    activities: activitiesData.activities,
    resources: resourcesData.resources,
    offlineCapSeconds: settingsData.offlineCapSeconds,
    startingRealmId: settingsData.startingRealmId,
  });
}

const SAVE_KEY = "idlerpg-save";

export async function loadGame(): Promise<{ game: Game; saveStore: SaveStore }> {
  const content = buildContentRegistry();
  const clock = { now: () => Date.now() };
  const rng = { next: () => Math.random() };
  const saveStore: SaveStore = new LocalSaveStore(SAVE_KEY);
  const game = await restoreGame({ content, clock, rng, save: saveStore });
  return { game, saveStore };
}

export async function resetSave(): Promise<void> {
  localStorage.removeItem(SAVE_KEY);
}
