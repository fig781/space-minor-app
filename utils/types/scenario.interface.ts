import { Option } from "./option.interface"

export interface Scenario {
  id: number
  description: string
  type: 'mining' | 'traveling' | 'scanning'
  options: () => Option[]
}