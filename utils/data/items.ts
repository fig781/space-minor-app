import { Item } from "../types/item.interface";

// all ids need to be unique
export const minerals: Item[] = [
  {
    id: 0,
    name: 'test1',
    iconPath: require('../../assets/GameIcons/Items/Icon1.png'),
    description: 'testdescription',
    type: 'mineral'
  },
  {
    id: 1,
    name: 'test2',
    iconPath: require('../../assets/GameIcons/Items/Icon2.png'),
    description: 'testdescription',
    type: 'mineral'
  },
  {
    id: 2,
    name: 'test3',
    iconPath: require('../../assets/GameIcons/Items/Icon22.png'),
    description: 'testdescription',
    type: 'mineral'
  },
]

export const components: Item[] = [];
export const itemsPlanet0: Item[] = minerals.filter(m => m.id === 0 || m.id === 1 || m.id === 2);
