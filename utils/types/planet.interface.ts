import { Item } from './item.interface';

export interface Planet {
  id: number;
  name: string;
  minerals: Item[];
  anomalies: PlanetAnomalie[];
  icon: any; //require('path')
  type: 'solid planet' | 'gas planet' | 'wreck' | 'anomaly' | 'asteroid' | 'star';
}

export interface PlanetDiscoveries {
  planetId: number;
  itemIdsDiscovered: number[];
  anomalieIdsDiscovered: number[];
}

export interface PlanetAnomalie {
  id: number; //each anomalie is tied to a planet, so they do not need to be completely unique
  name: string;
  icon: any;
}
