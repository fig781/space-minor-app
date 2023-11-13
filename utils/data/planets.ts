import { Planet } from '../types/planet.interface';
import { itemsPlanet0 } from './items';
// import { anomaliesOnPlanet0 } from './planetAnomalies';

// planet ids must be unique
// Ingredior
export const planetsInSolar0: Planet[] = [
  {
    id: 0,
    name: 'Ingredior Star',
    icon: require('../../assets/GameIcons/Planets/Stars/1.png'),
    type: 'star',
    minerals: itemsPlanet0,
    anomalies: [],
  },
  {
    id: 1,
    name: 'Ingredior I',
    icon: require('../../assets/GameIcons/Planets/Baron/1.png'),
    type: 'solid planet',
    minerals: [],
    anomalies: [],
  },
  {
    id: 2,
    name: 'Asteroid Cluster',
    icon: require('../../assets/GameIcons/Planets/Asteroid/7.png'),
    type: 'asteroid',
    minerals: [],
    anomalies: [],
  },
  {
    id: 3,
    name: 'Ingredior II',
    icon: require('../../assets/GameIcons/Planets/Forest/3.png'),
    type: 'solid planet',
    minerals: [],
    anomalies: [],
  },
  {
    id: 4,
    name: 'Ingredior III',
    icon: require('../../assets/GameIcons/Planets/Gas/1.png'),
    type: 'gas planet',
    minerals: [],
    anomalies: [],
  },
  {
    id: 5,
    name: 'Ingredior IV',
    icon: require('../../assets/GameIcons/Planets/Rocky/1.png'),
    type: 'solid planet',
    minerals: [],
    anomalies: [],
  }
];

// Caelus
export const planetsInSolar1: Planet[] = [
  {
    id: 11,
    name: 'Caelus Star',
    icon: require('../../assets/GameIcons/Planets/Stars/9.png'),
    type: 'star',
    minerals: [],
    anomalies: [],
  },
  {
    id: 12,
    name: 'Caelus I',
    icon: require('../../assets/GameIcons/Planets/Desert/1.png'),
    type: 'solid planet',
    minerals: [],
    anomalies: [],
  },
  {
    id: 13,
    name: 'Caelus II',
    icon: require('../../assets/GameIcons/Planets/Gas/14.png'),
    type: 'gas planet',
    minerals: [],
    anomalies: [],
  },
  {
    id: 14,
    name: 'Caelus III',
    icon: require('../../assets/GameIcons/Planets/Gas/9.png'),
    type: 'gas planet',
    minerals: [],
    anomalies: [],
  },
  {
    id: 15,
    name: 'Asteroid Cluster',
    icon: require('../../assets/GameIcons/Planets/Asteroid/1.png'),
    type: 'asteroid',
    minerals: [],
    anomalies: [],
  },
];

export const planetsInSolar2: Planet[] = [
  {
    id: 22,
    name: 'test',
    icon: require('../../assets/GameIcons/Planets/Ocean/1.png'),
    type: 'solid planet',
    minerals: [],
    anomalies: [],
  },
];
