import { Option } from "./option.interface"

export interface Scenario {
  id: number
  description: string
  type: 'mining' | 'traveling' | 'scanning' | 'use item'
  options: () => Option[]
}