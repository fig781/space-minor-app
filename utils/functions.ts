import { CRIT_FAIL, CRIT_SUCCESS } from "./constants";
import scenarios from "./data/scenarios"
import { RoleModifier } from "./types/option.interface";

const generateScenario = (type: 'traveling' | 'mining' | 'scanning') => {
  // takes in many params and returns a scenario from the list of them
  const filteredScenarios = scenarios.filter(s => type === s.type);
  const scenarioId = Math.floor(Math.random() * filteredScenarios.length);

  return filteredScenarios[scenarioId];
}

const getScenarioById = (scenarioId: number) => {
  return scenarios.find(s => s.id === scenarioId);
}

const generateRole = (min = 0, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const calculateModifiedRole = (baseRole: number, modifiers: RoleModifier[]) => {
  if (modifiers.length === 0) return baseRole;
  const roleNumbers = modifiers.map(m => m.number);
  roleNumbers.push(baseRole);

  return roleNumbers.reduce((a, b) => a + b);
}

const generateOutcomeText = (role: number, roleNeeded: number, critSuccess = CRIT_SUCCESS, critFail = CRIT_FAIL): string => {
  if (role >= critSuccess) {
    return 'Critical Success'
  } else if (role >= roleNeeded) {
    return 'Success'
  } else if (role <= critFail) {
    return 'Critical Failure'
  } else {
    return 'Failure'
  }
}
export {
  generateScenario,
  getScenarioById,
  generateRole,
  calculateModifiedRole,
  generateOutcomeText
}