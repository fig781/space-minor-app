import { Item } from "./item.interface"

export interface Planet {
  id: number
  name: string
  minerals: Item[]
}