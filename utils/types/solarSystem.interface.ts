import { Planet } from './planet.interface';

export interface SolarSystem {
  id: number;
  name: string;
  icon: string;
  planets: Planet[];
}
