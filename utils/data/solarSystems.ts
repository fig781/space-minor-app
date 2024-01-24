import { SolarSystem } from '../types/solarSystem.interface';
import { planetsInSolar0, planetsInSolar1, planetsInSolar2 } from './planets';

const solarSystems: SolarSystem[] = [
  {
    id: 0,
    name: 'Ingredior',
    icon: 'test',
    cost: 10,
    planets: planetsInSolar0,
  },
  {
    id: 1,
    name: 'Caelus',
    icon: 'test',
    cost: 20,
    planets: planetsInSolar1,
  },
  {
    id: 2,
    name: 'Iter',
    icon: 'test',
    cost: 30,
    planets: planetsInSolar2,
  },
];

export default solarSystems;
