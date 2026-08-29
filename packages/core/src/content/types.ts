/**
 * Shape of the structural game configuration. All of this is data (ADR-0004):
 * the engine never hardcodes realm lists, caps, rates or any other quantity.
 */

export interface RealmProgress {
  resourceId: string;
  cap: number;
}

export interface RealmConfig {
  id: string;
  name: string;
  progress: RealmProgress;
}

export interface ActivityRate {
  resourceId: string;
  perSecond: number;
}

export interface ActivityConfig {
  id: string;
  name: string;
  rates: ActivityRate[];
}

export interface ResourceConfig {
  id: string;
  name: string;
}

export interface GameContentConfig {
  realms: RealmConfig[];
  activities: ActivityConfig[];
  resources: ResourceConfig[];
  offlineCapSeconds: number;
  startingRealmId: string;
}
