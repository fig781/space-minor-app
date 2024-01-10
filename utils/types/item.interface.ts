export interface Item {
  id: number;
  name: string;
  icon: any; //require('path'),
  description: string;
  type: 'mineral' | 'component';
  difficulty?: number; // for minerals
  value: number;
  mass: number;
}
