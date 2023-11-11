import { Item } from "./item.interface";

export interface InventoryItem {
  id: number
  item: Item,
  count: number
}

export interface InventoryPayload {
  item: Item,
  count: number
}