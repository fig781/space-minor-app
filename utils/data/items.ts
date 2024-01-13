import { Item } from '../types/item.interface';

// all ids need to be unique
export const items: Item[] = [
  {
    id: 0,
    name: 'Aetherium',
    icon: require('../../assets/GameIcons/Minerals/Icon4.png'),
    description: 'A common mineral used in all types of manufacturing.',
    type: 'mineral',
    difficulty: 20,
    value: 3,
    mass: 1
  },
  {
    id: 1,
    name: 'Xyronite',
    icon: require('../../assets/GameIcons/Minerals/Icon3.png'),
    description: 'A radiant crystal that emits a soft glow, coveted for its aesthetic appeal and potential energy applications.',
    type: 'mineral',
    difficulty: 60,
    value: 4,
    mass: 1
  },
  {
    id: 2,
    name: 'Etherealite',
    icon: require('../../assets/GameIcons/Minerals/Icon10.png'),
    description: 'A conductive mineral capable of storing and transferring electrical energy,',
    type: 'mineral',
    difficulty: 50,
    value: 3,
    mass: 1
  },
  {
    id: 3,
    name: 'Wires',
    icon: require('../../assets/GameIcons/Components/Icon14_10.png'),
    description: 'Used in all manner of electrical components.',
    type: 'component',
    value: 6,
    mass: 1
  },
  {
    id: 4,
    name: 'Memory Chip',
    icon: require('../../assets/GameIcons/Components/Icon14_32.png'),
    description: 'Used in all manner of computational components.',
    type: 'component',
    value: 11,
    mass: 0.1
  },
];

export const components: Item[] = [];
export const itemsPlanet0: Item[] = [];
export const itemsPlanet1: Item[] = [items[0]]
export const itemsPlanet2: Item[] = [items[2]]
export const itemsPlanet3: Item[] = [items[0], items[1]]
export const itemsPlanet4: Item[] = []
export const itemsPlanet5: Item[] = [items[0], items[1], items[2]]
