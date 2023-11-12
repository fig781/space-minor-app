import { SolarSystem } from '../types/solarSystem.interface';
import { planetsInSolar0, planetsInSolar1 } from './planets';

const solarSystems: SolarSystem[] = [
  {
    id: 0,
    name: 'test',
    icon: 'test',
    planets: planetsInSolar0,
  },
  {
    id: 1,
    name: 'test2',
    icon: 'test',
    planets: planetsInSolar1,
  },
];

export default solarSystems;
