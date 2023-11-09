import { Item } from "./item.interface"

export interface Option {
  id: number,
  text: string,
  followUpText: string,
  discoveredItems?: Item[], // For scanning
  discoveredAnomalies?: [] // For scanning
  isVisible: Function,
  action: Function,
}