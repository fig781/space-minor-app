import { SolarSystem } from '../types/solarSystem.interface';
import { planetsInSolar0, planetsInSolar1, planetsInSolar2 } from './planets';

const solarSystems: SolarSystem[] = [
  {
    id: 0,
    name: 'Ingredior',
    icon: 'test',
    planets: planetsInSolar0,
  },
  {
    id: 1,
    name: 'Caelus',
    icon: 'test',
    planets: planetsInSolar1,
  },
  {
    id: 2,
    name: 'Iter',
    icon: 'test',
    planets: planetsInSolar2,
  },
];

export default solarSystems;
