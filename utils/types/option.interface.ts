import { Item } from "./item.interface"

export interface Option {
  id: number,
  text: string,
  isVisible: Function,
  action: Function,
  followUpText?: string, //without role
  successNumber?: number // role
  generateRole?: Function, // role
  generateOutcome?: Function, //role
  discoveredItems?: Item[], // For scanning
  discoveredAnomalies?: [] // For scanning
}

export interface RoleResult {
  baseRole: number,
  modifiedRole: number,
  modifiers: RoleModifier[]
}

export interface RoleModifier {
  name: string,
  number: number
}

export interface ScenarioOutcome {
  text: string,
  changes: ScenarioOutcomeChanges[]
}

export interface ScenarioOutcomeChanges {
  id: number,
  text: string,
  count: number
}