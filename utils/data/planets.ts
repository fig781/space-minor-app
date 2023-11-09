import { Planet } from "../types/planet.interface";
import { itemsPlanet0 } from "./items";

export const planetsInSolar0: Planet[] = [
  {
    id: 0,
    name: "testplanet1",
    icon: require('../../assets/GameIcons/Planets/Baren.png'),
    type: 'solid planet',
    minerals: itemsPlanet0
  },
  {
    id: 1,
    name: "testplanet2",
    icon: require('../../assets/GameIcons/Planets/Baren.png'),
    type: 'solid planet',
    minerals: []
  },
  {
    id: 2,
    name: "testplanet3",
    icon: require('../../assets/GameIcons/Planets/Ice.png'),
    type: 'solid planet',
    minerals: []
  },
  {
    id: 3,
    name: "testplanet4",
    icon: require('../../assets/GameIcons/Planets/Lava.png'),
    type: 'solid planet',
    minerals: []
  }
]

export const planetsInSolar1: Planet[] = [
  {
    id: 1,
    name: "test",
    icon: require('../../assets/GameIcons/Planets/Terran.png'),
    type: 'solid planet',
    minerals: []
  }
]
