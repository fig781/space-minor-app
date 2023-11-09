export interface Item {
  id: number
  name: string,
  iconPath: any //require('path'),
  description: string,
  type: 'mineral' | 'component'
}