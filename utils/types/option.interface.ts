import { Item } from './item.interface';

export interface Option {
  id: number;
  text: string;
  isVisible: Function;
  generateOutcome: Function; // returns ScenarioOutcome
  successNumber?: number; // role
  generateRole?: Function; // role
}

export interface RoleResult {
  baseRole: number;
  modifiedRole: number;
  modifiers: RoleModifier[];
}

export interface RoleModifier {
  name: string;
  number: number;
}

export interface ScenarioOutcome {
  text: string;
  changes: ScenarioOutcomeChanges[];
}

export interface ScenarioOutcomeChanges {
  id: number;
  text: string;
  count?: number;
  icon?: any;
}
