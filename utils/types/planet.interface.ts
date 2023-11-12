import { Item } from './item.interface';

export interface Planet {
  id: number;
  name: string;
  minerals: Item[];
  icon: any; //require('path')
  type: 'solid planet' | 'gas planet' | 'wreck' | 'anomaly' | 'asteroid' | 'star';
}

export interface PlanetDiscoveries {
  planetId: number;
  itemIdsDiscovered: number[];
  anomalieIdsDiscovered: number[];
}
