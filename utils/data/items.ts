import { Item } from '../types/item.interface';

// all ids need to be unique
export const items: Item[] = [
  {
    id: 0,
    name: 'test1mineral',
    icon: require('../../assets/GameIcons/Items/Icon1.png'),
    description: 'testdescription',
    type: 'mineral',
    difficulty: 20,
  },
  {
    id: 1,
    name: 'test2mineral',
    icon: require('../../assets/GameIcons/Items/Icon2.png'),
    description: 'testdescription',
    type: 'mineral',
    difficulty: 20,
  },
  {
    id: 2,
    name: 'test3mineral',
    icon: require('../../assets/GameIcons/Items/Icon22.png'),
    description: 'testdescription',
    type: 'mineral',
    difficulty: 20,
  },
];

export const components: Item[] = [];
export const itemsPlanet0: Item[] = items.filter(
  (m) => m.id === 0 || m.id === 1 || m.id === 2
);
