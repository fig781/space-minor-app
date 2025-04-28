import { Planet } from '../types/planet.interface';
import {
  itemsPlanet0,
  itemsPlanet1,
  itemsPlanet2,
  itemsPlanet3,
  itemsPlanet4,
  itemsPlanet5,
} from './items';
// import { anomaliesOnPlanet0 } from './planetAnomalies';

// planet ids must be unique
// Ingredior
export const planetsInSolar0: Planet[] = [
  {
    id: 0,
    name: 'Ingredior Star',
    icon: require('../../assets/GameIcons/Planets/Stars/1.png'),
    overlayIcon: null,
    type: 'star',
    minerals: itemsPlanet0,
    anomalies: [],
    description: 'test description',
  },
  {
    id: 1,
    name: 'Ingredior I',
    icon: require('../../assets/GameIcons/Planets/Baron/1.png'),
    overlayIcon: null,
    type: 'solid planet',
    minerals: itemsPlanet1,
    anomalies: [],
    description: 'test description',
  },
  {
    id: 2,
    name: 'Asteroid Cluster',
    icon: require('../../assets/GameIcons/Planets/Asteroid/7.png'),
    overlayIcon: null,
    type: 'asteroid',
    minerals: itemsPlanet2,
    anomalies: [],
    description: 'test description',
  },
  {
    id: 3,
    name: 'Ingredior II',
    icon: require('../../assets/GameIcons/Planets/Desert/8.png'),
    overlayIcon: null,
    type: 'solid planet',
    minerals: itemsPlanet3,
    anomalies: [],
    description: 'test description',
  },
  {
    id: 4,
    name: 'Ingredior III',
    icon: require('../../assets/GameIcons/Planets/Gas/1.png'),
    overlayIcon: require('../../assets/GameIcons/Planets/Rings/8.png'),
    type: 'gas planet',
    minerals: itemsPlanet4,
    anomalies: [],
    description: 'test description',
  },
  {
    id: 5,
    name: 'Ingredior IV',
    icon: require('../../assets/GameIcons/Planets/Rocky/1.png'),
    overlayIcon: null,
    type: 'solid planet',
    minerals: itemsPlanet5,
    anomalies: [],
    description: 'test description',
  },
];

// Caelus
export const planetsInSolar1: Planet[] = [
  // {
  //   id: 11,
  //   name: 'Caelus Star',
  //   icon: require('../../assets/GameIcons/Planets/Stars/9.png'),
  //   overlayIcon: null,
  //   type: 'star',
  //   minerals: [],
  //   anomalies: [],
  //   description: 'test description'
  // },
  // {
  //   id: 12,
  //   name: 'Caelus I',
  //   icon: require('../../assets/GameIcons/Planets/Desert/1.png'),
  //   overlayIcon: null,
  //   type: 'solid planet',
  //   minerals: [],
  //   anomalies: [],
  //   description: 'test description'
  // },
  // {
  //   id: 13,
  //   name: 'Caelus II',
  //   icon: require('../../assets/GameIcons/Planets/Gas/14.png'),
  //   overlayIcon: null,
  //   type: 'gas planet',
  //   minerals: [],
  //   anomalies: [],
  //   description: 'test description'
  // },
  // {
  //   id: 14,
  //   name: 'Caelus III',
  //   icon: require('../../assets/GameIcons/Planets/Gas/9.png'),
  //   overlayIcon: null,
  //   type: 'gas planet',
  //   minerals: [],
  //   anomalies: [],
  //   description: 'test description'
  // },
  // {
  //   id: 15,
  //   name: 'Asteroid Cluster',
  //   icon: require('../../assets/GameIcons/Planets/Asteroid/1.png'),
  //   overlayIcon: null,
  //   type: 'asteroid',
  //   minerals: [],
  //   anomalies: [],
  //   description: 'test description'
  // },
];

export const planetsInSolar2: Planet[] = [
  // {
  //   id: 22,
  //   name: 'test',
  //   icon: require('../../assets/GameIcons/Planets/Ocean/1.png'),
  //   overlayIcon: null,
  //   type: 'solid planet',
  //   minerals: [],
  //   anomalies: [],
  //   description: 'test description'
  // },
];
